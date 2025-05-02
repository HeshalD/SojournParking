const express = require("express");
const router = express.Router();

//Insert Model
     const MedIssue = require("../Models/MedIssueModel");
//Insert Controller
    const MedIssueController = require("../Controllers/MedIssueController");

router.get("/",MedIssueController.getAllMedIssues);
router.post("/",MedIssueController.DisMedIssue);
router.get("/:id",MedIssueController.getById);      
router.put("/:id",MedIssueController.UpdateMedIssue); 
router.delete("/:id",MedIssueController.deleteMedIssue); 
//export
module.exports = router;