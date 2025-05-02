const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Token verification failed" });
  }
};

module.exports = protect;
