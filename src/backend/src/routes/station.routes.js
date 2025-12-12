const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { catchAsync } = require('../middleware/errorHandler');

router.get('/', authenticateToken, catchAsync(async (req, res) => {
  const { branchId, status } = req.query;
  const stations = await prisma.station.findMany({
    where: { ...(branchId && { branchId }), ...(status && { status }) },
    include: { branch: { select: { name: true } } }
  });
  res.json({ success: true, data: { stations } });
}));

router.post('/', authenticateToken, catchAsync(async (req, res) => {
  const station = await prisma.station.create({ data: req.body });
  res.status(201).json({ success: true, data: { station } });
}));

router.put('/:id', authenticateToken, catchAsync(async (req, res) => {
  const station = await prisma.station.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: { station } });
}));

router.delete('/:id', authenticateToken, catchAsync(async (req, res) => {
  await prisma.station.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Station deleted' });
}));

module.exports = router;
