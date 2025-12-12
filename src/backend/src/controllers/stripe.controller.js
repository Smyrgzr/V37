const { PrismaClient } = require('@prisma/client');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

// Commission rates
const COMMISSION_RATES = {
  STARTER: 15.0,
  PROFESSIONAL: 10.0,
  ENTERPRISE: 7.5
};

/**
 * POST /api/v1/stripe/create-payment-intent
 * Create a Stripe Payment Intent for booking
 */
exports.createPaymentIntent = async (req, res) => {
  try {
    const { bookingId, userId, amount, currency = 'try' } = req.body;

    if (!bookingId || !userId || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: bookingId, userId, amount'
      });
    }

    // Get user subscription to determine commission rate
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

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(grossAmount * 100), // Stripe uses smallest currency unit (kuruş for TRY)
      currency: currency.toLowerCase(),
      metadata: {
        bookingId,
        userId,
        commissionRate: commissionRate.toString(),
        commissionAmount: commissionAmount.toString(),
        netAmount: netAmount.toString(),
        platform: 'letwash'
      },
      description: `Letwash Booking Payment - ${bookingId}`
    });

    // Create transaction record in database
    const transaction = await prisma.transaction.create({
      data: {
        bookingId,
        userId,
        type: 'BOOKING_PAYMENT',
        status: 'PENDING',
        amount: grossAmount,
        currency: currency.toUpperCase(),
        paymentMethod: 'CREDIT_CARD',
        grossAmount,
        commissionRate,
        commissionAmount,
        netAmount,
        paymentGateway: 'stripe',
        gatewayTransactionId: paymentIntent.id,
        gatewayResponse: {
          clientSecret: paymentIntent.client_secret,
          status: paymentIntent.status
        }
      }
    });

    res.status(201).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        transactionId: transaction.id,
        amount: grossAmount,
        commissionAmount,
        netAmount
      }
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * POST /api/v1/stripe/webhook
 * Handle Stripe webhook events
 */
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(paymentIntent) {
  const { id, metadata, amount, currency } = paymentIntent;

  console.log('Payment succeeded:', id);

  await prisma.$transaction(async (tx) => {
    // Update transaction
    const transaction = await tx.transaction.update({
      where: { gatewayTransactionId: id },
      data: {
        status: 'COMPLETED',
        processedAt: new Date(),
        gatewayResponse: paymentIntent
      }
    });

    // Create commission record
    await tx.commission.create({
      data: {
        transactionId: transaction.id,
        carwashOwnerId: metadata.userId,
        branchId: null, // You can add branchId to metadata if needed
        transactionAmount: transaction.grossAmount,
        commissionRate: transaction.commissionRate,
        commissionAmount: transaction.commissionAmount,
        status: 'PENDING'
      }
    });

    // Update booking payment status
    if (transaction.bookingId) {
      await tx.booking.update({
        where: { id: transaction.bookingId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED'
        }
      });
    }

    // Create notification for user
    await tx.notification.create({
      data: {
        userId: metadata.userId,
        type: 'PAYMENT_RECEIVED',
        title: 'Payment Successful',
        message: `Payment of ${(amount / 100).toFixed(2)} ${currency.toUpperCase()} received successfully.`,
        data: {
          transactionId: transaction.id,
          bookingId: transaction.bookingId,
          amount: amount / 100
        }
      }
    });
  });

  console.log('Payment processing completed');
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(paymentIntent) {
  const { id, last_payment_error } = paymentIntent;

  console.log('Payment failed:', id, last_payment_error?.message);

  await prisma.transaction.update({
    where: { gatewayTransactionId: id },
    data: {
      status: 'FAILED',
      failureReason: last_payment_error?.message || 'Payment failed',
      gatewayResponse: paymentIntent
    }
  });
}

/**
 * Handle refund
 */
async function handleRefund(charge) {
  const { payment_intent, amount_refunded } = charge;

  console.log('Refund processed:', payment_intent, amount_refunded);

  await prisma.transaction.update({
    where: { gatewayTransactionId: payment_intent },
    data: {
      status: 'REFUNDED',
      refundedAmount: amount_refunded / 100
    }
  });
}

/**
 * POST /api/v1/stripe/refund
 * Process a refund
 */
exports.processRefund = async (req, res) => {
  try {
    const { transactionId, amount, reason } = req.body;

    // Get transaction
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId }
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

    // Create refund with Stripe
    const refund = await stripe.refunds.create({
      payment_intent: transaction.gatewayTransactionId,
      amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
      reason: reason || 'requested_by_customer'
    });

    // Update transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: 'REFUNDED',
        refundedAmount: refund.amount / 100,
        failureReason: reason
      }
    });

    // Update booking
    if (transaction.bookingId) {
      await prisma.booking.update({
        where: { id: transaction.bookingId },
        data: {
          paymentStatus: 'REFUNDED',
          status: 'CANCELLED'
        }
      });
    }

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        refundId: refund.id,
        amount: refund.amount / 100,
        transaction: updatedTransaction
      }
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * GET /api/v1/stripe/payment-methods/:customerId
 * Get saved payment methods for customer
 */
exports.getPaymentMethods = async (req, res) => {
  try {
    const { customerId } = req.params;

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card'
    });

    res.json({
      success: true,
      data: paymentMethods.data
    });
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * POST /api/v1/stripe/create-customer
 * Create a Stripe customer
 */
exports.createCustomer = async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      metadata: {
        platform: 'letwash'
      }
    });

    res.status(201).json({
      success: true,
      data: {
        customerId: customer.id,
        email: customer.email
      }
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * GET /api/v1/stripe/balance
 * Get Stripe balance (for admin)
 */
exports.getBalance = async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();

    res.json({
      success: true,
      data: balance
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * POST /api/v1/stripe/setup-intent
 * Create setup intent for saving card without charging
 */
exports.createSetupIntent = async (req, res) => {
  try {
    const { customerId } = req.body;

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card']
    });

    res.json({
      success: true,
      data: {
        clientSecret: setupIntent.client_secret
      }
    });
  } catch (error) {
    console.error('Error creating setup intent:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
