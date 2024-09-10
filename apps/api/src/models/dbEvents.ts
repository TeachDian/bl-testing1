import mongoose, { Schema } from "mongoose";
import { statusEnum } from "./status";

const events = new Schema({
  eventTitle: String,
  eventDates: [
    {
      type: Date,
      required: false,
    },
  ],
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Photos",
    },
  ],
  eventDescription: String,
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

export default mongoose.model("Events", events);
