const express = require("express");
const router = express.Router();

//Insert Model
     const SecIssue = require("../Models/SecIssueModel");
//Insert Controller
    const SecIssueController = require("../Controllers/SecIssueController");

router.get("/",SecIssueController.getAllSecIssues);
router.post("/",SecIssueController.DisSecIssue);
router.get("/:id",SecIssueController.getById);      
router.put("/:id",SecIssueController.UpdateSecIssue); 
router.delete("/:id",SecIssueController.deleteSecIssue); 
//export
module.exports = router;