const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotId: String,
  isReserved: { type: Boolean, default: false },
  userName: String,
  licensePlate: String,
  entryTime: Date,
  exitTime: Date,
},{ collection: "parkingSlots" });

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;