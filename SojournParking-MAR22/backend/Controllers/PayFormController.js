const Pay = require("../Models/PayFormModel");

const getAllPays = async (req,res,next) => {

    let pay;

    try{
        pay = await Pay.find();
    }catch(err){
        console.log(err);
    }

    if(!pay){
        return res.status(404).json({message:"Details not found"});
    }

    return res.status(200).json({pay});
}

const addPays = async (req,res,next) => {
    const {LicensePlateNo,EntryTime,ExitTime} = req.body;

    let pay;

    try{
        pay = new Pay ({LicensePlateNo,EntryTime,ExitTime});
        await pay.save();
    }catch (err){
        console.log(err);
    }

    if(!pay){
        return res.status(404).json({message:"Unable to add payments"});
    }

    return res.status(200).json({pay});
}

const payGetById = async(req,res,next) =>{
    const id = req.params.id;

    let pay;

    try{
        pay = await Pay.findById(id);
    }catch(err){
        console.log(err);
    }

    //not available users
    if(!pay){
        return res.status(404).json({message:"unable to find "})
    }
    return res.status(200).json({pay})

}

exports.getAllPays = getAllPays;
exports.addPays = addPays;
exports.payGetById = payGetById;

