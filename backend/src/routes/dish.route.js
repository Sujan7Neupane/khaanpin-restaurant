import express from "express";
import { addDish, dishList } from "../controllers/dish.controller.js";
import { upload } from "../middlewares/multer.middlwware.js";

const router = express();

// add dishes items in the dish list
router.route("/add").post(upload.single("image"), addDish);

// list dishes that are in the list
router.route("/list").get(dishList);

export default router;
