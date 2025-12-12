const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { catchAsync } = require('../middleware/errorHandler');

router.get('/dashboard', authenticateToken, catchAsync(async (req, res) => {
  const { branchId, startDate, endDate } = req.query;
  
  const where = {
    branchId,
    ...(startDate && endDate && {
      scheduledDate: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    })
  };

  const [totalBookings, totalRevenue, avgRating, topServices] = await Promise.all([
    prisma.booking.count({ where }),
    prisma.booking.aggregate({
      where: { ...where, status: 'COMPLETED' },
      _sum: { finalPrice: true }
    }),
    prisma.booking.aggregate({
      where: { ...where, status: 'COMPLETED', rating: { not: null } },
      _avg: { rating: true }
    }),
    prisma.booking.groupBy({
      by: ['serviceId'],
      where,
      _count: true,
      _sum: { finalPrice: true },
      orderBy: { _count: { serviceId: 'desc' } },
      take: 5
    })
  ]);

  res.json({
    success: true,
    data: {
      totalBookings,
      totalRevenue: totalRevenue._sum.finalPrice || 0,
      avgRating: avgRating._avg.rating || 0,
      topServices,
    }
  });
}));

module.exports = router;
