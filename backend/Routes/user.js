/*
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const authMiddleware = require("../middleware/auth");

router.get("/google", userController.googleLogin);
router.get("/google/callback", userController.googleCallback);
router.get("/facebook", userController.facebookLogin);
router.get("/facebook/callback", userController.facebookCallback);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/verify2FA", userController.verify2FA);

// Get user profile (secured)
router.get("/profile", authMiddleware, userController.getUserProfile);

module.exports = router;
*/








const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/Users/yasirunisal/Downloads/SojournParking-MAR22/SojournParking-MAR22/backend/uploads");
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
router.get('/profile', authMiddleware,userController.profile);  // Fetch user profile
router.put('/profile', authMiddleware, userController.editProfile); // Edit user profile
router.put('/change-password', authMiddleware, userController.changePassword); // Change user password
router.post("/profile-photo", authMiddleware, upload.single("profilePic"), userController.updateProfilePhoto);
router.delete('/delete-account', authMiddleware, userController.deleteAccount); // Delete user account
router.post("/forgot-password", userController.forgotPassword);
// Assuming you have this route
router.post("/reset-password/:token", userController.resetPassword);


module.exports = router;




