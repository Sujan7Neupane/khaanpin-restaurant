import { console } from "inspector";
import { Cart } from "../models/cart.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Dish } from "../models/dish.models.js";

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
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; //comes from middleware
  const { dishId, quantity = 1 } = req.body; //takes 1 initially
  // const addToCart = async (dish) => {
  // await axios.post("/api/cart/add", {
  //   dishId: dish._id,   // passed from frontend like this
  //   quantity: 1
  // });
  // };

  // Validate input
  if (!dishId) {
    throw new ApiError(400, "Dish id is missing");
  }

  // Fetch dish (trusted price source)
  const dish = await Dish.findById(dishId);
  if (!dish) {
    throw new ApiError(404, "Dish not found");
  }

  // Find user's cart checks users document (Cart) check existing also
  // findOne because user is unique
  let cart = await Cart.findOne({ user: userId });
  console.log(cart);

  // Create cart if not exists
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      cartData: [],
      totalPrice: 0,
    });
  }

  // Check if dish already in cart
  // if already exist add quantity number otherwise push new item
  const item = cart.cartData.find((i) => i.dish.toString() === dishId);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.cartData.push({
      dish: dish._id,
      quantity,
      price: dish.price,
    });
  }

  //  Recalculate total price
  // quantity changes so recalculate
  // price*quantity -> 120*2 + 200*1 = 440 (price*quantity+ price*quantity)
  cart.totalPrice = cart.cartData.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // Save cart to db
  await cart.save();

  return res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
});

// TODO:sending this from body
// {
//   "dishId": "695b624c38cb83c2bf37a0f8",
//   "quantity": 1
// }

// removing dish items from cart
const removeFromCart = asyncHandler(async (req, res) => {});

export { getCartData, addToCart, removeFromCart };
