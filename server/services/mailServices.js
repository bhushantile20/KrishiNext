// emailService.js
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set in your .env file

const sendMail = async (receiverEmailAddress, content, subject) => {
  console.log('--------------------------------------------------');
  console.log('Receiver:', receiverEmailAddress);
  console.log('Subject:', subject);
  console.log('Content:', content);
  console.log('--------------------------------------------------');

  const message = {
    to: receiverEmailAddress,
    from: process.env.GMAIL_ID, // Must be verified in SendGrid
    subject: subject,
    html: content,
  };

  try {
    console.log("message:", message);
    
    await sgMail.send(message);
    console.log("✅ Email sent successfully via SendGrid");
    return true;
  } catch (error) {
    console.error("❌ SendGrid Error:", error.response?.body || error.message);
    return false;
  }
};

module.exports = sendMail;
