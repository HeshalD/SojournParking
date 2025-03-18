const Slot = require("../Models/SlotModel")

const getAllReservations = async(req,res,next)=>{

  let Slots;

  try{
    slots = await Slot.find();
  }catch(err){
    console.log(err);
  }

  if(!slots){
    return res.status(404).json({message:"No reservations found"})
  }

  return res.status(200).json({slots});
}

const addReservation = async(req,res,next)=>{

  const {slotId,isReserved,userName,licensePlate,entryTime} = req.body;

  let slots;

  try{
    slots = new Slot({slotId,isReserved,userName,licensePlate,entryTime});
    await slots.save();
  }catch(err){
    console.log(err);
  }

  if(!slots){
    return res.status(404).send({message:"Unable to add reservation"});
  }

  return res.status(200).json({slots});

}

const getByLicensePlate = async(req,res,next)=>{
    
  const lp = req.params.licensePlate

  let slot;

  try{
    slot = await Slot.findOne(lp);
  }catch(err){
    console.log(err);
  }

  if(!slot){
    return res.status(404).send({message:"Unable to find reservation"});
  }

  return res.status(200).json({slot});

}

const updateReservation = async(req,res,next)=>{

  const lp = req.params.licensePlate;

  const { slotId,isReserved,userName,licensePlate,entryTime } = req.body;

  let slot;

  try{
    slot = await Slot.findOneAndUpdate(lp,
      {slotId:slotId,isReserved:isReserved,userName:userName,licensePlate:licensePlate,entryTime:entryTime}
    );
    slot = await slot.save();
  }catch(err){
    console.log(err);
  }

  if(!slot){
    return res.status(404).send({message:"Unable to update reservation"});
  }

  return res.status(200).json({slot});

}

const deleteReservation = async(req,res,next)=>{
  const id = req.params.id;

  let slot

  try{
    slot = await Slot.findByIdAndDelete(id)

  }catch(err){
    console.log(err);
  }

  if(!slot){
    return res.status(404).send({message:"Unable to find reservation"});
  }

  return res.status(200).json({message:"Reservation Deleted"});

}

exports.getAllReservations = getAllReservations;
exports.addReservation = addReservation;
exports.getByLicensePlate = getByLicensePlate;
exports.updateReservation = updateReservation;
exports.deleteReservation = deleteReservation;