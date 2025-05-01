const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedIssueSchema = new Schema({

    lpname:{
        type:String,
        required:true,
    },
    etype:{
        type:String,
        required:true,
    },
    pcon:{
        type:String,
        required:true,
    },
    anote:{
        type:String,
        required:true,
    }

});

module.exports = mongoose.model(
    "MedIssueModel", 
    MedIssueSchema 
)