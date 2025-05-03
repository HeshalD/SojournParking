const User = require("../Models/User");
const jwt = require('jsonwebtoken');


// Dummy admin credentials
const ADMIN_EMAIL = "admin@123.com";
const ADMIN_PASSWORD = "admin123";

// POST /api/admin/login
exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      success: true,
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
};

exports.getUserSummary = async (req, res) => {
  try {
    const allUsers = await User.find();
    const totalUsers = allUsers.length;
    const liveUsers = allUsers.filter((user) => !user.isDeleted).length;
    const deletedUsers = allUsers.filter((user) => user.isDeleted).length;

    const userDetails = allUsers.map((user) => ({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      isOnline: user.isOnline,
      isDeleted: user.isDeleted,
      _id: user._id,
    }));

    res.json({
      success: true,
      data: {
        totalUsers,
        liveUsers,
        deletedUsers,
        userDetails,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.adminDeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate user ID format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }

    // Find the user first to check if it exists and is not the admin
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Prevent deleting the admin user
    if (user.email === ADMIN_EMAIL) {
      return res.status(403).json({ 
        success: false, 
        message: "Cannot delete admin user" 
      });
    }

    // Check if user is already deleted
    if (user.isDeleted) {
      return res.status(400).json({ 
        success: false, 
        message: "User is already deleted" 
      });
    }

    // Perform the soft delete
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: req.admin._id // Assuming admin ID is available in the request
      },
      { new: true }
    );

    // Update related data (if any)
    // For example, you might want to:
    // - Cancel any active reservations
    // - Disable user's access tokens
    // - Archive user's data
    // This would depend on your application's requirements

    res.json({ 
      success: true, 
      message: "User deleted successfully",
      data: {
        userId: updatedUser._id,
        email: updatedUser.email,
        deletedAt: updatedUser.deletedAt
      }
    });
  } catch (err) {
    console.error("Admin delete error:", err);
    
    // Handle specific error types
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete user",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.restoreUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate user ID format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Check if user is not deleted
    if (!user.isDeleted) {
      return res.status(400).json({ 
        success: false, 
        message: "User is not deleted" 
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        isDeleted: false,
        restoredAt: new Date(),
        restoredBy: req.admin._id // Assuming admin ID is available in the request
      },
      { new: true }
    );

    res.json({ 
      success: true, 
      message: "User restored successfully",
      data: {
        userId: updatedUser._id,
        email: updatedUser.email,
        restoredAt: updatedUser.restoredAt
      }
    });
  } catch (err) {
    console.error("Restore user error:", err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to restore user",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};



