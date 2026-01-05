import { console } from "inspector";
import { Cart } from "../models/cart.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// get cart data list
const getCartData = asyncHandler(async (req, res) => {
  // currently logged in user's id
  const userId = req.user?._id;

  console.log(userId);

  //   no user = not authorized to add to cart
  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  //   findOne({ user: userId }) because:
  // user s unique: true in the schema → one cart per user

  // .populate("cartData.dish", "name image price")
  //   attaches the cartdata here and
  // 'name image ' -> select these fields only

  const cart = await Cart.findOne({ user: userId }).populate(
    "cartData.dish",
    "name image price"
  );

  if (!cart || cart.cartData.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { cartData: [], totalPrice: 0 }, "Cart is empty")
      );
  }

  //   saving cart to db
  await cart.save();
  //   console.log(cart);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart data fetched successfully!"));
});

// adding dish list to cart
const addToCart = asyncHandler(async (req, res) => {});

// removing dish items from cart
const removeFromCart = asyncHandler(async (req, res) => {});

export { getCartData, addToCart, removeFromCart };
