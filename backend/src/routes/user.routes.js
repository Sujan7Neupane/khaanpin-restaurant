import { Router } from "express";
import {
  getCurrentUser,
  // rotateRefreshToken,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middlware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);

router.route("/login").post(userLogin);

router.route("/logout").post(verifyJWT, userLogout);

// router.route("/refresh-token").get(verifyJwt, rotateRefreshToken);

router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
