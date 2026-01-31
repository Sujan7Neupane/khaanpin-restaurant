import { Router } from "express";
import {
  getCurrentSuperAdmin,
  superadminLogin,
  superadminLogout,
} from "../controllers/superadmin.controller.js";
import { verifySuperAdmin } from "../middlewares/superadmin.middleware.js";

const router = Router();

router.route("/login").post(superadminLogin);
router.route("/logout").post(verifySuperAdmin, superadminLogout);

router.get("/current-superadmin", verifySuperAdmin, getCurrentSuperAdmin);

export default router;
