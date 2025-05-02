const nodemailer = require('nodemailer');
require('dotenv').config();

// Log email configuration (without sensitive data)
console.log('Email Configuration:');
console.log('Service:', 'gmail');
console.log('Email User:', process.env.EMAIL_USER ? 'Configured' : 'Not Configured');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "heshaltempdissanayake@gmail.com",
        pass: "dufz xyvs txqy tjlv"
    }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Email transporter verification failed:', error);
    } else {
        console.log('Email transporter is ready to send emails');
    }
});

const sendReservationEmail = async (to, userName, slotId, entryTime) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Parking Reservation Confirmation - SojournParking',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #2c3e50;">Reservation Confirmed!</h1>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <p style="font-size: 16px;">Dear ${userName},</p>
                    <p style="font-size: 16px;">Your parking reservation has been successfully made with the following details:</p>
                    
                    <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Reservation Details</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 10px;"><strong>Parking Slot:</strong> ${slotId}</li>
                            <li style="margin-bottom: 10px;"><strong>Entry Time:</strong> ${new Date(entryTime).toLocaleString()}</li>
                        </ul>
                    </div>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #2c3e50; margin-top: 0;">Important Information</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">• Please arrive on time for your reservation</li>
                        <li style="margin-bottom: 10px;">• Keep this email for your records</li>
                        <li style="margin-bottom: 10px;">• Contact support if you need to modify your reservation</li>
                    </ul>
                </div>

                <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 14px;">Thank you for choosing SojournParking!</p>
                    <p style="color: #666; font-size: 14px;">Best regards,<br>SojournParking Team</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

const sendMembershipConfirmationEmail = async (to, employeeId, membershipDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Membership Confirmation - SojournParking',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #2c3e50;">Membership Confirmed!</h1>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <p style="font-size: 16px;">Dear Employee ${employeeId},</p>
                    <p style="font-size: 16px;">Your membership has been successfully registered with the following details:</p>
                    
                    <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Membership Details</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 10px;"><strong>Employee ID:</strong> ${membershipDetails.EmployeeID}</li>
                            <li style="margin-bottom: 10px;"><strong>License Plate No:</strong> ${membershipDetails.LicensePlateNo}</li>
                        </ul>
                    </div>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #2c3e50; margin-top: 0;">Important Information</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">• Please keep your membership details secure</li>
                        <li style="margin-bottom: 10px;">• Present your membership details when parking</li>
                        <li style="margin-bottom: 10px;">• Contact support if you need to update your membership details</li>
                    </ul>
                </div>

                <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 14px;">Thank you for choosing SojournParking!</p>
                    <p style="color: #666; font-size: 14px;">Best regards,<br>SojournParking Team</p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

const sendComplaintConfirmationEmail = async (to, complaintDetails) => {
    console.log('Attempting to send email to:', to);
    console.log('Complaint details:', complaintDetails);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('Email credentials not configured in environment variables');
        return false;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Complaint Received - SojournParking',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #2c3e50;">Complaint Received</h1>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <p style="font-size: 16px;">Dear Valued Customer,</p>
                    <p style="font-size: 16px;">We have received your complaint and are working to address it. Here are the details of your complaint:</p>
                    
                    <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Complaint Details</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 10px;"><strong>Date:</strong> ${new Date(complaintDetails.date).toLocaleDateString()}</li>
                            <li style="margin-bottom: 10px;"><strong>Issue:</strong> ${complaintDetails.comp}</li>
                            <li style="margin-bottom: 10px;"><strong>Description:</strong> ${complaintDetails.describe}</li>
                        </ul>
                    </div>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #2c3e50; margin-top: 0;">Next Steps</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">• Our team will review your complaint</li>
                        <li style="margin-bottom: 10px;">• We will contact you if we need additional information</li>
                        <li style="margin-bottom: 10px;">• You will receive updates on the resolution process</li>
                    </ul>
                </div>

                <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 14px;">Thank you for bringing this to our attention.</p>
                    <p style="color: #666; font-size: 14px;">Best regards,<br>SojournParking Support Team</p>
                </div>
            </div>
        `
    };

    try {
        console.log('Sending email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending complaint confirmation email:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        return false;
    }
};

const sendReviewConfirmationEmail = async (to, reviewDetails) => {
    console.log('Attempting to send review confirmation email to:', to);
    console.log('Review details:', reviewDetails);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('Email credentials not configured in environment variables');
        return false;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Thank You for Your Review - SojournParking',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #2c3e50;">Thank You for Your Review!</h1>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <p style="font-size: 16px;">Dear Valued Customer,</p>
                    <p style="font-size: 16px;">We have received your review and truly appreciate your feedback. Here are the details of your review:</p>
                    
                    <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Review Details</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 10px;"><strong>Rating:</strong> ${reviewDetails.rating} out of 5 stars</li>
                            <li style="margin-bottom: 10px;"><strong>Recommendation:</strong> ${reviewDetails.RService}</li>
                            <li style="margin-bottom: 10px;"><strong>Comments:</strong> ${reviewDetails.RThought}</li>
                            <li style="margin-bottom: 10px;"><strong>Date:</strong> ${new Date(reviewDetails.date).toLocaleDateString()}</li>
                        </ul>
                    </div>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #2c3e50; margin-top: 0;">Your Feedback Matters</h3>
                    <p style="font-size: 16px;">We value your input and will use it to improve our services. Thank you for helping us make SojournParking better!</p>
                </div>

                <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 14px;">Thank you for choosing SojournParking!</p>
                    <p style="color: #666; font-size: 14px;">Best regards,<br>SojournParking Team</p>
                </div>
            </div>
        `
    };

    try {
        console.log('Sending review confirmation email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Review confirmation email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending review confirmation email:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        return false;
    }
};

module.exports = { 
    sendReservationEmail, 
    sendMembershipConfirmationEmail, 
    sendComplaintConfirmationEmail, 
    sendReviewConfirmationEmail 
};

