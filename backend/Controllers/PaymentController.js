const CreditCardPayment = require('../Models/PaymentModel');

// Process payment
const processPayment = async (req, res) => {
    try {
        const { cardholder, cardnumber, expiry, cvv, amount, parkingDetails } = req.body;
        
        console.log('Received payment data:', {
            cardholder,
            cardnumber: cardnumber ? '**** **** **** ' + cardnumber.slice(-4) : undefined,
            expiry,
            cvv: cvv ? '***' : undefined,
            amount,
            parkingDetails
        });

        // Validate required fields
        if (!cardholder || !cardnumber || !expiry || !cvv) {
            console.log('Missing required fields:', {
                cardholder: !cardholder,
                cardnumber: !cardnumber,
                expiry: !expiry,
                cvv: !cvv
            });
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Validate card number using Luhn algorithm
        if (!isValidCardNumber(cardnumber)) {
            console.log('Invalid card number');
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid card number' 
            });
        }

        // Validate expiry date
        if (!isValidExpiryDate(expiry)) {
            console.log('Invalid expiry date');
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid expiry date' 
            });
        }

        // Create new payment record
        const payment = new CreditCardPayment({
            cardholder,
            cardnumber: maskCardNumber(cardnumber), // Store masked card number
            expiry,
            cvv: '***', // Don't store actual CVV
            amount: amount || 0,
            status: 'completed', // In a real application, this would be set after actual payment processing
            parkingDetails: parkingDetails || {}
        });

        await payment.save();

        // Generate receipt details
        const receiptDetails = {
            paymentId: payment._id,
            amount: payment.amount,
            cardLastFour: payment.cardnumber.slice(-4),
            paymentDate: payment.createdAt,
            status: payment.status,
            cardholder: payment.cardholder,
            parkingDetails: payment.parkingDetails
        };

        res.status(200).json({
            success: true,
            message: 'Payment processed successfully',
            receipt: receiptDetails
        });
    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing payment'
        });
    }
};

// Helper function to validate card number using Luhn algorithm
const isValidCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleaned)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i));

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

// Helper function to validate expiry date
const isValidExpiryDate = (expiry) => {
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) return false;

    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    return parseInt(year) > currentYear || 
           (parseInt(year) === currentYear && parseInt(month) >= currentMonth);
};

// Helper function to mask card number
const maskCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    return '**** **** **** ' + cleaned.slice(-4);
};

module.exports = {
    processPayment
}; 