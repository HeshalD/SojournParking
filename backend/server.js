const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json


// Routes
const userRouter = require("./routes/user"); // Updated to use user routes
app.use("/user", userRouter); // Use /user as the base route for authentication
app.use("/uploads", express.static("uploads"));


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port number: ${PORT}`);
});
