import mongoose, { Schema } from "mongoose";

const microchipStatusEnum = ["Available", "Used", "Defective"];

const microchip = new Schema({
  microchipId: String,
  microchipStatus: {
    type: String,
    enum: microchipStatusEnum,
    default: "Available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("Microchip", microchip);
