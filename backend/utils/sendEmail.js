const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "heshaltempdissanayake@gmail.com",
    pass: "dufz xyvs txqy tjlv"
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Auth App" <heshaltempdissanayake@gmail.com>',
      to,
      subject,
      text,
    });
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
