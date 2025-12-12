const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================
// GET ALL STATIONS
// ============================================
exports.getStations = async (req, res) => {
  try {
    const { branchId } = req.query;
    const userId = req.user.id;
    const role = req.user.role;

    const whereClause = {};

    if (branchId) {
      whereClause.branchId = branchId;
      
      // Check authorization
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

    whereClause.isActive = true;

    const stations = await prisma.station.findMany({
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
        name: 'asc'
      }
    });

    res.json({
      success: true,
      data: stations
    });
  } catch (error) {
    console.error('Get stations error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stations'
    });
  }
};

// ============================================
// CREATE STATION
// ============================================
exports.createStation = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const {
      branchId,
      name,
      type,
      capacity,
      notes
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

    const station = await prisma.station.create({
      data: {
        branchId,
        name,
        type,
        status: 'AVAILABLE',
        capacity: capacity || 1,
        notes,
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
      data: station,
      message: 'Station created successfully'
    });
  } catch (error) {
    console.error('Create station error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create station'
    });
  }
};

// ============================================
// UPDATE STATION
// ============================================
exports.updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    const updateData = req.body;

    // Check authorization
    const station = await prisma.station.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!station) {
      return res.status(404).json({
        success: false,
        error: 'Station not found'
      });
    }

    if (role !== 'ROOT_OWNER' && station.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const updatedStation = await prisma.station.update({
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
      data: updatedStation,
      message: 'Station updated successfully'
    });
  } catch (error) {
    console.error('Update station error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update station'
    });
  }
};

// ============================================
// DELETE STATION
// ============================================
exports.deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    // Check authorization
    const station = await prisma.station.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!station) {
      return res.status(404).json({
        success: false,
        error: 'Station not found'
      });
    }

    if (role !== 'ROOT_OWNER' && station.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    // Soft delete
    await prisma.station.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Station deleted successfully'
    });
  } catch (error) {
    console.error('Delete station error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete station'
    });
  }
};

// ============================================
// UPDATE STATION STATUS
// ============================================
exports.updateStationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    // Check authorization
    const station = await prisma.station.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!station) {
      return res.status(404).json({
        success: false,
        error: 'Station not found'
      });
    }

    if (role !== 'ROOT_OWNER' && station.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const updatedStation = await prisma.station.update({
      where: { id },
      data: { status }
    });

    res.json({
      success: true,
      data: updatedStation,
      message: 'Station status updated successfully'
    });
  } catch (error) {
    console.error('Update station status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update station status'
    });
  }
};
