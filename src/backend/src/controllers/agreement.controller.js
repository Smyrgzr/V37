const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * GET /api/v1/agreements
 * Get all active agreements
 */
exports.getActiveAgreements = async (req, res) => {
  try {
    const agreements = await prisma.agreement.findMany({
      where: {
        status: 'ACTIVE',
        effectiveDate: { lte: new Date() },
        OR: [
          { expiryDate: null },
          { expiryDate: { gte: new Date() } }
        ]
      },
      orderBy: { type: 'asc' }
    });

    res.json({ success: true, data: agreements });
  } catch (error) {
    console.error('Error fetching agreements:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/agreements/:type
 * Get specific agreement type (latest version)
 */
exports.getAgreementByType = async (req, res) => {
  try {
    const { type } = req.params;

    const agreement = await prisma.agreement.findFirst({
      where: {
        type: type.toUpperCase(),
        status: 'ACTIVE',
        effectiveDate: { lte: new Date() }
      },
      orderBy: { version: 'desc' }
    });

    if (!agreement) {
      return res.status(404).json({ 
        success: false, 
        error: 'Agreement not found' 
      });
    }

    res.json({ success: true, data: agreement });
  } catch (error) {
    console.error('Error fetching agreement:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/v1/agreements/sign
 * Sign an agreement
 */
exports.signAgreement = async (req, res) => {
  try {
    const { userId, agreementId, signatureData } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent') || 'Unknown';

    // Check if already signed
    const existing = await prisma.userAgreement.findUnique({
      where: {
        userId_agreementId: {
          userId,
          agreementId
        }
      }
    });

    if (existing) {
      return res.json({ 
        success: true, 
        message: 'Agreement already signed',
        data: existing 
      });
    }

    const userAgreement = await prisma.userAgreement.create({
      data: {
        userId,
        agreementId,
        ipAddress,
        userAgent,
        signatureData
      },
      include: {
        agreement: true
      }
    });

    res.status(201).json({ 
      success: true, 
      message: 'Agreement signed successfully',
      data: userAgreement 
    });
  } catch (error) {
    console.error('Error signing agreement:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/agreements/user/:userId/status
 * Check if user has signed all required agreements
 */
exports.getUserAgreementStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all required active agreements
    const requiredAgreements = await prisma.agreement.findMany({
      where: {
        status: 'ACTIVE',
        type: {
          in: ['TERMS_OF_SERVICE', 'PRIVACY_POLICY', 'TRANSACTION_AGREEMENT']
        },
        effectiveDate: { lte: new Date() }
      }
    });

    // Get user's signed agreements
    const signedAgreements = await prisma.userAgreement.findMany({
      where: { userId },
      include: { agreement: true }
    });

    const signedIds = new Set(signedAgreements.map(sa => sa.agreementId));
    const missingAgreements = requiredAgreements.filter(
      ra => !signedIds.has(ra.id)
    );

    res.json({
      success: true,
      data: {
        allSigned: missingAgreements.length === 0,
        requiredCount: requiredAgreements.length,
        signedCount: signedAgreements.length,
        missingAgreements: missingAgreements.map(a => ({
          id: a.id,
          type: a.type,
          title: a.title,
          version: a.version
        }))
      }
    });
  } catch (error) {
    console.error('Error checking agreement status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/agreements/user/:userId
 * Get all agreements signed by user
 */
exports.getUserAgreements = async (req, res) => {
  try {
    const { userId } = req.params;

    const userAgreements = await prisma.userAgreement.findMany({
      where: { userId },
      include: {
        agreement: {
          select: {
            id: true,
            type: true,
            version: true,
            title: true,
            effectiveDate: true
          }
        }
      },
      orderBy: { signedAt: 'desc' }
    });

    res.json({ success: true, data: userAgreements });
  } catch (error) {
    console.error('Error fetching user agreements:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/v1/agreements (Admin only)
 * Create new agreement
 */
exports.createAgreement = async (req, res) => {
  try {
    const { type, version, title, content, effectiveDate, expiryDate } = req.body;

    const agreement = await prisma.agreement.create({
      data: {
        type,
        version,
        title,
        content,
        status: 'ACTIVE',
        effectiveDate: new Date(effectiveDate),
        expiryDate: expiryDate ? new Date(expiryDate) : null
      }
    });

    res.status(201).json({ 
      success: true, 
      message: 'Agreement created successfully',
      data: agreement 
    });
  } catch (error) {
    console.error('Error creating agreement:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
