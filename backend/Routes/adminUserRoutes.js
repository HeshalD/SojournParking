const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminUserController");
const { verifyAdminToken } = require("../middleware/authAdmin");

// Corrected Route: POST /api/admin/login
router.post('/login', adminController.adminLogin);

// Corrected Route: GET /api/admin/summary
router.get("/summary", verifyAdminToken, adminController.getUserSummary);
router.delete("/:id", verifyAdminToken, adminController.adminDeleteUser);
router.put("/restore/:id", verifyAdminToken, adminController.restoreUser);


module.exports = router;
