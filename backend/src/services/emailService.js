const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mg5762@srmist.edu.in',
    pass: 'luoq wiic dtvl jqnu'      
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'mg5762@srmist.edu.in', 
    to: to,                            
    subject: subject,               
    text: text                        
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
