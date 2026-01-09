import { Router } from "express";
import {
  createOrder,
  fetchAllOrderAdmin,
  fetchUserOrders,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// payment features
router.route("/place").post(verifyJWT, createOrder);

// for the normal users
router.route("/userorders").get(verifyJWT, fetchUserOrders);

// for the admin page fetch orders of all the users
router.route("/allOrders").get(fetchAllOrderAdmin);

export default router;
