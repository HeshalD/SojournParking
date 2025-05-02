const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Check for the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Extract token from header
  const token = authHeader.split(" ")[1];

  // Verify and decode the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your environment variables
    req.user = decoded; // Store decoded user info in the request object (e.g., user ID, email, etc.)
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle invalid or expired token
    console.error("Token verification failed:", error); // Log the error for debugging
    return res.status(401).json({ error: "Token is invalid or expired" });
  }
};

module.exports = auth;
