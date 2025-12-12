const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { catchAsync } = require('../middleware/errorHandler');

router.get('/', authenticateToken, catchAsync(async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  res.json({ success: true, data: { notifications } });
}));

router.put('/:id/read', authenticateToken, catchAsync(async (req, res) => {
  await prisma.notification.update({
    where: { id: req.params.id },
    data: { isRead: true },
  });
  res.json({ success: true, message: 'Notification marked as read' });
}));

router.put('/read-all', authenticateToken, catchAsync(async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, isRead: false },
    data: { isRead: true },
  });
  res.json({ success: true, message: 'All notifications marked as read' });
}));

module.exports = router;
