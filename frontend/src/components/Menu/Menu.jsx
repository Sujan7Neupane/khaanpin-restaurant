import React from "react";
import "../Menu/Menu.css";
import { assets } from "../../assets/frontend_assets/assets";

/**
 * Menu items array
 * ----------------
 * Represents the categories available in the menu
 * Each object contains:
 * - name: the dish/category name
 * - image: image representing the dish
 */

// Will be implemented using backend
const menuItems = [
  { name: "Pizza", image: assets.pizza_img },
  { name: "Momo", image: assets.momo_img },
  { name: "Chowmein", image: assets.chowmein_img },
  { name: "Momo", image: assets.momo_img },
  { name: "Chowmein", image: assets.chowmein_img },
  { name: "Pizza", image: assets.pizza_img },
];

/**
 * Menu Component
 * --------------
 * Displays clickable menu categories for filtering dishes.
 * Highlights the selected category and allows toggling back to "All".
 *
 * @param {string} category - Current selected category
 * @param {Function} setCategory - Function to update selected category
 */
const Menu = ({ category, setCategory }) => {
  /**
   * Handles click on a menu item
   * - If the clicked category is already selected, resets to "All"
   * - Otherwise, sets the clicked category as selected
   *
   * @param {string} name - Name of the clicked menu category
   */
  const handleClick = (name) => {
    setCategory((prev) => (prev === name ? "All" : name));
  };

  return (
    <div className="standard-padding container">
      {/* Menu Header: Title & Description */}
      <div className="menu-header">
        <h2 className="menu-title">Our Menu</h2>
        <p className="menu-desc">
          Explore our most loved dishes, freshly prepared with quality
          ingredients and authentic flavors.
        </p>
      </div>

      {/* Menu Items: Clickable Categories*/}
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <div
            className="menu-item"
            key={index}
            onClick={() => handleClick(item.name)}
          >
            {/* filtering food on the basis of menu click  */}
            {/* red border for user interaction  */}
            <div
              className={`image-wrapper ${
                category === item.name ? "selected" : ""
              }`}
            >
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>

            {/* Category name */}
            <p className="item-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
