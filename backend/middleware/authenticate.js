// middleware/authenticate.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (typically user.id) to request object for easy access in routes
    req.user = decoded;

    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ msg: "Token is not valid or expired" });
  }
};
