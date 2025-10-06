// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Replace this with your real OpenAI API key (keep it secret, NEVER in frontend!)
const OPENAI_API_KEY = "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx"; 

app.use(cors());
app.use(bodyParser.json());

// Route: Chat endpoint
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // you can also use gpt-4o or gpt-3.5-turbo
        messages: [
          { role: "system", content: "You are a helpful AI assistant for students learning mensuration." },
          { role: "user", content: userMessage }
        ],
        max_tokens: 200
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "?? No response from AI.";
    res.json({ reply });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "?? Error: Could not connect to AI." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`? ChatGPT API server running at http://localhost:${PORT}`);
});
