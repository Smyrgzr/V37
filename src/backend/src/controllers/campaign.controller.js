const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================
// GET ALL CAMPAIGNS
// ============================================
exports.getCampaigns = async (req, res) => {
  try {
    const { branchId, activeOnly } = req.query;
    const userId = req.user.id;
    const role = req.user.role;

    const whereClause = {};

    if (branchId) {
      whereClause.branchId = branchId;
      
      if (role !== 'ROOT_OWNER') {
        const branch = await prisma.branch.findFirst({
          where: { id: branchId, ownerId: userId }
        });
        if (!branch) {
          return res.status(403).json({
            success: false,
            error: 'Unauthorized access to branch'
          });
        }
      }
    } else if (role !== 'ROOT_OWNER') {
      const branches = await prisma.branch.findMany({
        where: { ownerId: userId },
        select: { id: true }
      });
      whereClause.branchId = { in: branches.map(b => b.id) };
    }

    if (activeOnly === 'true') {
      whereClause.isActive = true;
      whereClause.startDate = { lte: new Date() };
      whereClause.endDate = { gte: new Date() };
    }

    const campaigns = await prisma.campaign.findMany({
      where: whereClause,
      include: {
        branch: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: {
            bookings: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch campaigns'
    });
  }
};

// ============================================
// GET SINGLE CAMPAIGN
// ============================================
exports.getCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            ownerId: true
          }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }

    if (role !== 'ROOT_OWNER' && campaign.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch campaign'
    });
  }
};

// ============================================
// CREATE CAMPAIGN
// ============================================
exports.createCampaign = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const {
      branchId,
      title,
      description,
      type,
      discountValue,
      discountPercent,
      minPurchase,
      maxDiscount,
      startDate,
      endDate,
      usageLimit,
      applicableServices,
      applicableVehicles,
      code,
      imageUrl
    } = req.body;

    // Check branch ownership
    const branch = await prisma.branch.findFirst({
      where: {
        id: branchId,
        ...(role !== 'ROOT_OWNER' && { ownerId: userId })
      }
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found or unauthorized'
      });
    }

    // Check if code already exists
    if (code) {
      const existingCampaign = await prisma.campaign.findUnique({
        where: { code }
      });
      if (existingCampaign) {
        return res.status(400).json({
          success: false,
          error: 'Campaign code already exists'
        });
      }
    }

    const campaign = await prisma.campaign.create({
      data: {
        branchId,
        title,
        description,
        type,
        discountValue,
        discountPercent,
        minPurchase,
        maxDiscount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        usageLimit,
        applicableServices: applicableServices || [],
        applicableVehicles: applicableVehicles || [],
        code,
        imageUrl,
        isActive: true
      },
      include: {
        branch: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: campaign,
      message: 'Campaign created successfully'
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create campaign'
    });
  }
};

// ============================================
// UPDATE CAMPAIGN
// ============================================
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    const updateData = req.body;

    // Check authorization
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }

    if (role !== 'ROOT_OWNER' && campaign.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    // Convert dates if provided
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: updateData,
      include: {
        branch: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedCampaign,
      message: 'Campaign updated successfully'
    });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update campaign'
    });
  }
};

// ============================================
// DELETE CAMPAIGN
// ============================================
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    // Check authorization
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }

    if (role !== 'ROOT_OWNER' && campaign.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    // Soft delete
    await prisma.campaign.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete campaign'
    });
  }
};

// ============================================
// VALIDATE CAMPAIGN CODE
// ============================================
exports.validateCampaignCode = async (req, res) => {
  try {
    const { code, branchId } = req.body;

    const campaign = await prisma.campaign.findFirst({
      where: {
        code,
        branchId,
        isActive: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      }
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Invalid or expired campaign code'
      });
    }

    // Check usage limit
    if (campaign.usageLimit && campaign.usageCount >= campaign.usageLimit) {
      return res.status(400).json({
        success: false,
        error: 'Campaign usage limit reached'
      });
    }

    res.json({
      success: true,
      data: campaign,
      message: 'Campaign code is valid'
    });
  } catch (error) {
    console.error('Validate campaign code error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate campaign code'
    });
  }
};
