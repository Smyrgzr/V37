const { prisma } = require('../config/database');
const { AppError, catchAsync } = require('../middleware/errorHandler');

// @desc    Create subscription
// @route   POST /api/v1/subscriptions
// @access  Private
exports.createSubscription = catchAsync(async (req, res, next) => {
  const { tierId, billingCycle, businessModules } = req.body;
  const userId = req.user.id;

  // Get user to find carwash center
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { ownedBranches: true }
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Create subscription
  const subscription = await prisma.subscription.create({
    data: {
      userId,
      tierId,
      billingCycle,
      status: 'trial', // Start with trial
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      currentPeriodStart: new Date(),
      currentPeriodEnd: billingCycle === 'monthly'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    }
  });

  // Save business modules (if provided)
  if (businessModules && businessModules.length > 0) {
    await prisma.businessModule.createMany({
      data: businessModules.map((module) => ({
        userId,
        subscriptionId: subscription.id,
        moduleName: module,
        isActive: true,
      }))
    });
  }

  // Log activity
  await prisma.activityLog.create({
    data: {
      userId,
      activityType: 'SUBSCRIPTION_CREATED',
      description: `Subscription created: ${tierId} (${billingCycle})`,
      metadata: { tierId, billingCycle, businessModules }
    }
  });

  res.status(201).json({
    success: true,
    message: 'Subscription created successfully',
    data: { subscription }
  });
});

// @desc    Update subscription
// @route   PUT /api/v1/subscriptions/:id
// @access  Private
exports.updateSubscription = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { tierId, billingCycle } = req.body;
  const userId = req.user.id;

  const subscription = await prisma.subscription.findUnique({
    where: { id }
  });

  if (!subscription) {
    return next(new AppError('Subscription not found', 404));
  }

  if (subscription.userId !== userId) {
    return next(new AppError('Not authorized', 403));
  }

  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      tierId,
      billingCycle,
      updatedAt: new Date(),
    }
  });

  await prisma.activityLog.create({
    data: {
      userId,
      activityType: 'SUBSCRIPTION_UPDATED',
      description: `Subscription updated: ${tierId} (${billingCycle})`,
    }
  });

  res.json({
    success: true,
    message: 'Subscription updated successfully',
    data: { subscription: updated }
  });
});

// @desc    Cancel subscription
// @route   DELETE /api/v1/subscriptions/:id
// @access  Private
exports.cancelSubscription = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const subscription = await prisma.subscription.findUnique({
    where: { id }
  });

  if (!subscription) {
    return next(new AppError('Subscription not found', 404));
  }

  if (subscription.userId !== userId) {
    return next(new AppError('Not authorized', 403));
  }

  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      status: 'canceled',
      canceledAt: new Date(),
    }
  });

  await prisma.activityLog.create({
    data: {
      userId,
      activityType: 'SUBSCRIPTION_CANCELED',
      description: 'Subscription canceled',
    }
  });

  res.json({
    success: true,
    message: 'Subscription canceled successfully',
    data: { subscription: updated }
  });
});

// @desc    Get user subscription
// @route   GET /api/v1/subscriptions/me
// @access  Private
exports.getMySubscription = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const subscription = await prisma.subscription.findFirst({
    where: { userId, status: { not: 'canceled' } },
    include: {
      businessModules: true
    }
  });

  res.json({
    success: true,
    data: { subscription: subscription || null }
  });
});

// @desc    Update business modules
// @route   PUT /api/v1/subscriptions/modules
// @access  Private
exports.updateBusinessModules = catchAsync(async (req, res, next) => {
  const { modules } = req.body;
  const userId = req.user.id;

  if (!Array.isArray(modules)) {
    return next(new AppError('Modules must be an array', 400));
  }

  // Find active subscription
  const subscription = await prisma.subscription.findFirst({
    where: { userId, status: { not: 'canceled' } }
  });

  if (!subscription) {
    return next(new AppError('No active subscription found', 404));
  }

  // Delete existing modules
  await prisma.businessModule.deleteMany({
    where: { subscriptionId: subscription.id }
  });

  // Create new modules
  if (modules.length > 0) {
    await prisma.businessModule.createMany({
      data: modules.map((module) => ({
        userId,
        subscriptionId: subscription.id,
        moduleName: module,
        isActive: true,
      }))
    });
  }

  await prisma.activityLog.create({
    data: {
      userId,
      activityType: 'MODULES_UPDATED',
      description: `Business modules updated: ${modules.join(', ')}`,
    }
  });

  res.json({
    success: true,
    message: 'Business modules updated successfully',
    data: { modules }
  });
});
