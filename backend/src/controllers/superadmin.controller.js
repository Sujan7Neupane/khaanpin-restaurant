import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { generateAdminInviteEmail, sendEmail } from "../utils/sendEmail.js";

const superadminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const SUPERADMIN_PASSWORD_HASH = await bcrypt.hash(
    process.env.SUPERADMIN_PASSWORD,
    12
  );

  const envEmail = process.env.SUPERADMIN_EMAIL?.toLowerCase().trim();
  const envPasswordHash = SUPERADMIN_PASSWORD_HASH;

  if (!envEmail || !envPasswordHash) {
    throw new ApiError(500, "Superadmin not configured");
  }

  const isEmailMatch = email.toLowerCase().trim() === envEmail;
  const isPasswordMatch = await bcrypt.compare(password, envPasswordHash);

  if (!isEmailMatch || !isPasswordMatch) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  const payload = {
    email: envEmail,
    role: "superadmin",
  };

  const accessToken = jwt.sign(payload, process.env.JWT_ADMIN_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("superadminAccessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { email: envEmail, role: "superadmin" },
        "Superadmin logged in"
      )
    );
});

const superadminLogout = asyncHandler(async (req, res) => {
  res.clearCookie("superadminAccessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Superadmin logged out successfully"));
});
// to fetch the current superadmin to persist the login page
const getCurrentSuperAdmin = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.user, "Current super admin fetched successfully")
    );
});

// Controller to add a new admin and send invitation email
const addNewAdmin = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // 1️. Check if user already exists
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiResponse(400, null, "Admin with this email already exists.");
  }

  // 2️. Create new admin with no password
  const newAdmin = await User.create({
    email: email.toLowerCase().trim(),
    role: "admin",
    status: "invited",
  });

  // 3️. Generate invite token (JWT)
  const token = jwt.sign(
    { id: newAdmin._id, email: newAdmin.email, role: "admin" },
    process.env.JWT_INVITE_SECRET,
    { expiresIn: "24h" }
  );

  // 4️. Build invite link
  const inviteLink = `${process.env.CORS_ORIGIN}/set-password?token=${token}`;

  // 5️. Send invitation email
  const html = generateAdminInviteEmail(inviteLink);

  await sendEmail({
    to: newAdmin.email,
    subject: "Admin Invitation from Khaanpin",
    html,
  });

  // 6️. Respond to frontend
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { email: newAdmin.email },
        "Admin created. Invitation email sent successfully."
      )
    );
});

// To update the Admin information from the invitation link
const adminSignupViaLink = asyncHandler(async (req, res) => {
  const { token, name, password } = req.body;

  if (!token || !password || !name) {
    throw new ApiError(400, "Token, name, and password are required");
  }

  // 1️. Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_INVITE_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired invitation token");
  }

  const { email, role } = decoded;

  if (role !== "admin") {
    throw new ApiError(403, "Invalid role in invite token");
  }

  // 2️. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(
      400,
      "User already registered. Invite link cannot be used."
    );
  }

  // 3️. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4️. Create the admin user
  const newAdmin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
    status: "active",
  });

  // 5️. Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { email: newAdmin.email, role: newAdmin.role, name: newAdmin.name },
        "Admin account created successfully"
      )
    );
});

// Get all the users information in Super admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: "superadmin" } }).select(
    "_id name username email role status createdAt invitedAt lastLoginAt"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

export {
  superadminLogin,
  superadminLogout,
  getCurrentSuperAdmin,
  addNewAdmin,
  adminSignupViaLink,
  getAllUsers,
};
