const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    });

    res.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ error: "AI failed" });
  }
};