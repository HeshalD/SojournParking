const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MecIssueSchema = new Schema({

    lpname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    etype:{
        type:String,
        required:true,
    },
    
    anote:{
        type:String,
        required:true,
    }

});

module.exports = mongoose.model(
    "MecIssueModel", 
    MecIssueSchema 
)