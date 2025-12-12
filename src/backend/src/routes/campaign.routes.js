const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { catchAsync } = require('../middleware/errorHandler');

router.get('/', optionalAuth, catchAsync(async (req, res) => {
  const { branchId } = req.query;
  const now = new Date();
  const campaigns = await prisma.campaign.findMany({
    where: {
      ...(branchId && { branchId }),
      isActive: true,
      startDate: { lte: now },
      endDate: { gte: now },
    },
  });
  res.json({ success: true, data: { campaigns } });
}));

router.post('/', authenticateToken, catchAsync(async (req, res) => {
  const campaign = await prisma.campaign.create({ data: req.body });
  res.status(201).json({ success: true, data: { campaign } });
}));

router.put('/:id', authenticateToken, catchAsync(async (req, res) => {
  const campaign = await prisma.campaign.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: { campaign } });
}));

router.delete('/:id', authenticateToken, catchAsync(async (req, res) => {
  await prisma.campaign.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Campaign deleted' });
}));

module.exports = router;
