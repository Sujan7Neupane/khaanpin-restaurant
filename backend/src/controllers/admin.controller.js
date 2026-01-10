import { User } from "../models/user.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const adminLogin = asyncHandler(async (req, res) => {
  // request from body
  const { email, password } = req.body;

  //   checks for email and password
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Since we dont have super admin
  // we will be using the email and pass created manually
  // TODO: future make super-admin
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  // Generate JWT token
  const adminPayload = {
    email,
    role: "admin",
  };

  const accessToken = jwt.sign(adminPayload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //   checks password validation
  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

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
        { email, role: "admin" },
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
