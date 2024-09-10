import mongoose, { Schema } from "mongoose";

const breederSettings = new Schema({
  breedingSeason: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BreedingSeason",
    },
  ],
  gameFowlClass: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlClass",
    },
  ],
  gameFowlType: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlType",
    },
  ],
  gamFowlBodyColor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlBodyColor",
    },
  ],
  gameFowlGender: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlGender",
    },
  ],
  gameFowlLegColor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlLegColor",
    },
  ],
  gameFowlSkillsCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlSkillsCategory",
    },
  ],
  gameFowlSkills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlSkills",
    },
  ],
  gameFowlStatus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlStatus",
    },
  ],
  gameFowlTraitsCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlTraitsCategory",
    },
  ],
  gameFowlTraits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlTraits",
    },
  ],
  gameFowlComb: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlComb",
    },
  ],
  gameFowlFederation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlFederation",
    },
  ],
  gameFowlLocalAssociation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameFowlLocalAssociation",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("BreederSettings", breederSettings);
