import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  // Get token from Authorization header or cookie
  const { adminRefreshToken } = req.cookies;

  if (!adminRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const admin = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );

  if (!admin) {
    throw new ApiError(401, "Admin no longer exists");
  }

  // Check role
  if (admin.role !== "admin") {
    throw new ApiError(403, "Admin access only");
  }

  req.user = admin;
  next();
});
