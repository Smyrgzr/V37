const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const { AppError, catchAsync } = require('../middleware/errorHandler');

// Generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );

  return { accessToken, refreshToken };
};

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  const { email, password, fullName, phone, role } = req.body;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return next(new AppError('Email already registered', 409));
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
      phone,
      role: role || 'CARWASH_OWNER',
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      createdAt: true,
    }
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Save refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    }
  });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user,
      accessToken,
      refreshToken,
    }
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError('Account is inactive', 403));
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Save refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() }
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      activityType: 'USER_LOGIN',
      description: `User ${user.email} logged in`,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    }
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      accessToken,
      refreshToken,
    }
  });
});

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh
// @access  Public
exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError('Refresh token required', 400));
  }

  // Verify refresh token
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  // Check if token exists in database
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken }
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    return next(new AppError('Invalid or expired refresh token', 401));
  }

  // Generate new tokens
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

  // Delete old refresh token
  await prisma.refreshToken.delete({
    where: { token: refreshToken }
  });

  // Save new refresh token
  await prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: decoded.userId,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  res.json({
    success: true,
    data: {
      accessToken,
      refreshToken: newRefreshToken,
    }
  });
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    // Delete refresh token
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken }
    });
  }

  // Log activity
  await prisma.activityLog.create({
    data: {
      userId: req.user.id,
      activityType: 'USER_LOGOUT',
      description: `User ${req.user.email} logged out`,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    }
  });

  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      fullName: true,
      phone: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
      ownedBranches: {
        select: {
          id: true,
          name: true,
          city: true,
        }
      }
    }
  });

  res.json({
    success: true,
    data: { user }
  });
});

// @desc    Update password
// @route   PUT /api/v1/auth/password
// @access  Private
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  });

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    return next(new AppError('Current password is incorrect', 401));
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashedPassword }
  });

  // Delete all refresh tokens (force re-login)
  await prisma.refreshToken.deleteMany({
    where: { userId: req.user.id }
  });

  res.json({
    success: true,
    message: 'Password updated successfully'
  });
});
