import mongoose, { Schema } from "mongoose";

const payment = new Schema({
  transactionId: String,
  //NOTE: Price can have a default value directly in this schema or can be manipulated in frontend
  price: Number,
  numberMonths: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    min: 1,
    max: 12,
  },
  subTotal: Number,
  options: {
    type: String,
    enum: ["gcash", "paypal", "bdo", "maya"],
    default: "gcash",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deleteAt: Date,
});

export default mongoose.model("Payment", payment);
