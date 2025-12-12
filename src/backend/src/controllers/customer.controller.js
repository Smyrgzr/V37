const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================
// GET ALL CUSTOMERS
// ============================================
exports.getCustomers = async (req, res) => {
  try {
    const { branchId } = req.query;
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

    whereClause.isActive = true;

    const customers = await prisma.customer.findMany({
      where: whereClause,
      include: {
        branch: {
          select: {
            id: true,
            name: true
          }
        },
        vehicles: true,
        _count: {
          select: {
            bookings: true
          }
        }
      },
      orderBy: {
        totalVisits: 'desc'
      }
    });

    res.json({
      success: true,
      data: customers
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch customers'
    });
  }
};

// ============================================
// GET SINGLE CUSTOMER
// ============================================
exports.getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            ownerId: true
          }
        },
        vehicles: true,
        bookings: {
          take: 10,
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            service: {
              select: {
                name: true,
                basePrice: true
              }
            }
          }
        }
      }
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    if (role !== 'ROOT_OWNER' && customer.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch customer'
    });
  }
};

// ============================================
// CREATE CUSTOMER
// ============================================
exports.createCustomer = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const {
      branchId,
      email,
      phone,
      fullName,
      address,
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

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        branchId,
        OR: [
          { phone },
          ...(email ? [{ email }] : [])
        ]
      }
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        error: 'Customer with this phone or email already exists'
      });
    }

    const customer = await prisma.customer.create({
      data: {
        branchId,
        email,
        phone,
        fullName,
        address,
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
      data: customer,
      message: 'Customer created successfully'
    });
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create customer'
    });
  }
};

// ============================================
// UPDATE CUSTOMER
// ============================================
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    const updateData = req.body;

    // Check authorization
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    if (role !== 'ROOT_OWNER' && customer.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: updateData,
      include: {
        branch: {
          select: {
            id: true,
            name: true
          }
        },
        vehicles: true
      }
    });

    res.json({
      success: true,
      data: updatedCustomer,
      message: 'Customer updated successfully'
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update customer'
    });
  }
};

// ============================================
// DELETE CUSTOMER
// ============================================
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    // Check authorization
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        branch: {
          select: { ownerId: true }
        }
      }
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    if (role !== 'ROOT_OWNER' && customer.branch.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    // Soft delete
    await prisma.customer.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete customer'
    });
  }
};
