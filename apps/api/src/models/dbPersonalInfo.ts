import mongoose, { Schema } from "mongoose";

const personalInfo = new Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  birthDate: {
    type: Date,
    required: false,
  },
  telephone: String,
  mobile: String,
  billingAddress: {
    type: mongoose.Schema.ObjectId,
    ref: "BillingAddress",
  },
  profilePicture: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("PersonalInfo", personalInfo);
