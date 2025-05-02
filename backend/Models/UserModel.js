const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String, default: null }, 
  resetTokenExpiry: { type: Date }, 
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;