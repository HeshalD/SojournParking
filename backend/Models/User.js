const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    profilePhoto: String,
    oauthProvider: String,
    oauthId: String,
    twoFACode: String,
    twoFACodeExpires: Date,
    isOnline: { type: Boolean, default: false },  // Tracks whether the user is online
    isDeleted: { type: Boolean, default: false }, // Tracks whether the user is deleted
    deletedAt: { type: Date, default: null },     // Time when the user was marked for deletion
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    
  },
  {
    timestamps: true,
  }
);

// Create a TTL index for the `deletedAt` field, automatically removing the user after 24 hours (86400 seconds)
userSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 86400 }); // 86400 seconds = 24 hours

module.exports = mongoose.model("User", userSchema);
