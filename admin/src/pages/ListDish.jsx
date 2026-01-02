import React from "react";
import "../styles/ListDish.css";
import { assets } from "../assets/admin_assets/assets";

const ListDish = () => {
  return (
    <div className="list-dish">
      <h2 className="title">All Dishes List</h2>

      <div className="products-container">
        <div className="product-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Sub Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* Product Row Example */}
        <div className="product-row">
          <img src="dish1.jpg" alt="Dish 1" className="product-image" />
          <p className="product-name">Pizza Margherita</p>
          <p className="product-category">Food</p>
          <p className="product-subcategory">Italian</p>
          <p className="product-price">$12.50</p>
          <div className="product-action">
            <img src={assets.close_icon} alt="delete" className="delete-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDish;
