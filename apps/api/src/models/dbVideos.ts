import mongoose, { Schema } from "mongoose";

const videos = new Schema({
  videoTitle: String,
  videoDate: Date,
  videoHost: String,
  videoLink: String,
  videoDescription: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("Videos", videos);
