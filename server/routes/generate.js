// server/routes/generate.js

const express = require("express");
const router = express.Router();
const axios = require("axios");
const { spawn } = require("child_process");
require("dotenv").config();

// here's where i used the .env file to process the hugging face token
const HF_API_TOKEN = process.env.HF_API_TOKEN;
const summarizerModel = "facebook/bart-large-cnn"; // <- this is the summariser model using inference provider api

router.post("/", async (req, res) => {
  const { text, mode } = req.body;

  if (!text || !mode) {
    return res.status(400).json({ error: "Text and mode are required." });
  }

  console.log("📥 Received text:", text);
  console.log("📦 Mode:", mode);

  //Summary Mode - Using Hugging Face Inference API
  if (mode === "summary") {
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${summarizerModel}`,
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${HF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      console.log("✅ Hugging Face result:", result);

      if (Array.isArray(result)) {
        if (result[0]?.summary_text) {
          return res.json({ result: result[0].summary_text });
        }
        if (result[0]?.generated_text) {
          return res.json({ result: result[0].generated_text });
        }
      }

      if (typeof result.generated_text === "string") {
        return res.json({ result: result.generated_text });
      }

      return res.json({ result: "⚠️ No output from model." });
    } catch (error) {
      console.error(
        "❌ Summarizer API Error:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        error: "❌ Failed to fetch summary from Hugging Face API.",
        details: error.response?.data || error.message,
      });
    }
  }

  //Quiz Mode - Using local Python Valhalla model, this model is locally omported into the server and used.
  if (mode === "quiz") {
    const python = spawn("python", ["./quiz_generator.py", text]);

    let stdout = "";
    let stderr = "";

    python.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    python.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        console.error("❌ Python script error:", stderr);
        return res.status(500).json({ error: "❌ Quiz generation failed." });
      }

      console.log("✅ Quiz result from Python:", stdout.trim());
      return res.json({ result: stdout.trim().split("\n") });
    });
  }
});

module.exports = router;
