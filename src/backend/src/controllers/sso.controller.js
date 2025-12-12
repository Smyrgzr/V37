const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const { AppError, catchAsync } = require('../middleware/errorHandler');
const {
  cognitoSignUp,
  cognitoConfirmSignUp,
  cognitoSignIn,
  cognitoGetUser,
  cognitoForgotPassword,
  cognitoResetPassword,
} = require('../config/cognito');

// Generate JWT tokens (same as auth controller)
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

// ============================================
// AWS COGNITO ENDPOINTS
// ============================================

// @desc    Sign up with Cognito
// @route   POST /api/v1/auth/cognito/signup
// @access  Public
exports.cognitoSignUpHandler = catchAsync(async (req, res, next) => {
  const { email, password, fullName, phone } = req.body;

  // Sign up with Cognito
  const cognitoUser = await cognitoSignUp({ email, password, fullName, phone });

  // Create user in our database (unverified)
  const user = await prisma.user.create({
    data: {
      email,
      fullName,
      phone,
      password: '', // Password stored in Cognito
      role: 'CARWASH_OWNER',
      isActive: false, // Will be activated after email confirmation
      cognitoSub: cognitoUser.username,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
    }
  });

  res.status(201).json({
    success: true,
    message: 'Verification code sent to your email',
    data: { user }
  });
});

// @desc    Confirm Cognito sign up
// @route   POST /api/v1/auth/cognito/confirm
// @access  Public
exports.cognitoConfirmHandler = catchAsync(async (req, res, next) => {
  const { email, code } = req.body;

  // Confirm with Cognito
  await cognitoConfirmSignUp(email, code);

  // Activate user in our database
  const user = await prisma.user.update({
    where: { email },
    data: { isActive: true },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
    }
  });

  res.json({
    success: true,
    message: 'Email verified successfully',
    data: { user }
  });
});

// @desc    Sign in with Cognito
// @route   POST /api/v1/auth/cognito/signin
// @access  Public
exports.cognitoSignInHandler = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Sign in with Cognito
  const cognitoTokens = await cognitoSignIn(email, password);

  // Get user from Cognito
  const cognitoUser = await cognitoGetUser(cognitoTokens.accessToken);

  // Find or create user in our database
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: cognitoUser.email,
        fullName: cognitoUser.fullName || cognitoUser.email.split('@')[0],
        phone: cognitoUser.phone,
        password: '',
        role: 'CARWASH_OWNER',
        cognitoSub: cognitoUser.username,
        isActive: true,
      }
    });
  }

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() }
  });

  // Generate our JWT tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Save refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      activityType: 'USER_LOGIN',
      description: `User ${user.email} logged in via Cognito`,
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
      cognitoTokens,
    }
  });
});

// @desc    Forgot password - send code
// @route   POST /api/v1/auth/cognito/forgot-password
// @access  Public
exports.cognitoForgotPasswordHandler = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  await cognitoForgotPassword(email);

  res.json({
    success: true,
    message: 'Verification code sent to your email'
  });
});

// @desc    Reset password with code
// @route   POST /api/v1/auth/cognito/reset-password
// @access  Public
exports.cognitoResetPasswordHandler = catchAsync(async (req, res, next) => {
  const { email, code, newPassword } = req.body;

  await cognitoResetPassword(email, code, newPassword);

  res.json({
    success: true,
    message: 'Password reset successful'
  });
});

// ============================================
// OAUTH CALLBACK HANDLERS
// ============================================

// @desc    Google OAuth callback
// @route   GET /api/v1/auth/google/callback
// @access  Public
exports.googleCallback = catchAsync(async (req, res, next) => {
  const user = req.user;

  // Generate our JWT tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Save refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  // Redirect to frontend with tokens
  const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}&refresh=${refreshToken}`;
  res.redirect(redirectUrl);
});

// @desc    Apple Sign In callback
// @route   POST /api/v1/auth/apple/callback
// @access  Public
exports.appleCallback = catchAsync(async (req, res, next) => {
  const user = req.user;

  const { accessToken, refreshToken } = generateTokens(user.id);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}&refresh=${refreshToken}`;
  res.redirect(redirectUrl);
});

// @desc    Microsoft OAuth callback
// @route   GET /api/v1/auth/microsoft/callback
// @access  Public
exports.microsoftCallback = catchAsync(async (req, res, next) => {
  const user = req.user;

  const { accessToken, refreshToken } = generateTokens(user.id);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}&refresh=${refreshToken}`;
  res.redirect(redirectUrl);
});

// @desc    OAuth failure handler
// @route   GET /api/v1/auth/failure
// @access  Public
exports.authFailure = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
};
