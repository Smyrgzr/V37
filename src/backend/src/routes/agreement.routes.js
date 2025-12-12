const express = require('express');
const router = express.Router();
const agreementController = require('../controllers/agreement.controller');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.get('/', agreementController.getActiveAgreements);
router.get('/:type', agreementController.getAgreementByType);

// Authenticated routes
router.post('/sign', authenticate, agreementController.signAgreement);
router.get('/user/:userId/status', authenticate, agreementController.getUserAgreementStatus);
router.get('/user/:userId', authenticate, agreementController.getUserAgreements);

// Admin only routes
router.post('/', authenticate, authorize(['ROOT_OWNER']), agreementController.createAgreement);

module.exports = router;
