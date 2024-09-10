import mongoose, { Schema } from "mongoose";
import { statusEnum } from "./status";

const news = new Schema({
  newsTitle: String,
  newsHost: String,
  newsDate: Date,
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Photos",
    },
  ],
  newsDescription: String,
  status: {
    type: String,
    enum: statusEnum,
    default: "Incomplete",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("News", news);
