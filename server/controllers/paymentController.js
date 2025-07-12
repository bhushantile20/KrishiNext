const Payment = require('../models/paymentSchema');
const Order = require('../models/orderSchema');
const { paymentService } = require('../services/paymentService');


exports.createCheckoutSession = async (req, res) => {
  try {
    const { lineItems, successUrl, cancelUrl, orderId, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      metadata: { orderId, userId },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error);
    res.status(500).json({ error: 'Could not create checkout session' });
  }
};

// Create a payment record
exports.createPayment = async (req, res) => {
  try {
    const { orderId, userId, paymentMethod, transactionId, amountPaid } = req.body;

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create payment record
    const payment = new Payment({
      orderId,
      userId,
      paymentMethod,
      transactionId,
      amountPaid,
      paymentStatus: 'Completed', // Assuming success for now
    });

    await payment.save();

    // Update order status to paid (if necessary)
    // order.paymentStatus = 'Paid';
    // await order.save();

    res.status(201).json({ message: 'Payment successfully processed', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing payment' });
  }
};

// Update payment status (e.g., when a payment fails or is refunded)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    // Validate status
    if (!['Pending', 'Completed', 'Failed', 'Refunded'].includes(status)) {
      return res.status(400).json({ error: 'Invalid payment status' });
    }

    // Update payment status
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    payment.paymentStatus = status;
    await payment.save();

    res.status(200).json({ message: 'Payment status updated successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating payment status' });
  }
};

const sendMail = require('../services/mailServices');

exports.sendPaymentReceipt = async (req, res) => {
  const { email, content, subject } = req.body;
  try {
    const result = await sendMail(email, content, subject);
    if (result) {
      res.status(200).json({ message: 'Email sent' });
    } else {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
