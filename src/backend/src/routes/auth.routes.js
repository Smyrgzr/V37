const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth');
const { validationRules, validate } = require('../middleware/validation');

router.post('/register', validationRules.register, validate, authController.register);
router.post('/login', validationRules.login, validate, authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authenticateToken, authController.logout);
router.get('/me', authenticateToken, authController.getMe);
router.put('/password', authenticateToken, authController.updatePassword);

module.exports = router;
