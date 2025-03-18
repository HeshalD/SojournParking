const express = require("express");
const router = express.Router();
const SlotController = require("../Controllers/SlotController");
const Slot = require("../Models/SlotModel");

router.get("/", SlotController.getAllReservations);
router.post("/",SlotController.addReservation);
router.get("/:lp",SlotController.getByLicensePlate);
router.put("/:lp",SlotController.updateReservation);
router.delete("/:id",SlotController.deleteReservation);


module.exports = router;