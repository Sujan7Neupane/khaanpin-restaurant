import { Router } from "express";
import {
  createOrder,
  fetchUserOrders,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// payment features
router.route("/place").post(verifyJWT, createOrder);

// for the normal users
router.route("/userorders").get(verifyJWT, fetchUserOrders);

export default router;
