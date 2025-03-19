const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    cardHolderName:{
        type:String,
        required:true
    },
    cardNumber:{
        type:Number,
        required:true
    },
    expDate:{
        type:String,
        required:true
    },
    cvv:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model(
    "PaymentModel",
    paymentSchema
)