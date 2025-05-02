const express = require("express");
const router = express.Router();

//Insert Model
     const MecIssue = require("../Models/MecIssueModel");
//Insert Controller
    const MecIssueController = require("../Controllers/MecIssueController");

router.get("/",MecIssueController.getAllMecIssues);
router.post("/",MecIssueController.DisMecIssue);
router.get("/:id",MecIssueController.getById);      
router.put("/:id",MecIssueController.UpdateMecIssue); 
router.delete("/:id",MecIssueController.deleteMecIssue); 
//export
module.exports = router;