const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const encryption = (process.env.MAIL_ENCRYPTION || '').toLowerCase();
const isSecure = encryption === 'ssl' || String(process.env.MAIL_PORT) === '465';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: isSecure,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Send mail to portfolio owner
async function sendMail(name, email, message) {
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.MAIL_USER,
    subject: "New Contact Message from Portfolio",
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };
  return transporter.sendMail(mailOptions);
}

// Send acknowledgment mail to user
async function sendAcknowledgementMail(name, email) {
  const mailOptions = {
    from: `"Aritra's Portfolio Team" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Thank you for contacting us!",
    text: `Hello ${name},\n\nThank you for reaching out! We have received your message and will get back to you shortly.\n\nBest regards,\nAritra's Portfolio Team`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail, sendAcknowledgementMail };
