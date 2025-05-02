const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const router = require("./Routes/SlotRoutes");
const userRouter = require("./Routes/UserRoutes");
const serviceProviderRouter = require("./Routes/ServiceProviderRoutes");
const sessionRouter = express.Router();
const employeeRouter = require("./Routes/EmployeeRoutes");
const membershipRouter = require("./Routes/MembershipRoutes");
const paymentRouter = require("./Routes/PayFormRoute");
const complaintRouter = require("./Routes/ComplaintRoutes");
const reviewRouter = require("./Routes/ReviewRoutes");
const payFormRoutes = require("./Routes/PayFormRoute");
const multer = require('multer');
const path = require('path');
const paymentRoutes = require('./Routes/PaymentRoutes');
const serviceRouter = require("./Routes/ServiceProviderRoutes");
const medRouter = require("./Routes/MedIssueRoutes");
const secRouter = require("./Routes/SecIssueRoutes");
const mecRouter = require("./Routes/MecIssueRoutes");
const cors = require("cors");
const passport = require("passport");

require("dotenv").config(); 
require("./passport");

const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use("/slots", router);
app.use("/api/users", userRouter);
app.use("/ServiceProviders", serviceProviderRouter);
app.use("/employee", employeeRouter);
app.use("/member", membershipRouter);
app.use("/complaint", complaintRouter);
app.use("/Review", reviewRouter);
app.use('/api/payments', payFormRoutes);
app.use('/payment', paymentRoutes);
app.use("/MedIssues", medRouter);
app.use("/SecIssues", secRouter);
app.use("/MecIssues", mecRouter);
app.use("/api/admin", require("./Routes/adminUserRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", sessionRouter);

// Session management routes
app.post("/sessions", (req, res) => {
  const { name, email } = req.body;
  req.session.user = { name, email };
  res.json({ success: true, message: "User session created" });
});

app.get("/sessions/current", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null });
  }
});

// Error handling middleware
mongoose.connect("mongodb+srv://Heshal:12345@sojournparking.exrjn.mongodb.net/")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});