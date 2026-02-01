import { Router } from "express";
import {
  addNewAdmin,
  adminSignupViaLink,
  getAllUsers,
  getCurrentSuperAdmin,
  superadminLogin,
  superadminLogout,
} from "../controllers/superadmin.controller.js";
import { verifySuperAdmin } from "../middlewares/superadmin.middleware.js";

const router = Router();

router.route("/login").post(superadminLogin);
router.route("/logout").post(verifySuperAdmin, superadminLogout);

// to add new admin
router.route("/add-admin").post(verifySuperAdmin, addNewAdmin);

// to create new admin via link by admin
router.route("/admin-signup").post(adminSignupViaLink);

router.get("/current-superadmin", verifySuperAdmin, getCurrentSuperAdmin);

router.get("/all-users", verifySuperAdmin, getAllUsers);

export default router;
