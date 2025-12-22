import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../Header/Header.css";

/**
 * Header Component
 * ----------------
 * - Displays top info bar (contact, location, cart)
 * - Displays main navigation bar
 * - Handles responsive mobile menu behavior
 * - Opens authentication modal via parent-controlled state
 */

const Header = ({ setShowLogin }) => {
  // Controls whether the mobile navigation menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the navigation menu element
  // Used to detect outside clicks
  const menuRef = useRef(null);

  //  Reference to the hamburger icon
  //  Prevents menu from closing when clicking the hamburger itself
  const hamburgerRef = useRef(null);

  // for navigating to page forcefully
  const navigate = useNavigate();

  //  Tracks the current route
  //  Used to automatically close the menu on navigation
  const location = useLocation();

  // Toggles the mobile menu open/close state
  const toggleMenu = () => setIsOpen((prev) => !prev);

  //  Effect: Close mobile menu when clicking outside of it
  //  - Listens for mouse clicks on the document
  //  - Checks if click occurred outside menu and hamburger
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

    // Cleanup listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect: Automatically close the menu when route changes
  //This ensures the navbar does not stay open after going to other pages
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Navbar: Contact and cart information */}
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
        {/* Logo navigates to home */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src={assets.logo} alt="Logo" />
        </div>

        {/* Navigation links */}
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

        {/* Right-side actions: Auth button and hamburger menu */}
        <div className="nav-actions">
          {/* Opens modal controlled by Navbar(parent) */}
          <button onClick={() => setShowLogin(true)} className="signup-btn">
            Sign In
          </button>
          {/* Hamburger menu for mobile navigation */}
          {/* ref passed here useRef */}
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
