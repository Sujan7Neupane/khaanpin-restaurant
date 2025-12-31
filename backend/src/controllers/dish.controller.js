import { Dish } from "../models/dish.models";
import asyncHandler from "../utils/asyncHandler";

// this adds the new dishes in the dish list
const addDish = asyncHandler(async (req, res) => {
  // to store name of the image
  //   stores uploaded file name in this variable
  let image_filename = `${req.file.filename}`;

  const { name, description, price, category } = req.body;

  await Dish.create({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  return res.status(200).cookie().json();
});

const dishList = asyncHandler(async (req, res) => {});

export { dishList, addDish };
