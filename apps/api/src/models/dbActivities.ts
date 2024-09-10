import mongoose, { Schema } from "mongoose";

const activities = new Schema({
  activityTitle: String,
  activityHost: String,
  activityDate: Date,
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Photos",
    },
  ],
  activityDescription: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("Activities", activities);
