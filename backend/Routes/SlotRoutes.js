const express = require("express");
const router = express.Router();
const SlotController = require("../Controllers/SlotController");

router.get("/", SlotController.getAllSlots);
router.post("/reserve", SlotController.reserveSlot);

module.exports = router;