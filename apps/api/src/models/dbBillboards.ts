import mongoose, { Schema } from "mongoose";
import { statusEnum } from "./status";

const billboards = new Schema({
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Photos",
    },
  ],
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: statusEnum,
    default: "Incomplete",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("Billboards", billboards);
