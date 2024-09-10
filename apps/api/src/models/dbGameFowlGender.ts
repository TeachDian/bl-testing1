import mongoose, { Schema } from "mongoose";

const gameFowlGender = new Schema({
  genderTitle: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlGender", gameFowlGender);
