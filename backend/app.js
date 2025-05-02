const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");


const app = express();

// CORS config
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Body parser
app.use(express.json());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Routes
app.use("/slots", require("./Routes/SlotRoutes"));
//app.use("/api/users", require("./Routes/UserRoutes"));
app.use("/ServiceProviders", require("./Routes/ServiceProviderRoutes"));
app.use("/employee", require("./Routes/EmployeeRoutes"));
app.use("/member", require("./Routes/MembershipRoutes"));
app.use("/pay", require("./Routes/PayFormRoute"));
//app.use("/api/user/profile", require("./Routes/userProfileRoutes"));
app.use("/api/users", require("./Routes/user"));
app.use("/api/admin", require("./Routes/adminUserRoutes"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));




// Session management test
app.post("/sessions", (req, res) => {
  const { name, licensePlate } = req.body;
  req.session.user = { name, licensePlate };
  res.json({ success: true, message: "User session created" });
});

app.get("/sessions/current", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "No active session" });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 5001, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5001}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
