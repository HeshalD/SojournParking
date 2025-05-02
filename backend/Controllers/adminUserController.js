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

// Get user summary for admin dashboard
exports.getUserSummary = async (req, res) => {
  try {
    // Total registered users
    const totalUsers = await User.countDocuments();

    // Total live users (You might track this via a field or socket status)
    const liveUsers = await User.countDocuments({ isOnline: true });

    // Total deleted users (Assuming you have a deleted field or status)
    const deletedUsers = await User.countDocuments({ isDeleted: true });

    // Fetching user details for the summary table
    const userDetails = await User.find()
      .select('fullName email phone createdAt isOnline isDeleted')
      .limit(10);  // You can paginate or limit the result if needed

    res.json({
      success: true,
      data: {
        totalUsers,
        liveUsers,
        deletedUsers,
        userDetails
      }
    });
  } catch (err) {
    console.error("Error fetching user summary:", err);
    res.status(500).json({
      success: false,
      message: "Server error occurred while fetching user summary"
    });
  }
};

