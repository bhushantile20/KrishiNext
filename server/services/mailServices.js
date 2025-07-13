// emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,          // your Gmail address
    pass: process.env.APP_PASSWORD,      // your Gmail App Password (not normal password)
  },
});

const sendMail = async (receiverEmailAddress, content, subject) => {
  console.log('--------------------------------------------------');
  console.log('Receiver:', receiverEmailAddress);
  console.log('Subject:', subject);
  console.log('Content:', content);
  console.log('--------------------------------------------------');

  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: receiverEmailAddress,
    subject: subject,
    html: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Gmail:', info.response);
    return true;
  } catch (error) {
    console.error('❌ Nodemailer Error:', error);
    return false;
  }
};

module.exports = sendMail;
