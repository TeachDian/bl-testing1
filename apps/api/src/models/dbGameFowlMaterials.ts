import mongoose, { Schema } from "mongoose";

const gameFowlMaterials = new Schema({
  wingBandNumber: String,
  microchipNumber: String,
  markings: String,
  dateOfBirth: Date,
  gender: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlGender",
  },
  bodyColor: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlBodyColor",
  },
  legColor: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlLegColor",
  },
  originFarm: String,
  vaccine: String,
  status: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlStatus",
  },
  geneticComposition: [
    {
      breedType: {
        type: mongoose.Schema.ObjectId,
        ref: "GameFowlType",
      },
      input1: Number,
      input2: Number,
      geneticFraction: String,
      geneticPercentage: Number,
    },
  ],
  comb: String,
  history: String,
  miscellaneous: String,
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Photos",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlMaterials", gameFowlMaterials);
