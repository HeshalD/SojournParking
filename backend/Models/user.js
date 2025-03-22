const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String, default: null }, // Token for password reset
  resetTokenExpiry: { type: Date }, // Expiry time
});

{ timestamps: true }

const User = mongoose.model("User", userSchema);
module.exports = User;