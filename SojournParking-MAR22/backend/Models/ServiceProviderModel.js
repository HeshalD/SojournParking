    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;


    const ServiceProviderSchema = new Schema({
         
         fullname:{
            type:String,//dataType
            required:true,//validate

         },
         contactnumber:{
            type:Number,//dataType
            required:true,//validate

         },
         specialization:{
            type:String,//dataType
            required:true,//validate

         },
         location:{
            type:String,//dataType
            required:true,//validate

         }
    });

    module.exports = mongoose.model(
        "ServiceProviderModel",//file name
        ServiceProviderSchema //function name
    )

