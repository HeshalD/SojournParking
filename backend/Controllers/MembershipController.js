const Member = require("../Models/MembershipModel");

const getAllMembers = async (req, res, next) => {

    let Members;

    try{
        members = await Member.find();
    }catch(err){
        console.log(err);
    }

    if(!members){
        return res.status(404).json({message:"Member not found"});
    }

    return res.status(200).json({members});
};

exports.getAllMembers = getAllMembers;