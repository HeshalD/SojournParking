const express = require("express");
const router = express.Router();
const SlotController = require("../Controllers/SlotController");
const Slot = require("../Models/SlotModel");

router.get("/", SlotController.getAllReservations);
router.post("/",SlotController.addReservation);
router.get("/license/:lp",SlotController.getByLicensePlate);
router.get("/id/:id",SlotController.getById);
router.put("/id/:id",SlotController.updateReservation);
router.delete("/:id",SlotController.deleteReservation);
router.put("/endstay/:lp",SlotController.endStay);

module.exports = router;