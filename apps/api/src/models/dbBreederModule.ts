import mongoose, { Schema } from "mongoose";

const breederModule = new Schema({
  gameFowlMaterials: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "GameFowlMaterials",
    },
  ],
  breedingPens: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "BreedingPens",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("BreederModule", breederModule);
