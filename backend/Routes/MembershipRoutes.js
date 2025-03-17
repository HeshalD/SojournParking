const express = require("express");
const router = express.Router();
const Member = require("../Models/MembershipModel");
const MembershipController = require("../Controllers/MembershipController");

router.get("/",MembershipController.getAllMembers);

module.exports = router;
