const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/MembershipRoutes");
const paymentRouter = require("./Routes/PaymentRoute");

const app = express();
const cors =require("cors");

app.use(express.json());
app.use(cors());
app.use("/Members",router);
app.use("/payments",paymentRouter);


mongoose.connect("mongodb+srv://Heshal:12345@sojournparking.exrjn.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));