// src/services/emailService.js
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail for sending email
  auth: {
    user: 'samriddhabasu35@gmail.com', // Your Gmail address
    pass: 'xlop xywl nnvk qaej'         // Your Gmail password or app-specific password
  }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'samriddhabas1234@gmail.com', // Sender address
    to: to,                            // Recipient address
    subject: subject,                 // Subject line
    text: text                        // Plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
