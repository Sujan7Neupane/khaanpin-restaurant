import { Router } from "express";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  adminDashboard,
  adminLogin,
  adminLogout,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/login").post(adminLogin);

router.route("/logout").post(verifyAdmin, adminLogout);

router.get("/dashboard", verifyAdmin, adminDashboard);

export default router;
