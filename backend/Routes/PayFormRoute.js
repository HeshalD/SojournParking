const express = require("express");
const router = express.Router();
const PayFormController = require("../Controllers/PayFormController");

// Simplified version without express-validator
router.post("/", (req, res) => {
  PayFormController.createPayment(req, res)
    .catch(err => {
      console.error("Route handler error:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    });
});

router.get("/", (req, res) => {
  PayFormController.getAllPayments(req, res)
    .catch(err => {
      console.error("Route handler error:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    });
});

router.get("/:id", (req, res) => {
  PayFormController.getPaymentById(req, res)
    .catch(err => {
      console.error("Route handler error:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    });
});

module.exports = router;