const Slot = require("../Models/SlotModel");

// Get all slots
const getAllSlots = async (req, res, next) => {
  let slots; // Fixed: lowercase variable name

  try {
    slots = await Slot.find();
    
    if (!slots) {
      return res.status(404).json({ message: "Slots not found" });
    }
    
    return res.status(200).json({ slots }); // Added: send response with slots
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" }); // Added: error handling
  }
};

// Reserve a slot
const reserveSlot = async (req, res) => {
  const { slotId, userName, licensePlate, entryTime } = req.body;

  try {
    const slot = await Slot.findOneAndUpdate(
      { slotId },
      { isReserved: true, userName, licensePlate, entryTime },
      { new: true, upsert: true }
    );

    res.json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSlots = getAllSlots;
exports.reserveSlot = reserveSlot;