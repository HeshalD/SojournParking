const mongoose = require('mongoose');

const CreditCardPaymentSchema = new mongoose.Schema({
    cardholder: {
        type: String,
        required: true,
        trim: true
    },
    cardnumber: {
        type: String,
        required: true,
        trim: true
    },
    expiry: {
        type: String,
        required: true,
        trim: true
    },
    cvv: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    parkingDetails: {
        licensePlate: {
            type: String,
            required: true
        },
        entryTime: {
            type: Date,
            required: true
        },
        exitTime: {
            type: Date,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Check if the model already exists before creating it
let CreditCardPayment;
try {
    CreditCardPayment = mongoose.model('CreditCardPayment');
} catch (error) {
    CreditCardPayment = mongoose.model('CreditCardPayment', CreditCardPaymentSchema);
}

module.exports = CreditCardPayment; 