const express = require("express");
const mongoose = require("mongoose");
const router  = require("./Routes/ServiceProviderRoutes");


const app = express();
const cors = require("cors"); 

//Middleware
app.use(express.json());
app.use(cors());
app.use("/ServiceProviders",router);


mongoose.connect("mongodb+srv://Heshal:12345@sojournparking.exrjn.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(4000);
})
.catch((err)=>console.log((err)));