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
    },
    Slip:{
        type:String,//data type
    }
});

module.exports = mongoose.model(
    "MembershipModel", //file name
     memberSchema //function name
)