const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is inactive'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Check user role
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Check branch ownership
const authorizeBranchOwner = async (req, res, next) => {
  try {
    const branchId = req.params.branchId || req.body.branchId;

    if (!branchId) {
      return res.status(400).json({
        success: false,
        message: 'Branch ID required'
      });
    }

    // ROOT_OWNER can access all branches
    if (req.user.role === 'ROOT_OWNER') {
      return next();
    }

    // Check if user owns the branch
    const branch = await prisma.branch.findFirst({
      where: {
        id: branchId,
        ownerId: req.user.id
      }
    });

    if (!branch) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this branch'
      });
    }

    req.branch = branch;
    next();
  } catch (error) {
    next(error);
  }
};

// Optional authentication (for public + authenticated routes)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          isActive: true,
        }
      });

      if (user && user.isActive) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

module.exports = {
  authenticateToken,
  authorizeRole,
  authorizeBranchOwner,
  optionalAuth,
};
