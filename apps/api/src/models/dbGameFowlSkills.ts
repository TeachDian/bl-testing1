import mongoose, { Schema } from "mongoose";

const gameFowlSkills = new Schema({
  gameFowlType: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlType",
  },
  gameFowlSkillsCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlSkillsCategory",
  },
  gameFowlSkillSet: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlSkills", gameFowlSkills);
