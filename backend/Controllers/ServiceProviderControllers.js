const ServiceProvider = require("../Models/ServiceProviderModel");
//data Display
const getAllServiceProviders = async(req, res, next) => {
    
    let ServiceProviders;
   // Get all ServiceProviders
    try{
        ServiceProviders = await ServiceProvider.find();
    }catch (err) {
        console.log(err);
    }
    //not found
    if(!ServiceProviders){
        return res.status(404).json({message:"Service Provider not found"});
    }
    //display all ServiceProviders
    return res.status(200).json({ ServiceProviders });
};

//data insert
const addServiceProviders = async (req, res, next) =>{

    const {fullname,contactnumber,specialozation,location} = req.body;

    let serviceProviders;

    try{
        serviceProviders = new ServiceProvider({fullname,contactnumber,specialozation,location});
        await serviceProviders.save();
    }catch (err) {
        console.log(err);
    }
    //not insert serviceProviders
    if (!serviceProviders){
        return res.status(404).json({message: "unable to add service Providers"});
    }
    return res.status(200).json({serviceProviders});




};

//Get by Id

const getById = async (req, res, next) => {

    const id = req.params.id;

    let serviceProviders;

    try{
        serviceProviders = await  ServiceProvider.findById(id);
    }catch(err) {
        console.log(err);
    }
        //not availabe serviceProviders
        if (!serviceProviders){
            return res.status(404).json({message: "service Providers Not Found"});
        }
        return res.status(200).json({serviceProviders});
}
//Update Service provider details

const updateServiceProvider = async (req, res, next) => {

    const id = req.params.id;
    const {fullname,contactnumber,specialozation,location} = req.body;

    let serviceProviders;

    try{
        serviceProviders = await  ServiceProvider.findByIdAndUpdate(id,
            {fullname,contactnumber,specialozation,location});
            serviceProviders = await serviceProviders.save();
    }catch(err) {
        console.log(err);
    }
    
    if (!serviceProviders){
        return res.status(404).json({message: "unable to update service providers dertails"});
    }
    return res.status(200).json({serviceProviders});

};

//delete service provider

const deleteServiceProvider =async (req, res, next) => {
    const id = req.params.id;
 
    let serviceProviders;

    try{
        serviceProviders = await ServiceProvider.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }

    if (!serviceProviders){
        return res.status(404).json({message: "unable to delete service providers dertails"});
    }
    return res.status(200).json({serviceProviders});


}



exports.getAllServiceProviders = getAllServiceProviders; 
exports.addServiceProviders =addServiceProviders;
exports.getById =getById;
exports.updateServiceProvider = updateServiceProvider;
exports.deleteServiceProvider = deleteServiceProvider;