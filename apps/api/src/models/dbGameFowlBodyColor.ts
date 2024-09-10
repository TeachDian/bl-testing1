import mongoose, { Schema } from "mongoose";

const gamFowlBodyColor = new Schema({
  colorTitle: String,
  colorDetails: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlBodyColor", gamFowlBodyColor);
