const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================
// GET DASHBOARD ANALYTICS
// ============================================
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const { branchId, startDate, endDate } = req.query;
    const userId = req.user.id;
    const role = req.user.role;

    // Date range
    const start = startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
    const end = endDate ? new Date(endDate) : new Date();

    // Branch filter
    let branchIds = [];
    if (branchId) {
      if (role !== 'ROOT_OWNER') {
        const branch = await prisma.branch.findFirst({
          where: { id: branchId, ownerId: userId }
        });
        if (!branch) {
          return res.status(403).json({
            success: false,
            error: 'Unauthorized access to branch'
          });
        }
      }
      branchIds = [branchId];
    } else {
      if (role === 'ROOT_OWNER') {
        const branches = await prisma.branch.findMany({ select: { id: true } });
        branchIds = branches.map(b => b.id);
      } else {
        const branches = await prisma.branch.findMany({
          where: { ownerId: userId },
          select: { id: true }
        });
        branchIds = branches.map(b => b.id);
      }
    }

    // Bookings stats
    const bookings = await prisma.booking.findMany({
      where: {
        branchId: { in: branchIds },
        createdAt: {
          gte: start,
          lte: end
        }
      },
      include: {
        service: {
          select: {
            name: true,
            businessModel: true
          }
        }
      }
    });

    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === 'COMPLETED').length;
    const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'COMPLETED')
      .reduce((sum, b) => sum + parseFloat(b.finalPrice), 0);

    // Customers stats
    const customers = await prisma.customer.findMany({
      where: {
        branchId: { in: branchIds }
      }
    });

    const totalCustomers = customers.length;
    const newCustomers = customers.filter(c => 
      c.createdAt >= start && c.createdAt <= end
    ).length;

    // Top services
    const serviceStats = {};
    bookings.forEach(booking => {
      const serviceName = booking.service.name;
      if (!serviceStats[serviceName]) {
        serviceStats[serviceName] = {
          name: serviceName,
          count: 0,
          revenue: 0
        };
      }
      serviceStats[serviceName].count++;
      if (booking.status === 'COMPLETED') {
        serviceStats[serviceName].revenue += parseFloat(booking.finalPrice);
      }
    });

    const topServices = Object.values(serviceStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Vehicle type distribution
    const vehicleTypeStats = {};
    bookings.forEach(booking => {
      const vehicleType = booking.vehicleType;
      vehicleTypeStats[vehicleType] = (vehicleTypeStats[vehicleType] || 0) + 1;
    });

    // Daily revenue trend
    const dailyRevenue = {};
    bookings
      .filter(b => b.status === 'COMPLETED')
      .forEach(booking => {
        const date = booking.scheduledDate.toISOString().split('T')[0];
        dailyRevenue[date] = (dailyRevenue[date] || 0) + parseFloat(booking.finalPrice);
      });

    const revenueTrend = Object.entries(dailyRevenue)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Average ratings
    const ratingsData = bookings.filter(b => b.rating);
    const averageRating = ratingsData.length > 0
      ? ratingsData.reduce((sum, b) => sum + b.rating, 0) / ratingsData.length
      : null;

    res.json({
      success: true,
      data: {
        overview: {
          totalBookings,
          completedBookings,
          cancelledBookings,
          totalRevenue: totalRevenue.toFixed(2),
          totalCustomers,
          newCustomers,
          averageRating: averageRating ? averageRating.toFixed(1) : null,
          completionRate: totalBookings > 0 
            ? ((completedBookings / totalBookings) * 100).toFixed(1) 
            : 0
        },
        topServices,
        vehicleTypeDistribution: Object.entries(vehicleTypeStats).map(([type, count]) => ({
          type,
          count
        })),
        revenueTrend,
        dateRange: {
          start: start.toISOString(),
          end: end.toISOString()
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    });
  }
};

// ============================================
// GET BOOKING STATS
// ============================================
exports.getBookingStats = async (req, res) => {
  try {
    const { branchId, period } = req.query;
    const userId = req.user.id;
    const role = req.user.role;

    // Calculate date range based on period
    let startDate = new Date();
    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
    }

    const whereClause = {
      createdAt: { gte: startDate }
    };

    if (branchId) {
      if (role !== 'ROOT_OWNER') {
        const branch = await prisma.branch.findFirst({
          where: { id: branchId, ownerId: userId }
        });
        if (!branch) {
          return res.status(403).json({
            success: false,
            error: 'Unauthorized'
          });
        }
      }
      whereClause.branchId = branchId;
    } else if (role !== 'ROOT_OWNER') {
      const branches = await prisma.branch.findMany({
        where: { ownerId: userId },
        select: { id: true }
      });
      whereClause.branchId = { in: branches.map(b => b.id) };
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause
    });

    const stats = {
      total: bookings.length,
      requested: bookings.filter(b => b.status === 'REQUESTED').length,
      confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
      inProgress: bookings.filter(b => b.status === 'IN_PROGRESS').length,
      completed: bookings.filter(b => b.status === 'COMPLETED').length,
      cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
      noShow: bookings.filter(b => b.status === 'NO_SHOW').length
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booking stats'
    });
  }
};

// ============================================
// GET REVENUE STATS
// ============================================
exports.getRevenueStats = async (req, res) => {
  try {
    const { branchId, year, month } = req.query;
    const userId = req.user.id;
    const role = req.user.role;

    const whereClause = {
      status: 'COMPLETED',
      paymentStatus: 'PAID'
    };

    if (year && month) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      whereClause.scheduledDate = {
        gte: startDate,
        lte: endDate
      };
    }

    if (branchId) {
      if (role !== 'ROOT_OWNER') {
        const branch = await prisma.branch.findFirst({
          where: { id: branchId, ownerId: userId }
        });
        if (!branch) {
          return res.status(403).json({
            success: false,
            error: 'Unauthorized'
          });
        }
      }
      whereClause.branchId = branchId;
    } else if (role !== 'ROOT_OWNER') {
      const branches = await prisma.branch.findMany({
        where: { ownerId: userId },
        select: { id: true }
      });
      whereClause.branchId = { in: branches.map(b => b.id) };
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause
    });

    const totalRevenue = bookings.reduce((sum, b) => 
      sum + parseFloat(b.finalPrice), 0
    );

    const totalDiscount = bookings.reduce((sum, b) => 
      sum + parseFloat(b.discount || 0), 0
    );

    const avgBookingValue = bookings.length > 0 
      ? totalRevenue / bookings.length 
      : 0;

    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue.toFixed(2),
        totalDiscount: totalDiscount.toFixed(2),
        totalBookings: bookings.length,
        averageBookingValue: avgBookingValue.toFixed(2)
      }
    });
  } catch (error) {
    console.error('Get revenue stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch revenue stats'
    });
  }
};
