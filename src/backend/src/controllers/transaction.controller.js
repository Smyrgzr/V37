const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Commission rates by subscription tier
const COMMISSION_RATES = {
  STARTER: 15.0,      // 15%
  PROFESSIONAL: 10.0,  // 10%
  ENTERPRISE: 7.5      // 7.5%
};

/**
 * POST /api/v1/transactions
 * Create a new transaction (booking payment)
 */
exports.createTransaction = async (req, res) => {
  try {
    const {
      bookingId,
      userId,
      amount,
      paymentMethod,
      paymentGateway,
      currency = 'TRY'
    } = req.body;

    // Get user's subscription to determine commission rate
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE'
      },
      orderBy: { createdAt: 'desc' }
    });

    const commissionRate = subscription 
      ? COMMISSION_RATES[subscription.tierId]
      : COMMISSION_RATES.STARTER;

    const grossAmount = parseFloat(amount);
    const commissionAmount = (grossAmount * commissionRate) / 100;
    const netAmount = grossAmount - commissionAmount;

    const transaction = await prisma.transaction.create({
      data: {
        bookingId,
        userId,
        type: 'BOOKING_PAYMENT',
        status: 'PENDING',
        amount: grossAmount,
        currency,
        paymentMethod,
        grossAmount,
        commissionRate,
        commissionAmount,
        netAmount,
        paymentGateway
      }
    });

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * PUT /api/v1/transactions/:id/process
 * Process a pending transaction (payment gateway callback)
 */
exports.processTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      gatewayTransactionId,
      gatewayResponse,
      status = 'COMPLETED'
    } = req.body;

    const transaction = await prisma.$transaction(async (tx) => {
      // Update transaction
      const updatedTransaction = await tx.transaction.update({
        where: { id },
        data: {
          status,
          gatewayTransactionId,
          gatewayResponse,
          processedAt: new Date()
        }
      });

      // If successful, create commission record
      if (status === 'COMPLETED') {
        await tx.commission.create({
          data: {
            transactionId: id,
            carwashOwnerId: updatedTransaction.userId,
            transactionAmount: updatedTransaction.grossAmount,
            commissionRate: updatedTransaction.commissionRate,
            commissionAmount: updatedTransaction.commissionAmount,
            status: 'PENDING'
          }
        });

        // Update booking payment status if applicable
        if (updatedTransaction.bookingId) {
          await tx.booking.update({
            where: { id: updatedTransaction.bookingId },
            data: { paymentStatus: 'PAID' }
          });
        }
      }

      return updatedTransaction;
    });

    res.json({
      success: true,
      message: 'Transaction processed successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/transactions/user/:userId
 * Get user's transactions
 */
exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, type, limit = 50, offset = 0 } = req.query;

    const where = { userId };
    if (status) where.status = status;
    if (type) where.type = type;

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          commissions: {
            select: {
              id: true,
              status: true,
              commissionAmount: true,
              paidAt: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip: parseInt(offset)
      }),
      prisma.transaction.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        transactions,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/transactions/:id
 * Get transaction details
 */
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },
        commissions: true
      }
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    res.json({ success: true, data: transaction });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/v1/transactions/:id/refund
 * Refund a transaction
 */
exports.refundTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, reason } = req.body;

    const transaction = await prisma.transaction.findUnique({
      where: { id }
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    if (transaction.status !== 'COMPLETED') {
      return res.status(400).json({
        success: false,
        error: 'Only completed transactions can be refunded'
      });
    }

    const refundAmount = amount || transaction.amount;
    const currentRefunded = parseFloat(transaction.refundedAmount || 0);
    const totalRefunded = currentRefunded + parseFloat(refundAmount);

    if (totalRefunded > parseFloat(transaction.amount)) {
      return res.status(400).json({
        success: false,
        error: 'Refund amount exceeds transaction amount'
      });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        status: 'REFUNDED',
        refundedAmount: totalRefunded,
        failureReason: reason
      }
    });

    res.json({
      success: true,
      message: 'Transaction refunded successfully',
      data: updatedTransaction
    });
  } catch (error) {
    console.error('Error refunding transaction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/transactions/stats/:userId
 * Get transaction statistics for user
 */
exports.getTransactionStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    const where = {
      userId,
      status: 'COMPLETED'
    };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const [stats, transactions] = await Promise.all([
      prisma.transaction.aggregate({
        where,
        _sum: {
          grossAmount: true,
          commissionAmount: true,
          netAmount: true
        },
        _count: true
      }),
      prisma.transaction.findMany({
        where,
        select: {
          createdAt: true,
          grossAmount: true,
          commissionAmount: true,
          netAmount: true
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalTransactions: stats._count,
        totalRevenue: stats._sum.grossAmount || 0,
        totalCommission: stats._sum.commissionAmount || 0,
        netEarnings: stats._sum.netAmount || 0,
        transactions
      }
    });
  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
