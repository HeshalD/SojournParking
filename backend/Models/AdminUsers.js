const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isDeleted: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("AdminUser", adminUserSchema);
