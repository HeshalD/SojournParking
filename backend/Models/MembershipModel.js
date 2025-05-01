const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    EmployeeID: {
        type: String,
        required: true,
    },
    LicensePlateNo: {
        type: String,
        required: true,
    },
    Slip: {
        type: String,
        required: true
    },
    Email: {  // Added email field
        type: String,
        required: true,
        unique: true  // Ensures email is unique
    }
});

module.exports = mongoose.model(
    "MembershipModel",
    memberSchema
);