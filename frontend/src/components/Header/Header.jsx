import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets.js";
import { Link } from "react-router-dom";
import "../Header/Header.css";

const Header = () => {
  //   console.log(assets.logo);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // for clicking outside of the menu it closes
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div>
      {/* top navbar */}
      <div className="top-navbar">
        <div className="left-info">
          <span>
            <img src={assets.call_icon} alt="phone" className="icon" />
            <span className="text">+977 123-456-789</span>
          </span>

          <span>
            <img src={assets.email_icon} alt="email" className="icon" />
            <span className="text">info@example.com</span>
          </span>

          <span>
            <img src={assets.location_icon} alt="location" className="icon" />
            <span className="text">Kathmandu, Nepal</span>
          </span>
        </div>

        <div className="right-cart">
          <span>
            <img src={assets.cart_icon} alt="cart" className="icon" />
            <span className="text">Cart</span>
          </span>

          <span className="cart-count">3</span>
        </div>
      </div>

      {/* main navbar */}
      <nav
        className="navbar"
        style={{ backgroundImage: `url(${assets.pattern_bg})` }}
      >
        <div className="logo">
          <img src={assets.logo} alt="Logo" />
        </div>

        <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link to={"#"}>Home</Link>
          </li>
          <li>
            <Link to={"#"}>Products</Link>
          </li>
          <li>
            <Link to={"#"}>About</Link>
          </li>
          <li>
            <Link to={"#"}>Contact</Link>
          </li>
        </ul>

        <div className="nav-actions">
          {/* signup */}
          <div className="nav-icons">
            {/* <Link to={"#"}>
            <img className="icon" src={assets.profile_icon} alt="Profile" />
          </Link> */}
            <button className="signup-btn">Sign Up</button>
          </div>
          {/* signup */}

          {/* Hamburger icon */}
          <div className="hamburger" onClick={toggleMenu}>
            <img src={isOpen ? assets.close_icon : assets.harburger_icon} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
