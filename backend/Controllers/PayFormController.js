const Payment = require("../Models/PayFormModel");
const Slot = require("../Models/SlotModel");

class PayFormController {
  /**
   * Create payment from completed slot
   */
  static async createPayment(req, res) {
    try {
      const { slotId } = req.body;
      
      // Validate input
      if (!slotId) {
        return res.status(400).json({ 
          success: false,
          message: "Slot ID is required" 
        });
      }

      // Find completed slot
      const slot = await Slot.findOne({
        _id: slotId,
        exitTime: { $exists: true }
      });

      if (!slot) {
        return res.status(404).json({
          success: false,
          message: "Completed slot not found"
        });
      }

      // Ensure times are in correct order
      const entryTime = new Date(slot.entryTime);
      const exitTime = new Date(slot.exitTime);

      if (exitTime <= entryTime) {
        return res.status(400).json({
          success: false,
          message: "Exit time must be after entry time"
        });
      }

      // Calculate duration and amount
      const durationHours = (exitTime - entryTime) / (1000 * 60 * 60);
      const totalAmount = Math.ceil(durationHours) * 3.0; // $3 per hour

      // Create payment with all required fields
      const payment = new Payment({
        licensePlate: slot.licensePlate,
        entryTime: entryTime,
        exitTime: exitTime,
        slot: slot._id,
        totalAmount: totalAmount,
        durationHours: durationHours,
        userName: slot.userName
      });

      await payment.save();

      res.status(201).json({
        success: true,
        data: payment.toObject({ virtuals: true })
      });

    } catch (error) {
      console.error("Payment creation error:", error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get all payments
   */
  static async getAllPayments(req, res) {
    try {
      const payments = await Payment.find()
        .sort('-createdAt')
        .lean();

      res.status(200).json({
        success: true,
        count: payments.length,
        data: payments
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get payment by ID
   */
  static async getPaymentById(req, res) {
    try {
      const payment = await Payment.findById(req.params.id);
      
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found"
        });
      }

      res.status(200).json({
        success: true,
        data: payment.toObject({ virtuals: true })
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = PayFormController;