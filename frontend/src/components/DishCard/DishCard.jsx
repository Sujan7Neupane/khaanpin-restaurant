import React, { useState } from "react";
import "../DishCard/DishCard.css";
import { assets } from "../../assets/frontend_assets/assets";

/**
 * DishCard Component
 * ------------------
 * Represents a single dish item card in the menu.
 * Displays dish image, name, description, price, and allows adding/removing from cart.
 *
 * @param {string|number} id - Unique identifier for the dish
 * @param {string} name - Name of the dish
 * @param {number} price - Price of the dish
 * @param {string} desc - Short description of the dish
 * @param {string} image - URL or imported image of the dish
 */

// Currently comes manually from object
// TODO: data from backend
const DishCard = ({ id, name, price, desc, image }) => {
  // cart ko number counts
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="dish-item">
      {/* Dish Image and Add/Remove Controls */}
      <div className="dish-item-img-container">
        <img src={image} className="dish-item-image" alt={name} />

        {/* Conditional rendering for cart controls */}
        {cartCount === 0 ? (
          /**
           * When dish is not in the cart, show a white "Add" icon
           * Clicking it sets cartCount to 1
           */
          <img
            className="add-icon"
            src={assets.add_icon_white}
            alt="add"
            onClick={() => setCartCount(1)}
            loading="lazy"
          />
        ) : (
          // Dish add garda + - dekhaune
          <div className="dish-item-counter">
            {/* Remove one item */}
            <img
              src={assets.remove_icon_red}
              alt="remove"
              onClick={() => setCartCount((prev) => prev - 1)}
              loading="lazy"
            />
            {/* Display current count */}
            <p>{cartCount}</p>

            {/* Add one item */}
            <img
              src={assets.add_icon_green}
              alt="add"
              onClick={() => setCartCount((prev) => prev + 1)}
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Dish information: name, description, price */}
      <div className="dish-item-info">
        <div className="dish-item-name-rating">
          {/* Dish name */}
          <p>{name}</p>
          {/* Static rating stars */}
          {/* TODO: addition of rating system using backend  */}
          <img src={assets.rating_starts} alt="rating" loading="lazy" />
        </div>

        {/* Dish description */}
        <p className="dish-item-desc">{desc}</p>

        {/* Dish price */}
        <p className="dish-item-price">${price}</p>
      </div>
    </div>
  );
};

export default DishCard;
