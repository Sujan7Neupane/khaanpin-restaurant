import express from "express";
import {
  addToCart,
  getCartData,
  removeFromCart,
} from "../controllers/cartController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express();

router.route("/cart-data").get(verifyJWT, getCartData);
router.route("/add").post(verifyJWT, addToCart);
router.route("/remove").delete(verifyJWT, removeFromCart);

export default router;
