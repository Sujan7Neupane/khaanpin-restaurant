import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const adminLogin = asyncHandler(async (req, res) => {
  // request from body
  const { email, password } = req.body;

  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";
  const envPassword = process.env.ADMIN_PASSWORD?.trim() || "";

  //   checks for email and password
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Since we dont have super admin
  // we will be using the email and pass created manually
  // TODO: future make super-admin
  if (
    email.trim().toLowerCase() !== envEmail ||
    password.trim() !== envPassword
  ) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  // Generate JWT token
  const adminPayload = { email: envEmail, role: "admin" };

  const accessToken = jwt.sign(adminPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  };

  return res
    .status(200)
    .cookie("adminAccessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { email: envEmail, role: "admin" },
        "Admin logged in successfully"
      )
    );
});

const adminLogout = asyncHandler(async (_req, res) => {
  res
    .status(200)
    .clearCookie("adminAccessToken")
    .json(new ApiResponse(200, null, "Admin logged out successfully"));
});

const adminDashboard = asyncHandler(async () => {
  res.json({ message: `Welcome admin ${req.admin.username}` });
});

export { adminLogin, adminLogout, adminDashboard };
