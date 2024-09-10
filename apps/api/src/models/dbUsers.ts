import mongoose, { Schema } from "mongoose";

const users = new Schema({
  breederId: String,
  userName: String,
  email: String,
  password: String,
  country: String,
  changePasswordAt: Date,
  role: {
    type: String,
    enum: ["Admin", "User"],
    required: true,
  },
  subscription: {
    type: mongoose.Schema.ObjectId,
    ref: "Subscription",
  },
  deactivated: Boolean,
  personalInfo: {
    type: mongoose.Schema.ObjectId,
    ref: "PersonalInfo",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
});

export default mongoose.model("Users", users);
