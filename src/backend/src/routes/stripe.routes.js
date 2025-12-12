const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe.controller');
const { authenticate, authorize } = require('../middleware/auth');

// Public webhook endpoint (no auth required, Stripe signature verification instead)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeController.handleWebhook);

// Authenticated routes
router.use(authenticate);

// Payment intents
router.post('/create-payment-intent', stripeController.createPaymentIntent);
router.post('/setup-intent', stripeController.createSetupIntent);

// Customer management
router.post('/create-customer', stripeController.createCustomer);
router.get('/payment-methods/:customerId', stripeController.getPaymentMethods);

// Refunds
router.post('/refund', authorize(['ROOT_OWNER', 'CARWASH_OWNER']), stripeController.processRefund);

// Admin only
router.get('/balance', authorize(['ROOT_OWNER']), stripeController.getBalance);

module.exports = router;
