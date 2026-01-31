import { Router } from "express";
import {
  superadminLogin,
  superadminLogout,
} from "../controllers/superadmin.controller";
import { verifySuperAdmin } from "../middlewares/superadmin.middleware";

const router = Router();

router.route("/login").post(superadminLogin);
router.route("/logout").post(verifySuperAdmin, superadminLogout);
