const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'orders'  // Reference to the order that the payment is related to
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'  // Reference to the user who made the payment
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Stripe', 'Razorpay'], // Add more payment methods if required
    required: true
  },
  transactionId: {
    type: String,  // Unique identifier for the transaction
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  amountPaid: {
    type: Number,
    required: true,  // Payment amount in cents or the smallest unit
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentDetails: {
    type: Object,  // Store additional details such as card details or transaction metadata
    required: false
  },
});

module.exports = mongoose.model('payments', paymentSchema);
