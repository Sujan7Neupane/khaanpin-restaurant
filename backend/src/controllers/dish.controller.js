import { Dish } from "../models/dish.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

// this adds the new dishes in the dish list
const addDish = asyncHandler(async (req, res) => {
  // getting fields from frontend
  const { name, desc, price, category } = req.body;

  // to store name of the image
  //   stores uploaded file name in this variable
  const imageLocalPath = req.file?.path;

  // basic validation
  if (!name || !desc || !price || !category) {
    throw new ApiError(400, "All fields are required!");
  }

  if (!imageLocalPath) {
    throw new ApiError(400, "Dish image is required!");
  }

  // Upload file on Cloudinary
  const uploadedImage = await uploadOnCloudinary(imageLocalPath);

  if (!uploadedImage) {
    throw new ApiError(500, "Image upload failed!");
  }

  // creating object structure and adding to mongoDB database
  const dish = await Dish.create({
    name,
    desc,
    price,
    category,
    image: uploadedImage.secure_url,
  });

  // returning as a response
  return res
    .status(200)
    .json(new ApiResponse(200, { data: dish }, "Dish Added Successfully!"));
});

const dishList = asyncHandler(async (req, res) => {});

export { dishList, addDish };
