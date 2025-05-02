const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const paySchema = new Schema({
    LicensePlateNo:{
        type:String,//data type
        required:true,//validation
    },
    EntryTime:{
        type:Date,//data type
        required:true,//validation
    },
    ExitTime:{
        type:Date,//data type
        required:true,//validation
    }
})

module.exports = mongoose.model(
    "PayFormModel",
     paySchema
)

