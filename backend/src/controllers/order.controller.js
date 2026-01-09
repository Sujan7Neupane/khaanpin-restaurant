import { Order } from "../models/order.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Cart } from "../models/cart.models.js";

// placing order on the basis of Cash On delivery
const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { paymentMethod, deliveryFee, address } = req.body;

  // console.log(dishItems);

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!address || !paymentMethod) {
    throw new ApiError(400, "Address and payment method are required");
  }

  // Fetch user's cart
  const cart = await Cart.findOne({ user: userId }).populate("cartData.dish");

  if (!cart || cart.cartData.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  // fetching dish here directly
  const dishItems = cart.cartData.map((item) => ({
    dish: item.dish._id,
    name: item.dish.name,
    price: item.price,
    quantity: item.quantity,
  }));

  // Calculating totalAmount here
  const subtotal = dishItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalAmount = subtotal + (deliveryFee || 0);

  // Create the order
  const order = await Order.create({
    userId,
    dishItems,
    amount: totalAmount,
    address,
    paymentMethod,
    payment: paymentMethod === "cashOnDelivery" ? false : true,
    deliveryFee: deliveryFee || 0,
    date: Date.now(),
    status: "Order Placed",
  });

  // Clear cart correctly
  await Cart.findOneAndUpdate(
    { user: userId },
    { cartData: [], totalPrice: 0 }
  );

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

  const orders = await Order.find({ userId }).sort({ date: -1 }).populate({
    path: "dishItems.dish",
    select: "name price image",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

// fetching all the order in admin page
const fetchAllOrderAdmin = asyncHandler(async (_req, res) => {
  const order = await Order.find({}).populate({
    path: "dishItems.dish",
    select: "name price image",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "All users order fetched successfully"));
});

// to change the order status  of ordered items from admin panel
const changeOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  // Validate input
  if (!orderId || !status) {
    res.status(400);
    throw new Error("orderId and status are required");
  }

  // Find the order
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new ApiError("Order not found");
  }

  // Update status
  order.status = status;
  const updatedOrder = await order.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: updatedOrder },
        "Order status updated successfully"
      )
    );
});

export { createOrder, fetchUserOrders, fetchAllOrderAdmin, changeOrderStatus };
