const express = require("express");
const mongoose = require("mongoose");
const router  = require("./Routes/ServiceProviderRoutes");
const medRouter = require("./Routes/MedIssueRoutes");
const secRouter = require("./Routes/SecIssueRoutes");
const mecRouter = require("./Routes/MecIssueRoutes");


const app = express();
const cors = require("cors"); 

//Middleware
app.use(express.json());
app.use(cors());
app.use("/ServiceProviders",router);
app.use("/MedIssues",medRouter);
app.use("/SecIssues",secRouter);
app.use("/MecIssues",mecRouter);



mongoose.connect("mongodb+srv://Heshal:12345@sojournparking.exrjn.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(4000);
})
.catch((err)=>console.log((err)));