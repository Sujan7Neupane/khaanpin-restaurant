import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifySuperAdmin = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.superadminAccessToken ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Unauthorized: no token provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Unauthorized: invalid or expired token");
  }

  // Enforce SUPERADMIN only
  if (decoded.role !== "superadmin") {
    throw new ApiError(403, "Access denied: superadmin only");
  }

  req.superadmin = decoded;
  next();
});
