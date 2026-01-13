import { Dish } from "../models/dish.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import deleteFromCloudinary from "../utils/deletefromCloudinary.js";

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
    name: name.toLowerCase(),
    desc,
    price,
    category,
    image: uploadedImage.secure_url,
  });

  // returning as a response
  return res
    .status(200)
    .json(new ApiResponse(200, { dish }, "Dish Added Successfully!"));
});

// to display the lists of dishes added
const dishList = asyncHandler(async (_req, res) => {
  const dishes = await Dish.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, { dishes }, "Dish List Fetched Successfully!"));
});

// to remove the dishes from the list
const removeDish = asyncHandler(async (req, res) => {
  // req.body.id gets the id of the dish to delete from the frontend
  // dish will hold the dish to be deleted
  // console.log(req.body.id);

  const dish = await Dish.findById(req.body.id);

  // delete the image from Cloudinary if it exists
  // deleteFromCloudinary is utility function that helps to delete images from cloudinary
  if (dish.image) {
    await deleteFromCloudinary(dish.image);
  }

  // remove the dish from MongoDB
  await Dish.findByIdAndDelete(req.body.id);

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Dish removed successfully!"));
});

export { dishList, addDish, removeDish };
