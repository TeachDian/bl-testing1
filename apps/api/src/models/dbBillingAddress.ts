import mongoose, { Schema } from "mongoose";

const billingAddress = new Schema({
  street: String,
  barangay: String,
  city: String,
  province: String,
  zipCode: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("BillingAddress", billingAddress);
