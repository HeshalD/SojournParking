
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");
const User = require("../Models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// Register
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ fullName, email, password: hashedPassword, phone });
    const token = generateToken({ id: user._id });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login with 2FA
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.twoFACode = code;
    user.twoFACodeExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail(user.email, "Your 2FA Code", `Your code is ${code}`);
    const tempToken = generateToken({ id: user._id }, "10m");

    res.json({ requires2FA: true, tempToken });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 2FA Verification
exports.verify2FA = async (req, res) => {
  try {
    const { tempToken, code } = req.body;
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.twoFACode !== code || user.twoFACodeExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired code" });
    }

    user.twoFACode = null;
    user.twoFACodeExpires = null;
    await user.save();

    const token = generateToken({ id: user._id });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Google OAuth
exports.googleLogin = (req, res) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=openid email profile&` +
    `access_type=offline&prompt=consent`;

  res.redirect(redirectUri);
};

exports.googleCallback = async (req, res) => {
  const code = req.query.code;
  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

  if (!code) return res.redirect(`${clientUrl}/login?error=missing_code`);

  try {
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", null, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
    });

    const { id_token } = tokenRes.data;
    const decoded = jwt.decode(id_token);
    let user = await User.findOne({ email: decoded.email });

    if (!user) {
      user = await User.create({
        fullName: decoded.name,
        email: decoded.email,
        oauthProvider: "google",
        oauthId: decoded.sub,
      });
    }

    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.redirect(`${clientUrl}/oauth-success?token=${encodeURIComponent(appToken)}`);
  } catch (err) {
    console.error("Google OAuth error:", err.response?.data || err.message);
    return res.redirect(`${clientUrl}/login?error=oauth_failed`);
  }
};

// Facebook OAuth
exports.facebookLogin = (req, res) => {
  const redirectUri = `https://www.facebook.com/v17.0/dialog/oauth?` +
    `client_id=${process.env.FACEBOOK_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI)}&` +
    `scope=email,public_profile&response_type=code`;

  res.redirect(redirectUri);
};

exports.facebookCallback = async (req, res) => {
  const code = req.query.code;
  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

  try {
    const tokenRes = await axios.get("https://graph.facebook.com/v17.0/oauth/access_token", {
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        code,
      },
    });

    const access_token = tokenRes.data.access_token;
    const userRes = await axios.get("https://graph.facebook.com/me", {
      params: { access_token, fields: "id,name,email,picture" },
    });

    const { id, name, email } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ fullName: name, email, oauthProvider: "facebook", oauthId: id });
    }

    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.redirect(`${clientUrl}/oauth-success?token=${encodeURIComponent(appToken)}`);
  } catch (err) {
    console.error("Facebook OAuth error:", err.response?.data || err.message);
    return res.redirect(`${clientUrl}/login?error=facebook_oauth_failed`);
  }
};


// Profile controller (Fetch details)
exports.profile = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json({
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Edit profile controller
exports.editProfile = async (req, res) => {
  const { name, email, phone } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    user.fullName = name || user.fullName;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};


// Change password controller
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error changing password" });
  }
};


const path = require('path');

exports.updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `/Users/yasirunisal/Downloads/SojournParking-MAR22/SojournParking-MAR22/backend/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePhoto: filePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile photo updated", profilePhoto: filePath });
  } catch (err) {
    console.error("Profile photo error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Delete account controller
exports.deleteAccount = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByIdAndDelete(decoded.id);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
};


// Logout controller
exports.logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};








exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password (or app password)
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = password; // You should hash the password here before saving
    await user.save();

    res.json({ message: "Password has been successfully reset." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};