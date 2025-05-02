    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;


    const ServiceProviderSchema = new Schema({
         
         fullname:{
            type:String,
            required:true,

         },
         contactnumber:{
            type:Number,
            required:true,

         },
         specialization:{
            type:String,
            required:true,

         },
         location:{
            type:String,
            required:true,

         }
    });

    module.exports = mongoose.model(
        "ServiceProviderModel",
        ServiceProviderSchema 
    )

