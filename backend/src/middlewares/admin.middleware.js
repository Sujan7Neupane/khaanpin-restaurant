import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  // Get token from Authorization header or cookie
  const adminToken =
    req.headers.authorization?.split(" ")[1] || req.cookies?.adminAccessToken;

  if (!adminToken) {
    throw new ApiError(401, "No token provided");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  // Check role
  if (decodedToken.role !== "admin") {
    throw new ApiError(403, "Admin access only");
  }

  req.admin = decodedToken;
  next();
});
