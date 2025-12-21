import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import "../Header/Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navbar */}
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
          <img src={assets.cart_icon} alt="cart" className="icon" />
          <span className="cart-count">3</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className="navbar"
        style={{ backgroundImage: `url(${assets.pattern_bg})` }}
      >
        <div className="logo" onClick={() => navigate("/")}>
          <img src={assets.logo} alt="Logo" />
        </div>

        <ul ref={menuRef} className={`nav-menu ${isOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="signup-btn">Sign Up</button>

          <div ref={hamburgerRef} className="hamburger" onClick={toggleMenu}>
            <img
              src={isOpen ? assets.close_icon : assets.harburger_icon}
              alt="menu"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
