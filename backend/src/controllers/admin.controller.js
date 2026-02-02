import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

// To generate jwt tokens for login
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error while generating Tokens!");
  }
};

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Fetch admin user with password
  const adminUser = await User.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");
  if (!adminUser) {
    throw new ApiError(
      404,
      "Admin user does not exist. Please contact superadmin!"
    );
  }

  console.log(adminUser);
  console.log(adminUser.role);

  if (adminUser.role !== "admin") {
    throw new ApiError(403, "Invalid login route");
  }

  const isPasswordValid = await adminUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(adminUser._id);

  // Hide sensitive fields
  const loggedInAdminUser = await User.findById(adminUser._id).select(
    "-password -refreshToken"
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24,
  };

  res
    .status(200)
    .cookie("adminAccessToken", accessToken, cookieOptions)
    .cookie("adminRefreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { adminUser: loggedInAdminUser },
        "Admin logged in successfully"
      )
    );
});

const adminLogout = asyncHandler(async (_req, res) => {
  res
    .status(200)
    .clearCookie("adminAccessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .json(new ApiResponse(200, null, "Admin logged out successfully"));
});

const adminDashboard = asyncHandler(async () => {
  res.json({ message: `Welcome admin ${req.admin.username}` });
});

// to fetch the current user to persist the login page
const getCurrentAdmin = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current admin fetched successfully"));
});

export { adminLogin, adminLogout, adminDashboard, getCurrentAdmin };
