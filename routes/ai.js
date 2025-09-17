const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userInput = req.body?.input || '';

    const payload = {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are Aritra's helpful portfolio assistant. Keep answers concise and friendly." },
        { role: "user", content: userInput },
      ],
      temperature: 0.7,
      max_tokens: 300,
    };

    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GROQ API key" });
    }

    const aiResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      payload,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    res.json({ message: aiResponse.data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
});

module.exports = router;
