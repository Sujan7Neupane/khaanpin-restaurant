import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Menu = mongoose.model("Menu", menuSchema);

// This is how our menu should look like
// const menuItems = [
//   { name: "Pizza", image: assets.pizza_img },
//   { name: "Momo", image: assets.momo_img },
// ];
