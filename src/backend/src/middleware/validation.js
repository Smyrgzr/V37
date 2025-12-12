const { validationResult, body, param, query } = require('express-validator');

// Validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  
  next();
};

// Common validation rules
const validationRules = {
  // Auth
  register: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('fullName').trim().notEmpty().withMessage('Full name required'),
    body('phone').optional().isMobilePhone().withMessage('Valid phone number required'),
  ],

  login: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],

  // Branch
  createBranch: [
    body('name').trim().notEmpty().withMessage('Branch name required'),
    body('address').trim().notEmpty().withMessage('Address required'),
    body('city').trim().notEmpty().withMessage('City required'),
    body('phone').isMobilePhone().withMessage('Valid phone number required'),
    body('businessModels').isArray({ min: 1 }).withMessage('At least one business model required'),
  ],

  // Station
  createStation: [
    body('branchId').isUUID().withMessage('Valid branch ID required'),
    body('name').trim().notEmpty().withMessage('Station name required'),
    body('type').isIn(['IN_BAY', 'TUNNEL', 'SELF_SERVICE']).withMessage('Valid station type required'),
  ],

  // Service
  createService: [
    body('branchId').isUUID().withMessage('Valid branch ID required'),
    body('name').trim().notEmpty().withMessage('Service name required'),
    body('businessModel').notEmpty().withMessage('Business model required'),
    body('basePrice').isFloat({ min: 0 }).withMessage('Valid price required'),
    body('baseDuration').isInt({ min: 1 }).withMessage('Valid duration required'),
  ],

  // Booking
  createBooking: [
    body('branchId').isUUID().withMessage('Valid branch ID required'),
    body('serviceId').isUUID().withMessage('Valid service ID required'),
    body('customerName').trim().notEmpty().withMessage('Customer name required'),
    body('customerPhone').isMobilePhone().withMessage('Valid phone number required'),
    body('vehicleType').isIn(['SEDAN', 'SUV', 'TRUCK', 'ELECTRIC_VEHICLE', 'LUXURY', 'MOTORCYCLE', 'VAN'])
      .withMessage('Valid vehicle type required'),
    body('startTime').isISO8601().withMessage('Valid start time required'),
    body('endTime').isISO8601().withMessage('Valid end time required'),
  ],

  // Customer
  createCustomer: [
    body('branchId').isUUID().withMessage('Valid branch ID required'),
    body('phone').isMobilePhone().withMessage('Valid phone number required'),
    body('fullName').trim().notEmpty().withMessage('Full name required'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
  ],

  // Campaign
  createCampaign: [
    body('branchId').isUUID().withMessage('Valid branch ID required'),
    body('title').trim().notEmpty().withMessage('Campaign title required'),
    body('type').notEmpty().withMessage('Campaign type required'),
    body('startDate').isISO8601().withMessage('Valid start date required'),
    body('endDate').isISO8601().withMessage('Valid end date required'),
  ],

  // UUID param
  uuidParam: [
    param('id').isUUID().withMessage('Valid ID required'),
  ],

  // Pagination
  pagination: [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  ],
};

module.exports = {
  validate,
  validationRules,
};
