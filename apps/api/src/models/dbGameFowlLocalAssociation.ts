import mongoose, { Schema } from "mongoose";

const gameFowlLocalAssociation = new Schema({
  localAssociation: String,
  federation: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlFederation",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model(
  "GameFowlLocalAssociation",
  gameFowlLocalAssociation
);
