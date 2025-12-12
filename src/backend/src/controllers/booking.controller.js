const { prisma } = require('../config/database');
const { AppError, catchAsync } = require('../middleware/errorHandler');
const { sendEmail, sendSMS } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

// Generate reservation code
const generateReservationCode = () => {
  return `LW${Date.now().toString().slice(-8)}`;
};

// Calculate price based on vehicle type
const calculatePrice = (basePrice, vehicleType, multipliers) => {
  const multiplier = multipliers[vehicleType] || 1.0;
  return parseFloat((basePrice * multiplier).toFixed(2));
};

// @desc    Create new booking
// @route   POST /api/v1/bookings
// @access  Private/Public
exports.createBooking = catchAsync(async (req, res, next) => {
  const {
    branchId,
    stationId,
    serviceId,
    customerName,
    customerPhone,
    customerEmail,
    vehicleType,
    vehiclePlate,
    vehicleBrand,
    vehicleModel,
    vehicleColor,
    startTime,
    endTime,
    notes,
  } = req.body;

  // Get service details
  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });

  if (!service) {
    return next(new AppError('Service not found', 404));
  }

  // Calculate duration
  const start = new Date(startTime);
  const end = new Date(endTime);
  const duration = Math.round((end - start) / 60000); // minutes

  // Calculate price
  const price = calculatePrice(
    service.basePrice,
    vehicleType,
    service.vehicleTypeMultipliers
  );

  // Check for overlapping bookings if station is specified
  if (stationId) {
    const overlapping = await prisma.booking.findFirst({
      where: {
        stationId,
        status: { notIn: ['CANCELLED', 'COMPLETED'] },
        OR: [
          {
            AND: [
              { startTime: { lte: start } },
              { endTime: { gt: start } }
            ]
          },
          {
            AND: [
              { startTime: { lt: end } },
              { endTime: { gte: end } }
            ]
          },
          {
            AND: [
              { startTime: { gte: start } },
              { endTime: { lte: end } }
            ]
          }
        ]
      }
    });

    if (overlapping) {
      return next(new AppError('Time slot already booked', 409));
    }
  }

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      branchId,
      stationId,
      serviceId,
      reservationCode: generateReservationCode(),
      customerName,
      customerPhone,
      customerEmail,
      vehicleType,
      vehiclePlate,
      vehicleBrand,
      vehicleModel,
      vehicleColor,
      scheduledDate: start,
      startTime: start,
      endTime: end,
      duration,
      price,
      finalPrice: price,
      notes,
      status: 'REQUESTED',
    },
    include: {
      service: {
        select: {
          name: true,
        }
      },
      station: {
        select: {
          name: true,
        }
      },
      branch: {
        select: {
          name: true,
          phone: true,
        }
      }
    }
  });

  // Send confirmation email/SMS
  if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true' && customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: 'Booking Confirmation - Letwash',
      html: `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${customerName},</p>
        <p>Your booking has been received.</p>
        <h3>Booking Details:</h3>
        <ul>
          <li>Reservation Code: <strong>${booking.reservationCode}</strong></li>
          <li>Service: ${booking.service.name}</li>
          <li>Date: ${start.toLocaleDateString()}</li>
          <li>Time: ${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}</li>
          <li>Price: $${price}</li>
        </ul>
        <p>Thank you for choosing Letwash!</p>
      `
    }).catch(err => console.error('Email error:', err));
  }

  if (process.env.ENABLE_SMS_NOTIFICATIONS === 'true') {
    await sendSMS(
      customerPhone,
      `Letwash: Your booking ${booking.reservationCode} is confirmed for ${start.toLocaleDateString()} at ${start.toLocaleTimeString()}.`
    ).catch(err => console.error('SMS error:', err));
  }

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: { booking }
  });
});

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private
exports.getAllBookings = catchAsync(async (req, res, next) => {
  const {
    branchId,
    status,
    date,
    stationId,
    page = 1,
    limit = 20
  } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const where = {};

  // Filter by branch (owners see only their branches)
  if (req.user.role === 'ROOT_OWNER') {
    if (branchId) where.branchId = branchId;
  } else {
    const branches = await prisma.branch.findMany({
      where: { ownerId: req.user.id },
      select: { id: true }
    });
    where.branchId = { in: branches.map(b => b.id) };
    if (branchId) where.branchId = branchId;
  }

  if (status) where.status = status;
  if (stationId) where.stationId = stationId;
  if (date) {
    const dateObj = new Date(date);
    where.scheduledDate = {
      gte: new Date(dateObj.setHours(0, 0, 0, 0)),
      lt: new Date(dateObj.setHours(23, 59, 59, 999))
    };
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { startTime: 'asc' },
      include: {
        service: { select: { name: true } },
        station: { select: { name: true } },
        branch: { select: { name: true } },
      }
    }),
    prisma.booking.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    }
  });
});

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
    include: {
      service: true,
      station: true,
      branch: true,
      customer: true,
    }
  });

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  res.json({
    success: true,
    data: { booking }
  });
});

// @desc    Update booking
// @route   PUT /api/v1/bookings/:id
// @access  Private
exports.updateBooking = catchAsync(async (req, res, next) => {
  const { status, internalNotes, stationId, startTime, endTime } = req.body;

  const booking = await prisma.booking.update({
    where: { id: req.params.id },
    data: {
      ...(status && { status }),
      ...(internalNotes && { internalNotes }),
      ...(stationId && { stationId }),
      ...(startTime && { startTime: new Date(startTime) }),
      ...(endTime && { endTime: new Date(endTime) }),
    },
    include: {
      service: { select: { name: true } },
      branch: { select: { name: true } },
    }
  });

  // Send status update notification
  if (status && booking.customerEmail) {
    const statusMessages = {
      CONFIRMED: 'Your booking has been confirmed!',
      IN_PROGRESS: 'Your service is now in progress.',
      COMPLETED: 'Your service has been completed. Thank you!',
      CANCELLED: 'Your booking has been cancelled.',
    };

    if (statusMessages[status]) {
      await sendEmail({
        to: booking.customerEmail,
        subject: `Booking Update - ${booking.reservationCode}`,
        html: `
          <h1>${statusMessages[status]}</h1>
          <p>Dear ${booking.customerName},</p>
          <p>Reservation Code: <strong>${booking.reservationCode}</strong></p>
          <p>${booking.branch.name}</p>
        `
      }).catch(err => console.error('Email error:', err));
    }
  }

  res.json({
    success: true,
    message: 'Booking updated successfully',
    data: { booking }
  });
});

// @desc    Cancel booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
exports.cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await prisma.booking.update({
    where: { id: req.params.id },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date(),
    }
  });

  res.json({
    success: true,
    message: 'Booking cancelled successfully',
    data: { booking }
  });
});

// @desc    Get booking statistics
// @route   GET /api/v1/bookings/stats/summary
// @access  Private
exports.getBookingStats = catchAsync(async (req, res, next) => {
  const { branchId, startDate, endDate } = req.query;

  const where = { branchId };
  if (startDate && endDate) {
    where.scheduledDate = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  const [total, byStatus, revenue] = await Promise.all([
    prisma.booking.count({ where }),
    prisma.booking.groupBy({
      by: ['status'],
      where,
      _count: true,
    }),
    prisma.booking.aggregate({
      where: { ...where, status: 'COMPLETED' },
      _sum: { finalPrice: true },
    })
  ]);

  res.json({
    success: true,
    data: {
      total,
      byStatus,
      totalRevenue: revenue._sum.finalPrice || 0,
    }
  });
});
