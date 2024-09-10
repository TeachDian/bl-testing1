import mongoose, { Schema } from "mongoose";

const breedingSeason = new Schema({
  breedingSeasonTitle: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("BreedingSeason", breedingSeason);
