const express = require('express');
const router = express.Router();
const PaymentController = require('../Controllers/PaymentController');

// Process payment
router.post('/', PaymentController.processPayment);

module.exports = router; 