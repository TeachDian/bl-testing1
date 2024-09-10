import mongoose, { Schema } from "mongoose";

const gameFowlStatus = new Schema({
  gameFowlGender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameFowlGender",
  },
  gameFowlStatus: String,
  gameFowlAgeRange: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlStatus", gameFowlStatus);
