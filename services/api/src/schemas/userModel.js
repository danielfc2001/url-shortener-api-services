import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: "Username is required.", unique: true },
    password: { type: String, required: "Password is required." },
  },
  {
    timestamps: true,
  }
);

export const userModel = new mongoose.model("users", userSchema);
