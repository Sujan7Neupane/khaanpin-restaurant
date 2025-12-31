import express from "express";
import { addDish, dishList } from "../controllers/dish.controller";

const router = express();

// add dishes items in the dish list
router.route("/add").get(addDish);

// list dishes that are in the list
router.route("/list").get(dishList);

export default router;
