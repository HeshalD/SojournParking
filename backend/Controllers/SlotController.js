const Slot = require("../Models/SlotModel");
const { sendReservationEmail } = require("../config/emailConfig");
const mongoose = require("mongoose");

const getAllReservations = async (req, res, next) => {
  try {
    console.log("Starting getAllReservations...");
    console.log("Mongoose connection state:", mongoose.connection.readyState);
    
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.error("Database is not connected. Connection state:", mongoose.connection.readyState);
      return res.status(500).json({ 
        message: "Database connection error",
        error: "Database is not connected"
      });
    }

    console.log("Attempting to fetch slots from database...");
    const slots = await Slot.find().lean();
    console.log("Query completed. Found slots:", slots ? slots.length : 0);
    
    if (!slots || slots.length === 0) {
      console.log("No slots found in database");
      return res.status(200).json({ message: "No reservations found", slots: [] });
    }
    
    console.log("Successfully retrieved slots");
    return res.status(200).json({ slots });
  } catch (err) {
    console.error("Error in getAllReservations:", err);
    console.error("Error details:", {
      name: err.name,
      message: err.message,
      code: err.code,
      codeName: err.codeName,
      stack: err.stack
    });
    
    // Check for specific error types
    if (err.name === 'MongoError') {
      console.error("MongoDB specific error:", {
        code: err.code,
        codeName: err.codeName,
        driverError: err.driverError
      });
    }
    
    return res.status(500).json({ 
      message: "Server error", 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

const addReservation = async (req, res, next) => {
  try {
    const { slotId, userName, email, licensePlate, entryTime, isReserved } = req.body;

    // Check if there's already a reservation with this license plate
    const existingReservation = await Slot.findOne({ licensePlate });
    if (existingReservation) {
      return res.status(400).json({
        message: "This license plate already has an active reservation",
        error: "Duplicate license plate"
      });
    }

    const newReservation = new Slot({
      slotId,
      userName,
      email,
      licensePlate,
      entryTime,
      isReserved
    });

    const savedReservation = await newReservation.save();
    
    // Send confirmation email
    await sendReservationEmail(email, {
      userName,
      slotId,
      entryTime,
      licensePlate
    });

    res.status(201).json({
      message: "Reservation created successfully",
      reservation: savedReservation
    });
  } catch (err) {
    console.error("Error in addReservation:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
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
  const licensePlate = decodeURIComponent(req.params.lp);
  const { exitTime } = req.body;

  try {
    // Create a proper date object from the time string
    const [hours, minutes] = exitTime.split(':');
    const currentDate = new Date();
    currentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // Find the slot with case-insensitive license plate search
    const slot = await Slot.findOneAndUpdate(
      { 
        licensePlate: { $regex: new RegExp(licensePlate, 'i') },
        isReserved: true 
      },
      { 
        exitTime: currentDate, 
        isReserved: false 
      },
      { new: true }
    );

    if (!slot) {
      return res.status(404).json({ 
        message: `No active reservation found for license plate: ${licensePlate}` 
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