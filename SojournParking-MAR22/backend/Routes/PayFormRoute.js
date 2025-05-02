const express = require("express");
const router = express.Router();
const Pay = require("../Models/PayFormModel");
const PayFormController = require("../Controllers/PayFormController");

router.get("/",PayFormController.getAllPays);
router.post("/",PayFormController.addPays);
router.get("/:id",PayFormController.payGetById);

module.exports = router;