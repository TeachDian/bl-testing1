import mongoose from "mongoose";
const { Schema } = mongoose;

const user = new Schema({
  farmId: {
    type: mongoose.Types.ObjectId,
    ref: "farmId",
    required: true,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["Owner", "Admin", "User"],
    default: "User",
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
  registrationType: {
    type: String,
    enum: ["Manual", "Google", "Facebook"],
  },
});

export default mongoose.model("User", user);
