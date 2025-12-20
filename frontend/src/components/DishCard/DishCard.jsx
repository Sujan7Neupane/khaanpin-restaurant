import React, { useState } from "react";
import "../DishCard/DishCard.css";
import { assets } from "../../assets/frontend_assets/assets";

const DishCard = ({ id, name, price, desc, image }) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="dish-item">
      <div className="dish-item-img-container">
        <img src={image} className="dish-item-image" alt={name} />

        {cartCount === 0 ? (
          <img
            className="add-icon"
            src={assets.add_icon_white}
            alt="add"
            onClick={() => setCartCount(1)}
            loading="lazy"
          />
        ) : (
          <div className="dish-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove"
              onClick={() => setCartCount((prev) => prev - 1)}
              loading="lazy"
            />
            <p>{cartCount}</p>
            <img
              src={assets.add_icon_green}
              alt="add"
              onClick={() => setCartCount((prev) => prev + 1)}
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="dish-item-info">
        <div className="dish-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" loading="lazy" />
        </div>
        <p className="dish-item-desc">{desc}</p>
        <p className="dish-item-price">${price}</p>
      </div>
    </div>
  );
};

export default DishCard;
