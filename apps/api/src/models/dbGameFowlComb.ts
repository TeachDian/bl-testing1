import mongoose, { Schema } from "mongoose";

const gameFowlComb = new Schema({
  comb: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlComb", gameFowlComb);
