import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: "Comment creator is required.",
      unique: true,
    },
    comment: { type: String, required: "Comment description is required." },
    rate: { type: String, required: "Comment rate is required" },
    date: { type: BigInt },
  },
  {
    timestamps: true,
  }
);

export const commentsModel = new mongoose.model("comments", commentsSchema);
