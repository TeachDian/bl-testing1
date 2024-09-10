import mongoose, { Schema } from "mongoose";

const gameFowlTraitsCategory = new Schema({
  traitsCategory: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlTraitsCategory", gameFowlTraitsCategory);
