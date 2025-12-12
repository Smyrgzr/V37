const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { authenticate, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Transaction management
router.post('/', transactionController.createTransaction);
router.get('/user/:userId', transactionController.getUserTransactions);
router.get('/stats/:userId', transactionController.getTransactionStats);
router.get('/:id', transactionController.getTransactionById);

// Transaction processing (webhook/callback)
router.put('/:id/process', transactionController.processTransaction);

// Refund (admin or owner)
router.post('/:id/refund', authorize(['ROOT_OWNER', 'CARWASH_OWNER']), transactionController.refundTransaction);

module.exports = router;
