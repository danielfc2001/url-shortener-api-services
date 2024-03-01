import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    urlId: { type: mongoose.Schema.ObjectId },
    ipDirection: { type: String, require: true },
    date: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const analyticsModel = new mongoose.model("urlAnalytics", analyticsSchema);

export default analyticsModel;
