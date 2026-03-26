const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
      immutable: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);