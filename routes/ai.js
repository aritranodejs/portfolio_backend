const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userInput = req.body?.input || '';

    const payload = {
      model: "openai/gpt-oss-20b",
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
        // timeout: 15000,
      }
    );

    console.log("aiResponse.data", aiResponse.data);

    res.json({ message: aiResponse.data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    res.status(500).json({ error: "AI request failed", details: err.message });
  }
});

module.exports = router;
