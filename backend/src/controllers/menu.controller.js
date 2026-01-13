import ApiError from "../utils/ApiError.js";
import { Menu } from "../models/menu.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import deleteFromCloudinary from "../utils/deletefromCloudinary.js";

const addMenu = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new ApiError("Menu name is required");
  }

  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Dish image is required!");
  }

  // Upload file on Cloudinary
  const uploadedImage = await uploadOnCloudinary(imageLocalPath);

  if (!uploadedImage) {
    throw new ApiError(500, "Image upload failed!");
  }

  const menu = await Menu.create({
    name: name.toLowerCase(),
    image: uploadedImage.secure_url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, menu, "Menu added Successfully"));
});

const listMenu = asyncHandler(async (_req, res) => {
  const menus = await Menu.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, menus, "All Menu List fetched SuccessFully!"));
});

const deleteMenu = asyncHandler(async (req, res) => {
  // get menu id from frontend
  const { id } = req.body;

  const menu = await Menu.findById(id);

  if (!menu) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Menu item not found"));
  }

  // delete image from Cloudinary if exists
  if (menu.image) {
    await deleteFromCloudinary(menu.image);
  }

  // delete menu item from database
  await Menu.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Menu item removed successfully!"));
});

export { addMenu, listMenu, deleteMenu };
