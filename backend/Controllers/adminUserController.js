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
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User marked as deleted" });
  } catch (err) {
    console.error("Admin delete error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.restoreUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User restored successfully" });
  } catch (err) {
    console.error("Restore user error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



