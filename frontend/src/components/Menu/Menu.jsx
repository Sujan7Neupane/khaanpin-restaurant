import React from "react";
import "../Menu/Menu.css";
import { assets } from "../../assets/frontend_assets/assets";

const menuItems = [
  { name: "Pizza", image: assets.pizza_img },
  { name: "Momo", image: assets.momo_img },
  { name: "Chowmein", image: assets.chowmein_img },
  { name: "Momo", image: assets.momo_img },
  { name: "Chowmein", image: assets.chowmein_img },
  { name: "Pizza", image: assets.pizza_img },
];

const Menu = ({ category, setCategory }) => {
  const handleClick = (name) => {
    // Toggle: if the clicked category is already selected, reset to "All"
    setCategory((prev) => (prev === name ? "All" : name));
  };

  return (
    <div className="standard-padding container">
      {/* Title & Description */}
      <div className="menu-header">
        <h2 className="menu-title">Our Menu</h2>
        <p className="menu-desc">
          Explore our most loved dishes, freshly prepared with quality
          ingredients and authentic flavors.
        </p>
      </div>

      {/* Menu Items */}
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <div
            className="menu-item"
            key={index}
            onClick={() => handleClick(item.name)}
          >
            <div
              className={`image-wrapper ${
                category === item.name ? "selected" : ""
              }`}
            >
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
            <p className="item-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
