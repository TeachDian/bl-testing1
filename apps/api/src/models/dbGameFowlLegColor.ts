import mongoose, { Schema } from "mongoose";

const gameFowlLegColor = new Schema({
  legColorTitle: String,
  legColorDetails: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlLegColor", gameFowlLegColor);
