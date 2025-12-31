import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: string,
  },
});

export const Menu = mongoose.model("Menu", menuSchema);

// This is how our menu should look like
// const menuItems = [
//   { name: "Pizza", image: assets.pizza_img },
//   { name: "Momo", image: assets.momo_img },
// ];
