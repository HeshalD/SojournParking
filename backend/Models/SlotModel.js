const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotId: String, // e.g., "A1", "B2"
  isReserved: { type: Boolean, default: false },
  userName: String,
  licensePlate: String,
  entryTime: Date,
});

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
