import express from "express";
import {
  addDish,
  dishList,
  removeDish,
} from "../controllers/dish.controller.js";
import { upload } from "../middlewares/multer.middlwware.js";

const router = express();

// add dishes items in the dish list
router.route("/add").post(upload.single("image"), addDish);

// list dishes that are in the list
router.route("/list").get(dishList);

// remove dishes from the list
router.route("/delete").delete(removeDish);

export default router;
