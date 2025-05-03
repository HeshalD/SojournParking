const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Google OAuth Routes
router.get("/google", userController.googleLogin); 
router.get("/google/callback", userController.googleCallback);

// Facebook OAuth Routes
router.get("/facebook", userController.facebookLogin);
router.get("/facebook/callback", userController.facebookCallback);

// Authentication Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/verify2FA", userController.verify2FA);
router.get("/profile", authMiddleware, userController.profile);
router.put("/profile", authMiddleware, userController.editProfile);
router.put("/change-password", authMiddleware, userController.changePassword);
router.post("/profile-photo", authMiddleware, upload.single("profilePic"), userController.updateProfilePhoto);
router.delete("/delete-account", authMiddleware, userController.deleteAccount);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// Admin Routes
router.get("/all", authMiddleware, userController.getAllUsers);
router.delete("/:id", authMiddleware, userController.deleteUserById);

module.exports = router;