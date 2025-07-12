const express = require('express');
const { createPayment, updatePaymentStatus, createCheckoutSession, sendPaymentReceipt,  } = require('../controllers/paymentController');
const router = express.Router();

// Route to create a payment record
router.post('/create', createPayment);

// Route to update payment status
router.post('/update-status', updatePaymentStatus);

router.post('/create-checkout-session', createCheckoutSession);

router.post('/send-receipt', sendPaymentReceipt);

module.exports = router;
