import { Router } from "express";
import { adminLogin } from "../controllers/admin.controller/js";
import { AdminLogin } from "../../../admin/src/pages";
import { verifyAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.route("/login").post(AdminLogin);

router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({ message: `Welcome admin ${req.admin.username}` });
});

export default router;
