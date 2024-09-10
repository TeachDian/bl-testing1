import mongoose, { Schema } from "mongoose";

const gameFowlTraits = new Schema({
  gameFowlType: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlType",
  },
  gameFowlTraitsCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlTraitsCategory",
  },
  gameFowlTraitsSet: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlTraits", gameFowlTraits);
