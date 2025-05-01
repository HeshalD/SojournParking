const express = require("express");
const router = express.Router();
const Member = require("../Models/MembershipModel");
const MembershipController = require("../Controllers/MembershipController");

router.get("/", MembershipController.getAllMembers);
router.post("/", MembershipController.upload.single('Slip'), MembershipController.addMembers);
router.get("/:id", MembershipController.getById);
router.put("/:id", MembershipController.upload.single('Slip'), MembershipController.updateMember);
router.delete("/:id", MembershipController.deleteMember);

module.exports = router;
