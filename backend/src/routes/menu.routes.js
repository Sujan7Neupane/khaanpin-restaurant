import express from "express";
import { addMenu, menuList } from "../controllers/menu.controller";

const router = express();

// too add new menu in the menu
router.route("/add").post(addMenu);

// to get all the menus
router.route("/list").get(menuList);

export default router;
