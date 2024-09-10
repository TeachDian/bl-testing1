import mongoose, { Schema } from "mongoose";

const gameFowlFederation = new Schema({
  federationTitle: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("GameFowlFederation", gameFowlFederation);
