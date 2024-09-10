import mongoose, { Schema } from "mongoose";

const aboutUs = new Schema({
  systemName: String,
  systemInformation: String,
  vision: String,
  mission: String,
  version: String,
  systemDescription: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("AboutUs", aboutUs);
