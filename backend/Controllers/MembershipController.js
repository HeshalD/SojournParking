const Member = require("../Models/MembershipModel");

//data display
const getAllMembers = async (req, res, next) => {

    let members;

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

// data insert
const addMembers = async (req,res,next) => {
    const{EmployeeID,LicensePlateNo,Slip} = req.body;

    let members;

    try{
        members = new Member({EmployeeID,LicensePlateNo,Slip});
        await members.save();
    }catch (err){
        console.log(err);
    }
    //not insert users
    if(!members){
        return res.status(404).json({message:"unable to renewal "})
    }
    return res.status(200).json({members})
}

//Get by id
const getById = async(req,res,next) =>{
    const id = req.params.id;

    let members;

    try{
        members = await Member.findById(id);
    }catch(err){
        console.log(err);
    }

    //not available users
    if(!members){
        return res.status(404).json({message:"unable to renewal "})
    }
    return res.status(200).json({members})

}

//update user details
const updateMember = async (req,res,next) => {
    const id = req.params.id;
    const{EmployeeID,LicensePlateNo,Slip} = req.body;

    let members;

    try{
        members = await Member.findByIdAndUpdate(id,{
            EmployeeID:EmployeeID,LicensePlateNo:LicensePlateNo,Slip:Slip
        });
        members = await members.save();
    }catch(err){
        console.log(err);
    }

    if(!members){
        return res.status(404).json({message:"unable to update "})
    }
    return res.status(200).json({members});

}

//delete user data
const deleteMember = async (req,res,next) => {
    const id = req.params.id;

    let members;

    try{
        members = await Member.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    if(!members){
        return res.status(404).json({message:"unable to delete "})
    }
    return res.status(200).json({members});
}

exports.getAllMembers = getAllMembers;
exports.addMembers = addMembers;
exports.getById = getById;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember
