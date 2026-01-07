import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  dishItems: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
        required: true,
      },
    ],
    required: true,
  },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Order Placed", required: true },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, default: false, required: true },
  date: { type: Number, required: true },
});

export const Order = mongoose.model("Order", orderSchema);
