const Slot = require("../Models/SlotModel");
const { sendReservationEmail } = require("../config/emailConfig");

const getAllReservations = async (req, res, next) => {
  try {
    const slots = await Slot.find();
    if (!slots || slots.length === 0) {
      return res.status(404).json({ message: "No reservations found" });
    }
    return res.status(200).json({ slots });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const addReservation = async (req, res, next) => {
  const { slotId, isReserved, userName, email, licensePlate, entryTime, exitTime } = req.body;

  try {
    // Validate required fields
    if (!slotId || !userName || !email || !licensePlate || !entryTime) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["slotId", "userName", "email", "licensePlate", "entryTime"],
        received: req.body
      });
    }

    const slot = new Slot({ 
      slotId, 
      isReserved, 
      userName, 
      email,
      licensePlate, 
      entryTime, 
      exitTime 
    });
    
    const savedSlot = await slot.save();
    
    if (!savedSlot) {
      return res.status(400).json({ message: "Unable to add reservation" });
    }

    // Send confirmation email
    try {
      const emailSent = await sendReservationEmail(email, userName, slotId, entryTime);
      if (!emailSent) {
        console.warn("Failed to send confirmation email, but reservation was saved");
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't fail the reservation if email fails
    }

    return res.status(201).json({ slot: savedSlot });

  } catch (err) {
    console.error("Error in addReservation:", err);
    return res.status(500).json({ 
      message: "Server error", 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

const getByLicensePlate = async (req, res, next) => {
  const licensePlate = req.params.licensePlate;

  try {
    const slot = await Slot.findOne({ licensePlate });
    
    if (!slot) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ slot });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const slot = await Slot.findById(id);
    
    if (!slot) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ slot });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateReservation = async (req, res, next) => {
  const id = req.params.id;
  const { slotId, isReserved, userName, email, licensePlate, entryTime } = req.body;

  try {
    const slot = await Slot.findByIdAndUpdate(
      id,
      { 
        slotId, 
        isReserved, 
        userName, 
        email, // Added email field
        licensePlate, 
        entryTime 
      },
      { new: true }
    );

    if (!slot) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ slot });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteReservation = async (req, res, next) => {
  const id = req.params.id;

  try {
    const slot = await Slot.findByIdAndDelete(id);
    
    if (!slot) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ message: "Reservation deleted successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const endStay = async (req, res, next) => {
  const licensePlate = req.params.lp;
  const { exitTime } = req.body;

  try {
    const formattedExitTime = new Date(exitTime);
    
    const slot = await Slot.findOneAndUpdate(
      { licensePlate, isReserved: true },
      { 
        exitTime: formattedExitTime, 
        isReserved: false 
      },
      { new: true }
    );

    if (!slot) {
      return res.status(404).json({ 
        message: "No active reservation found for this license plate" 
      });
    }

    return res.status(200).json({ 
      message: "Stay ended successfully", 
      slot 
    });

  } catch (err) {
    console.error("Error ending stay:", err.message);
    return res.status(500).json({ 
      message: "Server error while ending stay", 
      error: err.message 
    });
  }
};

const deleteAllReservations = async (req, res, next) => {
  try {
    // Delete all documents in the Slot collection
    const result = await Slot.deleteMany({});
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        message: "No reservations found to delete" 
      });
    }

    return res.status(200).json({ 
      message: `Successfully deleted ${result.deletedCount} reservations`,
      deletedCount: result.deletedCount
    });

  } catch (err) {
    console.error("Error deleting all reservations:", err.message);
    return res.status(500).json({ 
      message: "Server error while deleting reservations", 
      error: err.message 
    });
  }
};

exports.getAllReservations = getAllReservations;
exports.addReservation = addReservation;
exports.getByLicensePlate = getByLicensePlate;
exports.getById = getById;
exports.updateReservation = updateReservation;
exports.deleteReservation = deleteReservation;
exports.endStay = endStay;
exports.deleteAllReservations = deleteAllReservations;