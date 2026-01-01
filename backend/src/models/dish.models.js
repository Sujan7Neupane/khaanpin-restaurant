import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
});

export const Dish = mongoose.model("Dish", dishSchema);

// This is the single object that our product will contain
//  {
//     id: 1,
//     name: "Chicken Pizza",
//     desc: "Stone-baked pizza with melted cheese and fresh toppings.",
//     price: 499,
//     rating: 4.5,
//     image: assets.pizza_img,
//     category: "Pizza",
//   },
