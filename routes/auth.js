const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register user
router.post("/register", async (req, res) => {
  const { id, password, role } = req.body;
  try {
    const existing = await User.findOne({ id });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const user = new User({ id, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });
  if (!user) return res.status(401).json({ error: "Invalid ID" });

  if (user.password !== password) return res.status(401).json({ error: "Wrong password" });

  res.json({ message: "Login successful", role: user.role });
});

module.exports = router;
