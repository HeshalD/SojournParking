const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/MembershipRoutes");

const app = express();

app.use("/Members",router)

mongoose.connect("mongodb+srv://Heshal:12345@sojournparking.exrjn.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));