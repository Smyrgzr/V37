const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { catchAsync } = require('../middleware/errorHandler');

router.get('/', optionalAuth, catchAsync(async (req, res) => {
  const { branchId, businessModel } = req.query;
  const services = await prisma.service.findMany({
    where: {
      ...(branchId && { branchId }),
      ...(businessModel && { businessModel }),
      isActive: true,
    },
    include: { branch: { select: { name: true } } }
  });
  res.json({ success: true, data: { services } });
}));

router.post('/', authenticateToken, catchAsync(async (req, res) => {
  const service = await prisma.service.create({ data: req.body });
  res.status(201).json({ success: true, data: { service } });
}));

router.put('/:id', authenticateToken, catchAsync(async (req, res) => {
  const service = await prisma.service.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: { service } });
}));

router.delete('/:id', authenticateToken, catchAsync(async (req, res) => {
  await prisma.service.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Service deleted' });
}));

module.exports = router;
