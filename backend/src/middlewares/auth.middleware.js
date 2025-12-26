import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";

// checks for the authentic user before login them
// also after login checks the user token authenticity
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  // console.log(token);

  if (!token) {
    throw new ApiError(400, "Unauthorized request");
  }

  //   verify tokens authenticity
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  //   finds user from the database who logged or registered
  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(400, "Invalid Access Token");
  }

  //   with this user can now logout and get the current logged user info
  req.user = user;
  next();
});
