import mongoose, { Schema } from "mongoose";

const gameFowlClass = new Schema({
  classTitle: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlClass", gameFowlClass);
