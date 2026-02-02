import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import validator from "validator";
import jwt from "jsonwebtoken";

// To generate jwt tokens for login and register
// After user login and register for both
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

// controller for user registration
const userRegister = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  //   Checking empty fields
  if (
    [name, username, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //   validating email
  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Please enter a valid email");
  }

  //   checking password length
  if (password.length < 8) {
    throw new ApiError(400, "Please enter a strong password");
  }

  //   validating email existing
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists with username or email");
  }

  const user = await User.create({
    name,
    username: username.toLowerCase(),
    email,
    password,
  });

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    // TODO: for the deployment
    // sameSite: "None",
    // maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: registeredUser },
        "User Registered Successfully!"
      )
    );
});

// controller for user login
const userLogin = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  // console.log(email);

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  }).select("+password");

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if (user.status === "suspended") {
    throw new Error("Account is suspended. Please contact support.");
  }

  // Very Important
  // Prevent admins logging in via user login
  if (user.role !== "user") {
    throw new ApiError(403, "Invalid login route");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged In Successfully"
      )
    );
});

// controller for user logout
const userLogout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.refreshToken = undefined;
    await user.save();
  }

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged out!"));
});

// To get the current logged in user
const getCurrentUser = asyncHandler(async (req, res) => {
  // here token is verified once the page loads which persists the user data on login
  // previously the user logged out on page refresh
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.status(401);
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decoded._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully!"));
});

export { userLogin, userRegister, getCurrentUser, userLogout };
