import mongoose, { Schema } from "mongoose";

const breedingPens = new Schema({
  breedingSeason: {
    type: mongoose.Schema.ObjectId,
    ref: "BreedingSeason",
  },
  breedingDate: Date,
  breedingPen: String,
  forBreeding: [
    {
      broodCock: {
        type: mongoose.Schema.ObjectId,
        ref: "GameFowlMaterials",
      },
      broodCockDescription: String, // New field for the description
      broodHen: {
        type: mongoose.Schema.ObjectId,
        ref: "GameFowlMaterials",
      },
      broodHenDescription: String, // New field for the description
      offspringGeneticComposition: String, // Moved inside forBreeding
    },
  ],
  offspringMarkings: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("BreedingPens", breedingPens);
