import { Router } from "express";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  adminDashboard,
  adminLogin,
  adminLogout,
  getCurrentAdmin,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/login").post(adminLogin);

router.route("/logout").post(verifyAdmin, adminLogout);

router.get("/dashboard", verifyAdmin, adminDashboard);

// to get the current logged in admin user
router.get("/current-admin", verifyAdmin, getCurrentAdmin);

export default router;
