import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// placing order on the basis of Cash On delivery
const createOrder = asyncHandler(async (req, res) => {
  const { userId, items, amount, address, paymentMethod, deliveryFee } =
    req.body;

  if (!userId || !items || !amount || !address) {
    throw new ApiError(400, "Missing required fields");
  }

  // Create the order
  const order = await Order.create({
    userId,
    items,
    amount,
    address,
    paymentMethod,
    payment: paymentMethod === "cashOnDelivery" ? false : null,
    deliveryFee: deliveryFee,
    date: Date.now(),
  });

  await User.findByIdAndUpdate(userId, { cartData: [] });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order placed successfully!"));
});

// to display orders in user profile
// to fetch order info
const fetchUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const orders = await Order.find({ userId }).sort({ date: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

export { createOrder, fetchUserOrders };
