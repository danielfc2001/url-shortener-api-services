import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId },
    title: { type: String },
    description: { type: String },
    baseUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    isUnlocked: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const urlModel = new mongoose.model("urlShortener", urlSchema);

export default urlModel;
