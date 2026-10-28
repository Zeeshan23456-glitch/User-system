const jwt = require("jsonwebtoken");
const users = require("../models/User");
async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) return res.status(401).json({ message: "Authorization token required" });
    const payload = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    const user = users.find(u => u.id === payload.id);
    if (!user) return res.status(401).json({ message: "Invalid authentication user" });
    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch (err) { return res.status(401).json({ message: "Token is invalid or expired" }); }
}
module.exports = { protect };
