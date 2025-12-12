const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableEndpoints: {
      auth: '/api/v1/auth',
      branches: '/api/v1/branches',
      stations: '/api/v1/stations',
      services: '/api/v1/services',
      bookings: '/api/v1/bookings',
      customers: '/api/v1/customers',
      campaigns: '/api/v1/campaigns',
      analytics: '/api/v1/analytics',
      notifications: '/api/v1/notifications',
    }
  });
};

module.exports = { notFound };
