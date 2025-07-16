const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// 🔐 Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const trimmedEmail = email?.trim();
    const trimmedUsername = username?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedEmail || !trimmedUsername || !trimmedPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ username: trimmedUsername });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    //Hash password before saving
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const newUser = new User({
      email: trimmedEmail,
      username: trimmedUsername,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created",
      username: newUser.username,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.status(500).json({ error: "Server error during signup." });
  }
});

// 🔐 Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const trimmedUsername = username?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedUsername || !trimmedPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await User.findOne({ username: trimmedUsername });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    //Compare hashed password with entered one
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.status(200).json({
      message: "Login successful",
      username: user.username,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ error: "Server error during login." });
  }
});

module.exports = router;
