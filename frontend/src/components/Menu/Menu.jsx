import React from "react";
import "../Menu/Menu.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

/**
 * Menu items array
 * ----------------
 * Represents the categories available in the menu
 * Each object contains:
 * - name: the dish/category name
 * - image: image representing the dish
 */

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
  console.log("menu", category);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  // fetched menus from backend
  const [menuItems, setMenuItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  /**
   * Handles click on a menu item
   * - If the clicked category is already selected, resets to "All"
   * - Otherwise, sets the clicked category as selected
   *
   * @param {string} name - Name of the clicked menu category
   */

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backend_url}/api/v1/menu/list`);

        console.log("Menu", response.data.data);

        setMenuItems(response.data?.data || []);
      } catch (err) {
        setError("Failed to load menu items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleClick = (name) => {
    console.log("menu", name.toLowerCase());

    console.log(name.toLowerCase() ? "all" : name);

    setCategory((prev) =>
      prev === name.toLowerCase() ? "all" : name.toLowerCase()
    );
  };

  if (loading) {
    return <p className="menu-loading">Loading menu...</p>;
  }

  if (error) {
    return <p className="menu-error">{error}</p>;
  }

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
                category === item.name.toLowerCase() ? "selected" : ""
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
