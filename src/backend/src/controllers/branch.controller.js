const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================
// GET ALL BRANCHES
// ============================================
exports.getBranches = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let branches;
    if (role === 'ROOT_OWNER') {
      // Root owner can see all branches
      branches = await prisma.branch.findMany({
        include: {
          owner: {
            select: { id: true, fullName: true, email: true }
          },
          stations: true,
          services: true,
          _count: {
            select: {
              bookings: true,
              customers: true
            }
          }
        }
      });
    } else {
      // Others can only see their own branches
      branches = await prisma.branch.findMany({
        where: { ownerId: userId },
        include: {
          stations: true,
          services: true,
          _count: {
            select: {
              bookings: true,
              customers: true
            }
          }
        }
      });
    }

    res.json({
      success: true,
      data: branches
    });
  } catch (error) {
    console.error('Get branches error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch branches'
    });
  }
};

// ============================================
// GET SINGLE BRANCH
// ============================================
exports.getBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const branch = await prisma.branch.findFirst({
      where: {
        id,
        ...(role !== 'ROOT_OWNER' && { ownerId: userId })
      },
      include: {
        owner: {
          select: { id: true, fullName: true, email: true }
        },
        stations: true,
        services: true,
        _count: {
          select: {
            bookings: true,
            customers: true,
            campaigns: true
          }
        }
      }
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found'
      });
    }

    res.json({
      success: true,
      data: branch
    });
  } catch (error) {
    console.error('Get branch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch branch'
    });
  }
};

// ============================================
// CREATE BRANCH
// ============================================
exports.createBranch = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      email,
      latitude,
      longitude,
      businessModels,
      operatingHours
    } = req.body;

    const branch = await prisma.branch.create({
      data: {
        ownerId: userId,
        name,
        address,
        city,
        state,
        zipCode,
        country: country || 'Turkey',
        phone,
        email,
        latitude,
        longitude,
        businessModels,
        operatingHours,
        isActive: true
      },
      include: {
        owner: {
          select: { id: true, fullName: true, email: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: branch,
      message: 'Branch created successfully'
    });
  } catch (error) {
    console.error('Create branch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create branch'
    });
  }
};

// ============================================
// UPDATE BRANCH
// ============================================
exports.updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    const updateData = req.body;

    // Check ownership
    const existingBranch = await prisma.branch.findFirst({
      where: {
        id,
        ...(role !== 'ROOT_OWNER' && { ownerId: userId })
      }
    });

    if (!existingBranch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found or unauthorized'
      });
    }

    const branch = await prisma.branch.update({
      where: { id },
      data: updateData,
      include: {
        owner: {
          select: { id: true, fullName: true, email: true }
        }
      }
    });

    res.json({
      success: true,
      data: branch,
      message: 'Branch updated successfully'
    });
  } catch (error) {
    console.error('Update branch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update branch'
    });
  }
};

// ============================================
// DELETE BRANCH
// ============================================
exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    // Check ownership
    const existingBranch = await prisma.branch.findFirst({
      where: {
        id,
        ...(role !== 'ROOT_OWNER' && { ownerId: userId })
      }
    });

    if (!existingBranch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found or unauthorized'
      });
    }

    await prisma.branch.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Branch deleted successfully'
    });
  } catch (error) {
    console.error('Delete branch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete branch'
    });
  }
};
