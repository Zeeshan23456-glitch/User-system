const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/User");
const { id, timestamps } = require("../models/store");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    if (users.some(u => u.email === normalizedEmail)) return res.status(409).json({ message: "Email is already registered" });
    const user = { id: id(), name: name.trim(), email: normalizedEmail, password: await bcrypt.hash(password, 12), ...timestamps() };
    users.push(user);
    return res.status(201).json({ message: "Registration successful", user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) { return res.status(500).json({ message: "Server error", error: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email.toLowerCase());
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
    return res.status(200).json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) { return res.status(500).json({ message: "Server error", error: err.message }); }
};
