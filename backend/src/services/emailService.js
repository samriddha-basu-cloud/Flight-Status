const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'samriddhabasu35@gmail.com',
    pass: 'xlop xywl nnvk qaej'      
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'samriddhabas1234@gmail.com', 
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
