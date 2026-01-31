import asyncHandler from "../utils/asyncHandler";
import bcrypt from "bcryptjs";

const superadminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const envEmail = process.env.SUPERADMIN_EMAIL?.toLowerCase().trim();
  const envPasswordHash = process.env.SUPERADMIN_PASSWORD_HASH;

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
    expiresIn: "15m", // ⬅️ shorter
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
    .json(new ApiResponse(200, req.user, "Current admin fetched successfully"));
});

export { superadminLogin, superadminLogout, getCurrentSuperAdmin };
