import React, { useEffect, useState } from "react";
import "../BottomBar/BottomBar.css";
import { assets } from "../../assets/frontend_assets/assets";

const BottomBar = ({ showBar }) => {
  return (
    <div className={`bottom-bar ${showBar ? "show" : ""}`}>
      {/* Left Logo */}
      <div className="bottom-left">
        <img src={assets.logo_mini} alt="logo" />
      </div>

      {/* Middle Search */}
      <div className="bottom-center">
        <img src={assets.search_icon} alt="search" />
        <input
          type="text"
          placeholder="Search dishes..."
          className="bottom-search-input"
        />
      </div>

      {/* Right Cart */}
      <div className="bottom-right">
        <div className="cart-icon">
          <img src={assets.cart_icon} alt="cart" />
          <span className="cart-badge">0</span>
        </div>
        <p className="cart-total">$0.00</p>
      </div>
    </div>
  );
};

export default BottomBar;
