const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * GET /api/v1/commissions/owner/:ownerId
 * Get commissions for a carwash owner
 */
exports.getOwnerCommissions = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { status, limit = 50, offset = 0 } = req.query;

    const where = { carwashOwnerId: ownerId };
    if (status) where.status = status;

    const [commissions, total] = await Promise.all([
      prisma.commission.findMany({
        where,
        include: {
          transaction: {
            select: {
              id: true,
              type: true,
              createdAt: true,
              bookingId: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip: parseInt(offset)
      }),
      prisma.commission.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        commissions,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching commissions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/commissions/stats/:ownerId
 * Get commission statistics for owner
 */
exports.getCommissionStats = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { startDate, endDate } = req.query;

    const where = { carwashOwnerId: ownerId };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // Get overall stats
    const stats = await prisma.commission.groupBy({
      by: ['status'],
      where,
      _sum: {
        commissionAmount: true,
        transactionAmount: true
      },
      _count: true
    });

    // Get total pending payout
    const pendingStats = await prisma.commission.aggregate({
      where: {
        ...where,
        status: { in: ['PENDING', 'APPROVED'] }
      },
      _sum: {
        commissionAmount: true
      }
    });

    // Get paid stats
    const paidStats = await prisma.commission.aggregate({
      where: {
        ...where,
        status: 'PAID'
      },
      _sum: {
        commissionAmount: true
      },
      _count: true
    });

    res.json({
      success: true,
      data: {
        byStatus: stats,
        pendingPayout: pendingStats._sum.commissionAmount || 0,
        totalPaid: paidStats._sum.commissionAmount || 0,
        paidCount: paidStats._count
      }
    });
  } catch (error) {
    console.error('Error fetching commission stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * PUT /api/v1/commissions/:id/approve (Admin only)
 * Approve a commission
 */
exports.approveCommission = async (req, res) => {
  try {
    const { id } = req.params;

    const commission = await prisma.commission.update({
      where: { id },
      data: {
        status: 'APPROVED'
      }
    });

    res.json({
      success: true,
      message: 'Commission approved successfully',
      data: commission
    });
  } catch (error) {
    console.error('Error approving commission:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/v1/commissions/payout/create (Admin only)
 * Create a payout batch for an owner
 */
exports.createPayoutBatch = async (req, res) => {
  try {
    const {
      ownerId,
      bankAccountName,
      bankAccountNumber,
      bankName,
      scheduledDate
    } = req.body;

    // Get all approved commissions for this owner
    const approvedCommissions = await prisma.commission.findMany({
      where: {
        carwashOwnerId: ownerId,
        status: 'APPROVED',
        payoutBatchId: null
      }
    });

    if (approvedCommissions.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No approved commissions available for payout'
      });
    }

    const totalAmount = approvedCommissions.reduce(
      (sum, c) => sum + parseFloat(c.commissionAmount),
      0
    );

    // Create payout batch
    const payoutBatch = await prisma.$transaction(async (tx) => {
      const batch = await tx.payoutBatch.create({
        data: {
          ownerId,
          totalAmount,
          commissionCount: approvedCommissions.length,
          status: 'SCHEDULED',
          bankAccountName,
          bankAccountNumber,
          bankName,
          scheduledDate: new Date(scheduledDate)
        }
      });

      // Update commissions with payout batch ID
      await tx.commission.updateMany({
        where: {
          id: { in: approvedCommissions.map(c => c.id) }
        },
        data: {
          payoutBatchId: batch.id
        }
      });

      return batch;
    });

    res.status(201).json({
      success: true,
      message: 'Payout batch created successfully',
      data: payoutBatch
    });
  } catch (error) {
    console.error('Error creating payout batch:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * PUT /api/v1/commissions/payout/:batchId/process (Admin only)
 * Process a payout batch
 */
exports.processPayoutBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { paymentReference, status = 'COMPLETED' } = req.body;

    const payoutBatch = await prisma.$transaction(async (tx) => {
      // Update payout batch
      const batch = await tx.payoutBatch.update({
        where: { id: batchId },
        data: {
          status,
          processedAt: new Date(),
          completedAt: status === 'COMPLETED' ? new Date() : null
        }
      });

      // If completed, mark commissions as paid
      if (status === 'COMPLETED') {
        await tx.commission.updateMany({
          where: { payoutBatchId: batchId },
          data: {
            status: 'PAID',
            paidAt: new Date(),
            paymentReference
          }
        });
      }

      return batch;
    });

    res.json({
      success: true,
      message: 'Payout batch processed successfully',
      data: payoutBatch
    });
  } catch (error) {
    console.error('Error processing payout batch:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/commissions/payouts/owner/:ownerId
 * Get payout batches for owner
 */
exports.getOwnerPayouts = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const payouts = await prisma.payoutBatch.findMany({
      where: { ownerId },
      orderBy: { scheduledDate: 'desc' }
    });

    res.json({ success: true, data: payouts });
  } catch (error) {
    console.error('Error fetching payouts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/commissions/dashboard/letwash (Admin only)
 * Get Letwash commission dashboard data
 */
exports.getLetwashCommissionDashboard = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // Total commissions by status
    const commissionsByStatus = await prisma.commission.groupBy({
      by: ['status'],
      where,
      _sum: {
        commissionAmount: true
      },
      _count: true
    });

    // Monthly commission trend
    const monthlyCommissions = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        SUM(commission_amount) as total_commission,
        COUNT(*) as transaction_count
      FROM commissions
      WHERE created_at >= COALESCE(${startDate}::timestamp, CURRENT_DATE - INTERVAL '12 months')
        AND created_at <= COALESCE(${endDate}::timestamp, CURRENT_DATE)
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month DESC
      LIMIT 12
    `;

    // Top earning carwash owners
    const topOwners = await prisma.commission.groupBy({
      by: ['carwashOwnerId'],
      where: {
        ...where,
        status: 'PAID'
      },
      _sum: {
        commissionAmount: true
      },
      _count: true,
      orderBy: {
        _sum: {
          commissionAmount: 'desc'
        }
      },
      take: 10
    });

    // Get owner details for top owners
    const ownersWithDetails = await Promise.all(
      topOwners.map(async (owner) => {
        const user = await prisma.user.findUnique({
          where: { id: owner.carwashOwnerId },
          select: {
            id: true,
            fullName: true,
            email: true
          }
        });
        return {
          ...user,
          totalCommission: owner._sum.commissionAmount,
          transactionCount: owner._count
        };
      })
    );

    res.json({
      success: true,
      data: {
        commissionsByStatus,
        monthlyCommissions,
        topOwners: ownersWithDetails
      }
    });
  } catch (error) {
    console.error('Error fetching Letwash dashboard:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
