const express = require('express');
const router = express.Router();
const { prisma } = require('../config/database');
const { authenticateToken, authorizeBranchOwner } = require('../middleware/auth');
const { catchAsync } = require('../middleware/errorHandler');

// Get all branches
router.get('/', authenticateToken, catchAsync(async (req, res) => {
  const where = req.user.role === 'ROOT_OWNER' ? {} : { ownerId: req.user.id };
  
  const branches = await prisma.branch.findMany({
    where,
    include: {
      _count: {
        select: { stations: true, bookings: true }
      }
    }
  });

  res.json({ success: true, data: { branches } });
}));

// Get single branch
router.get('/:id', authenticateToken, catchAsync(async (req, res) => {
  const branch = await prisma.branch.findUnique({
    where: { id: req.params.id },
    include: {
      stations: true,
      services: true,
      _count: { select: { bookings: true, customers: true } }
    }
  });

  res.json({ success: true, data: { branch } });
}));

// Create branch
router.post('/', authenticateToken, catchAsync(async (req, res) => {
  const branch = await prisma.branch.create({
    data: {
      ...req.body,
      ownerId: req.user.id,
    }
  });

  res.status(201).json({ success: true, data: { branch } });
}));

// Update branch
router.put('/:id', authenticateToken, authorizeBranchOwner, catchAsync(async (req, res) => {
  const branch = await prisma.branch.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.json({ success: true, data: { branch } });
}));

// Delete branch
router.delete('/:id', authenticateToken, authorizeBranchOwner, catchAsync(async (req, res) => {
  await prisma.branch.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Branch deleted' });
}));

module.exports = router;
