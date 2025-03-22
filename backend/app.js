const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const router = require("./Routes/SlotRoutes");
const userRouter = require("./Routes/UserRoutes");
const serviceProviderRouter = require("./Routes/ServiceProviderRoutes");
const sessionRouter = express.Router();
const employeeRouter = require("./Routes/EmployeeRoutes");
const membershipRouter = require("./Routes/MembershipRoutes");
const paymentRouter = require("./Routes/PayFormRoute");

const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,  // Added this required option
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));

app.use("/slots", router);
app.use("/user", userRouter);
app.use("/ServiceProviders",serviceProviderRouter);
app.use("/employee",employeeRouter);
app.use("/member",membershipRouter);
app.use("/pay",paymentRouter);

// Session routes
sessionRouter.post('/sessions', (req, res) => {
    const {name, licensePlate} = req.body;
    req.session.user = {name, licensePlate};
    res.json({success: true, message: "User Session created"});
});

sessionRouter.get('/sessions/current', (req, res) => {
    if(req.session.user) {
        res.json({user: req.session.user});
    } else {
        res.status(401).json({error: 'No active session'});
    }
});

// Register the session router
app.use("/", sessionRouter);  // This line was missing

mongoose.connect("mongodb+srv://Heshal:12345@sojournparking.exrjn.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log((err)));