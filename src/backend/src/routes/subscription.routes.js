const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Get my subscription
router.get('/me', subscriptionController.getMySubscription);

// Create subscription
router.post('/', subscriptionController.createSubscription);

// Update subscription
router.put('/:id', subscriptionController.updateSubscription);

// Cancel subscription
router.delete('/:id', subscriptionController.cancelSubscription);

// Update business modules
router.put('/modules', subscriptionController.updateBusinessModules);

module.exports = router;
