import { useState } from "react";
import "./DishList.css";
import { assets } from "../../assets/frontend_assets/assets";
import DishCard from "../DishCard/DishCard";

// Currently manually made dishList
// future will make controllers in backend

const dishesList = [
  {
    id: 1,
    name: "Chicken Pizza",
    desc: "Stone-baked pizza with melted cheese and fresh toppings.",
    price: 499,
    rating: 4.5,
    image: assets.pizza_img,
    category: "Pizza",
  },
  {
    id: 2,
    name: "Veg Momo",
    desc: "Steamed dumplings stuffed with fresh vegetables.",
    price: 199,
    rating: 4.2,
    image: assets.momo_img,
    category: "Momo",
  },
  {
    id: 3,
    name: "Chowmein",
    desc: "Stir-fried noodles with fresh veggies and sauce.",
    price: 249,
    rating: 4.3,
    image: assets.chowmein_img,
    category: "Chowmein",
  },
  {
    id: 4,
    name: "Paneer Pizza",
    desc: "Cheesy pizza topped with spicy paneer cubes.",
    price: 549,
    rating: 4.6,
    image: assets.pizza_img,
    category: "Pizza",
  },
  {
    id: 5,
    name: "Paneer Pizza",
    desc: "Cheesy pizza topped with spicy paneer cubes.",
    price: 549,
    rating: 4.6,
    image: assets.pizza_img,
    category: "Pizza",
  },
  {
    id: 6,
    name: "Paneer Pizza",
    desc: "Cheesy pizza topped with spicy paneer cubes.",
    price: 549,
    rating: 4.6,
    image: assets.pizza_img,
    category: "Pizza",
  },
  {
    id: 7,
    name: "Paneer Pizza",
    desc: "Cheesy pizza topped with spicy paneer cubes.",
    price: 549,
    rating: 4.6,
    image: assets.pizza_img,
    category: "Pizza",
  },
  {
    id: 8,
    name: "Veg Momo",
    desc: "Steamed dumplings stuffed with fresh vegetables.",
    price: 199,
    rating: 4.2,
    image: assets.momo_img,
    category: "Momo",
  },
];

const DishList = ({ category }) => {
  return (
    <div className="dish-display container standard-padding">
      {/* Section Title */}
      <h2 className="menu-title">Top Picks</h2>

      {/* Column Container */}
      <div className="dish-list">
        {dishesList.map((item, index) => {
          // Display food according to the menu
          if (category === "All" || category === item.category) {
            return (
              // display card here
              <DishCard
                // sending data as a props from here to DishCard Component
                // which will be received as a parameter teta like const DishCard({yaha})
                key={index}
                id={item.id}
                name={item.name}
                desc={item.desc}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default DishList;
