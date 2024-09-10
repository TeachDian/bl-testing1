import mongoose, { Schema } from "mongoose";
import { statusEnum } from "./status";

const sliders = new Schema({
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Photos",
    },
  ],
  sliderDescription: String,
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

export default mongoose.model("Sliders", sliders);
