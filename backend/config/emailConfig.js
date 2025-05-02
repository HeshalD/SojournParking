const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
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

module.exports = { sendReservationEmail, sendMembershipConfirmationEmail };
