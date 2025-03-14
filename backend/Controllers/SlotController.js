const express = require("express");
const Slot = require("../models/Slot"); // Import the Slot model

const router = express.Router();

// Get all slots
router.get("/slots", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reserve a slot
router.post("/reserve", async (req, res) => {
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
});

module.exports = router;
