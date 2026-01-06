import express from "express";
import {
  addToCart,
  getCartData,
  removeFromCart,
  removeSingleItemFromCart,
} from "../controllers/cartController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express();

router.route("/cart-data").get(verifyJWT, getCartData);
router.route("/add").post(verifyJWT, addToCart);
router.route("/remove").delete(verifyJWT, removeFromCart);
router.route("/remove-single").delete(verifyJWT, removeSingleItemFromCart);

export default router;
