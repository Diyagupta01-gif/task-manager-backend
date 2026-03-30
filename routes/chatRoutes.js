const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  console.log("Chat API hit 🔥");

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "llama-3.3-70b-versatile", // ✅ NEW MODEL
    });

    const reply = chatCompletion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ reply: "AI error ❌" });
  }
});

module.exports = router;