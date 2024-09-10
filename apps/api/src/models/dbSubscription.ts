import mongoose, { Schema } from "mongoose";

const subscription = new Schema({
  type: {
    type: String,
    enum: ["Pro", "Elite"],
  },
  tier: {
    type: String,
    enum: ["Monthly", "Annual"],
  },
  payment: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
  status: {
    type: String,
    enum: ["Active", "Cancelled", "Expired"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("Subscription", subscription);
