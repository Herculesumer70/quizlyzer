const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ["summary", "quiz"],
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // here the output can be either string or array
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SavedItem", savedItemSchema);
