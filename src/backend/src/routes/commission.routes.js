const express = require('express');
const router = express.Router();
const commissionController = require('../controllers/commission.controller');
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Owner routes
router.get('/owner/:ownerId', commissionController.getOwnerCommissions);
router.get('/stats/:ownerId', commissionController.getCommissionStats);
router.get('/payouts/owner/:ownerId', commissionController.getOwnerPayouts);

// Admin only routes
router.put('/:id/approve', authorize(['ROOT_OWNER']), commissionController.approveCommission);
router.post('/payout/create', authorize(['ROOT_OWNER']), commissionController.createPayoutBatch);
router.put('/payout/:batchId/process', authorize(['ROOT_OWNER']), commissionController.processPayoutBatch);
router.get('/dashboard/letwash', authorize(['ROOT_OWNER']), commissionController.getLetwashCommissionDashboard);

module.exports = router;
