const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotId: {
    type: String,
    required: [true, "Slot ID is required"],
    trim: true,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    minlength: [3, "User name must be at least 3 characters"],
  },
  licensePlate: {
    type: String,
    required: [true, "License plate is required"],
    unique: true, // 
  },
  entryTime: {
    type: Date,
    required: [true, "Entry time is required"],
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "Invalid entry time",
    },
  },
  exitTime: {
    type: Date,
    validate: {
      validator: function (value) {
        return !value || value > this.entryTime;
      },
      message: "Exit time must be after entry time",
    },
  },
}, { collection: "parkingSlots" });


const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
