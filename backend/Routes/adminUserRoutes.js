const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminUserController");
const { verifyAdminToken } = require("../middleware/authAdmin");

// Admin login route
router.post('/login', adminController.adminLogin);

// Get dashboard summary
router.get("/summary", verifyAdminToken, adminController.getUserSummary);

// User management routes
router.delete("/user/:id", verifyAdminToken, adminController.adminDeleteUser);
router.put("/user/restore/:id", verifyAdminToken, adminController.restoreUser);

module.exports = router;
