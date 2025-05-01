const express = require('express');
const router = express.Router();

const Complaint = require('../Models/ComplaintModel');
const ComplaintController = require('../Controllers/ComplaintController');
const { sendComplaintConfirmationEmail } = require('../config/emailConfig');

router.get('/', ComplaintController.getAllComplaint);
router.post('/', ComplaintController.DisComplaint);
router.get('/:id', ComplaintController.getById);
router.put('/:id', ComplaintController.updateComplaint);
router.delete('/:id', ComplaintController.deleteComplaint);

router.post('/send-confirmation', async (req, res) => {
    try {
        const { email, complaintDetails } = req.body;
        
        // Validate email
        if (!email || email === "N/A" || !email.includes('@')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email address' 
            });
        }

        if (!complaintDetails) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing complaint details' 
            });
        }

        // Ensure the date is in a valid format
        const formattedComplaintDetails = {
            ...complaintDetails,
            date: new Date(complaintDetails.date).toISOString()
        };
        
        console.log('Sending confirmation email to:', email);
        console.log('Complaint details:', formattedComplaintDetails);
        
        const emailSent = await sendComplaintConfirmationEmail(email, formattedComplaintDetails);
        
        if (emailSent) {
            console.log('Email sent successfully to:', email);
            res.json({ success: true, message: 'Confirmation email sent successfully' });
        } else {
            console.error('Failed to send email to:', email);
            res.status(500).json({ success: false, message: 'Failed to send confirmation email' });
        }
    } catch (error) {
        console.error('Error in send-confirmation route:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while sending confirmation email',
            error: error.message 
        });
    }
});

module.exports = router;
