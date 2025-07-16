// server/routes/saved.js

const express = require("express");
const router = express.Router();
const SavedItem = require("../models/SavedItem");

//Save summary or quiz
router.post("/save", async (req, res) => {
  const { username, mode, content } = req.body;

  console.log("📩 Save request body:", req.body);

  if (!username || !mode || !content) {
    console.warn("⚠️ Missing fields:", { username, mode, content });
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const newItem = new SavedItem({ username, mode, content });
    await newItem.save();
    console.log("✅ Item saved for user:", username);
    return res.status(201).json({ message: "Item saved successfully." });
  } catch (err) {
    console.error("❌ Save error:", err.message || err);
    return res.status(500).json({ error: "Failed to save item." });
  }
});

//Get saved items
router.get("/view/:username/:mode", async (req, res) => {
  const { username, mode } = req.params;

  console.log(`📤 Fetching saved items for ${username} (${mode})`);

  try {
    const items = await SavedItem.find({ username, mode });
    return res.json({ items });
  } catch (err) {
    console.error("❌ Fetch error:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch items." });
  }
});

//Delete saved item
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ Attempting to delete item with ID: ${id}`);

  try {
    const deleted = await SavedItem.findByIdAndDelete(id);
    if (!deleted) {
      console.warn("⚠️ Item not found.");
      return res.status(404).json({ error: "Item not found." });
    }
    console.log("✅ Item deleted:", deleted._id);
    return res.json({ message: "Item deleted successfully." });
  } catch (err) {
    console.error("❌ Delete error:", err.message || err);
    return res.status(500).json({ error: "Failed to delete item." });
  }
});

module.exports = router;
