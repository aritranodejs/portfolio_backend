const express = require('express');
const router = express.Router();
const { sendMail, sendAcknowledgementMail } = require('../utils/mailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Send mail to portfolio owner
    await sendMail(name, email, message);

    // Send acknowledgment to user
    await sendAcknowledgementMail(name, email);

    res.json({ message: "Message sent successfully! An acknowledgment has been sent to your email." });
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ error: "Failed to send mail." });
  }
});

module.exports = router;
