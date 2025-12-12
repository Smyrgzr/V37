const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { catchAsync } = require('../middleware/errorHandler');

router.get('/', authenticateToken, catchAsync(async (req, res) => {
  const { branchId, search } = req.query;
  const customers = await prisma.customer.findMany({
    where: {
      branchId,
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search } },
          { email: { contains: search, mode: 'insensitive' } },
        ]
      })
    },
    include: {
      _count: { select: { bookings: true, vehicles: true } }
    }
  });
  res.json({ success: true, data: { customers } });
}));

router.post('/', authenticateToken, catchAsync(async (req, res) => {
  const customer = await prisma.customer.create({ data: req.body });
  res.status(201).json({ success: true, data: { customer } });
}));

router.put('/:id', authenticateToken, catchAsync(async (req, res) => {
  const customer = await prisma.customer.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: { customer } });
}));

module.exports = router;
