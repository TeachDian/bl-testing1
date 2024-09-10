import mongoose, { Schema } from "mongoose";

const photos = new Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Events",
  },
  activityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Activities",
  },
  gameFowlMaterialId: {
    type: mongoose.Schema.ObjectId,
    ref: "GameFowlMaterials",
  },
  key: String,
  thumbKey: String,
  description: String,
  tags: String,
  isMain: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("Photos", photos);
