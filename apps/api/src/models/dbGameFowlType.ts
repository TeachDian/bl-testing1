import mongoose, { Schema } from "mongoose";

const gameFowlType = new Schema({
  gameFowlClass: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlClass",
  },
  gameFowlType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlType", gameFowlType);
