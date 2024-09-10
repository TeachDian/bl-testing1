import mongoose, { Schema } from "mongoose";

const gameFowlSkillsCategory = new Schema({
  skillsCategory: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlSkillsCategory", gameFowlSkillsCategory);
