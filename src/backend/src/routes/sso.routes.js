const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const ssoController = require('../controllers/sso.controller');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// ============================================
// AWS COGNITO ROUTES
// ============================================

router.post(
  '/cognito/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('fullName').trim().notEmpty(),
  ],
  validate,
  ssoController.cognitoSignUpHandler
);

router.post(
  '/cognito/confirm',
  [
    body('email').isEmail().normalizeEmail(),
    body('code').isLength({ min: 6, max: 6 }),
  ],
  validate,
  ssoController.cognitoConfirmHandler
);

router.post(
  '/cognito/signin',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  validate,
  ssoController.cognitoSignInHandler
);

router.post(
  '/cognito/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  validate,
  ssoController.cognitoForgotPasswordHandler
);

router.post(
  '/cognito/reset-password',
  [
    body('email').isEmail().normalizeEmail(),
    body('code').isLength({ min: 6, max: 6 }),
    body('newPassword').isLength({ min: 8 }),
  ],
  validate,
  ssoController.cognitoResetPasswordHandler
);

// ============================================
// GOOGLE OAUTH ROUTES
// ============================================

router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/api/v1/auth/failure',
    session: false 
  }),
  ssoController.googleCallback
);

// ============================================
// APPLE SIGN IN ROUTES
// ============================================

router.get(
  '/apple',
  passport.authenticate('apple', { session: false })
);

router.post(
  '/apple/callback',
  passport.authenticate('apple', { 
    failureRedirect: '/api/v1/auth/failure',
    session: false 
  }),
  ssoController.appleCallback
);

// ============================================
// MICROSOFT OAUTH ROUTES
// ============================================

router.get(
  '/microsoft',
  passport.authenticate('microsoft', { 
    scope: ['user.read'],
    session: false 
  })
);

router.get(
  '/microsoft/callback',
  passport.authenticate('microsoft', { 
    failureRedirect: '/api/v1/auth/failure',
    session: false 
  }),
  ssoController.microsoftCallback
);

// ============================================
// FAILURE ROUTE
// ============================================

router.get('/failure', ssoController.authFailure);

module.exports = router;
