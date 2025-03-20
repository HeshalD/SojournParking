const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    EmployeeID:{
        type:String,//data type
        required:true,//validation
    },
    LicensePlateNo:{
        type:String,//data type
        required:true,//validation
        match: /^[A-Z0-9-]+$/
    },
    Slip: {
        type: String, // Stores file path (not actual image)
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model(
    "MembershipModel", //file name
     memberSchema //function name
)