const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmergencyEmail = async (to, emergencyType, details) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: `Emergency Assistance Request - ${emergencyType}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #2c3e50;">Emergency Assistance Request Received</h1>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <p style="font-size: 16px;">Dear Valued Customer,</p>
                    <p style="font-size: 16px;">We have received your ${emergencyType} emergency assistance request. Our team has been notified and will respond as soon as possible.</p>
                    
                    <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Request Details</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 10px;"><strong>License Plate:</strong> ${details.lpname}</li>
                            <li style="margin-bottom: 10px;"><strong>Emergency Type:</strong> ${details.etype}</li>
                            ${details.pcon ? `<li style="margin-bottom: 10px;"><strong>Patient Condition:</strong> ${details.pcon}</li>` : ''}
                            ${details.anote ? `<li style="margin-bottom: 10px;"><strong>Additional Notes:</strong> ${details.anote}</li>` : ''}
                        </ul>
                    </div>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <h3 style="color: #2c3e50; margin-top: 0;">Important Information</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">• Please remain at your location</li>
                        <li style="margin-bottom: 10px;">• Keep this email for your records</li>
                        <li style="margin-bottom: 10px;">• If this is a life-threatening emergency, please call emergency services immediately</li>
                    </ul>
                </div>

                <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 14px;">Thank you for using SojournParking!</p>
                    <p style="color: #666; font-size: 14px;">Best regards,<br>SojournParking Emergency Response Team</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending emergency email:', error);
        return false;
    }
};

module.exports = { sendEmergencyEmail }; 