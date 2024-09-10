import mongoose, { Schema } from "mongoose";

const socialLinks = new Schema({
  facebook: String,
  twitter: String,
  instagram: String,
  tikTok: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("SocialLinks", socialLinks);
