const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================
// GET ALL SERVICES
// ============================================
exports.getServices = async (req, res) => {
  try {
    const { branchId } = req.query;
    const userId = req.user.id;
    const role = req.user.role;

    const whereClause = {};

    if (branchId) {
      whereClause.branchId = branchId;
      
      // Check if user has access to this branch
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
      // Get services from user's branches only
      const branches = await prisma.branch.findMany({
        where: { ownerId: userId },
        select: { id: true }
      });
      whereClause.branchId = { in: branches.map(b => b.id) };
    }

    whereClause.isActive = true;

    const services = await prisma.service.findMany({
      where: whereClause,
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            city: true
          }
        },
        _count: {
          select: {
            bookings: true
          }
        }
      },
      orderBy: {
        displayOrder: 'asc'
      }
    });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
};

// ============================================
// GET SINGLE SERVICE
// ============================================
exports.getService = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const service = await prisma.service.findUnique({
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

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    // Check authorization
    if (role !== 'ROOT_OWNER' && service.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service'
    });
  }
};

// ============================================
// CREATE SERVICE
// ============================================
exports.createService = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const {
      branchId,
      name,
      description,
      businessModel,
      basePrice,
      baseDuration,
      vehicleTypeMultipliers,
      features,
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

    // Default vehicle type multipliers if not provided
    const defaultMultipliers = {
      SEDAN: 1.0,
      SUV: 1.3,
      TRUCK: 1.5,
      ELECTRIC_VEHICLE: 1.2,
      LUXURY: 1.8,
      MOTORCYCLE: 0.7,
      VAN: 1.4
    };

    const service = await prisma.service.create({
      data: {
        branchId,
        name,
        description,
        businessModel,
        basePrice,
        baseDuration,
        vehicleTypeMultipliers: vehicleTypeMultipliers || defaultMultipliers,
        features: features || [],
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
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service'
    });
  }
};

// ============================================
// UPDATE SERVICE
// ============================================
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    const updateData = req.body;

    // Check authorization
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    if (role !== 'ROOT_OWNER' && service.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const updatedService = await prisma.service.update({
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
      data: updatedService,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update service'
    });
  }
};

// ============================================
// DELETE SERVICE
// ============================================
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    // Check authorization
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    if (role !== 'ROOT_OWNER' && service.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    // Soft delete by setting isActive to false
    await prisma.service.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete service'
    });
  }
};
