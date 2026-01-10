import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  {
    const adminToken = req.headers.authorization?.split(" ")[1];
    if (!adminToken) {
      throw new ApiError(401, "No token provided");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(adminToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      throw new ApiError(401, "Invalid or expired token");
    }

    if (decodedToken.role !== "admin") {
      throw new ApiError(403, "Admin access only");
    }

    req.admin = decodedToken;
    next();
  }
});
