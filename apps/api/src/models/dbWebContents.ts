import mongoose, { Schema } from "mongoose";

const webContents = new Schema({
  aboutUs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "AboutUs",
    },
  ],
  billboards: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Billboards",
    },
  ],
  sliders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Sliders",
    },
  ],
  activities: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Activities",
    },
  ],
  events: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Events",
    },
  ],
  news: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "News",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Videos",
    },
  ],
  socialLinks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "SocialLinks",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("WebContents", webContents);
