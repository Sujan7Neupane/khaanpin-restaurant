import express from "express";
import {
  addMenu,
  listMenu,
  deleteMenu,
} from "../controllers/menu.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middlwware.js";

const router = express();

// too add new menu in the menu
router.route("/add").post(verifyAdmin, upload.single("image"), addMenu);

// to get all the menus
router.route("/list").get(listMenu);

// to delete the menu
router.route("/delete").delete(verifyAdmin, deleteMenu);

export default router;
