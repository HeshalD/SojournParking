const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/SlotRoutes")
const app = express();
const cors = require("cors");

app.use("/slots",router);

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb+srv://Heshal:12345@sojournparking.exrjn.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));