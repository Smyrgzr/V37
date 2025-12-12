const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validationRules, validate } = require('../middleware/validation');

router.post('/', optionalAuth, validationRules.createBooking, validate, bookingController.createBooking);
router.get('/', authenticateToken, validationRules.pagination, validate, bookingController.getAllBookings);
router.get('/stats/summary', authenticateToken, bookingController.getBookingStats);
router.get('/:id', authenticateToken, validationRules.uuidParam, validate, bookingController.getBooking);
router.put('/:id', authenticateToken, validationRules.uuidParam, validate, bookingController.updateBooking);
router.delete('/:id', authenticateToken, validationRules.uuidParam, validate, bookingController.cancelBooking);

module.exports = router;
