import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../Header/Header.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";
import { clearCart, selectTotalQuantity } from "../../store/cartSlice";
/**
 * Header Component
 * ----------------
 * - Displays top info bar (contact, location, cart)
 * - Displays main navigation bar
 * - Handles responsive mobile menu behavior
 * - Opens authentication modal via parent-controlled state
 */

const Header = ({ setShowLogin }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

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
  //  Used to automatically close the menu on navigation on mobie screen
  const location = useLocation();

  // Toggles the mobile menu open/close state
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // sending value to store
  const dispatch = useDispatch();

  // User dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // to remove dropdown on clicking outside of box
  const dropdownRef = useRef(null);

  // fetching user from store
  const { user } = useSelector((state) => state.auth);

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
      // close user dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
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
    setShowDropdown(false);
  }, [location.pathname]);

  // Get cart items from Redux
  const { cartData } = useSelector((state) => state.cart);

  // total quantity in cart cares about the quantity not just items
  // selectTotalQuantity is a selector that gives total count in cart
  const totalQuantity = useSelector(selectTotalQuantity);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        `${backend_url}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      dispatch(clearCart());
      toast.success("Logged out successfully");
      setShowDropdown(false);
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

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
          <img
            src={assets.cart_icon}
            onClick={() => navigate("/cart")}
            alt="cart"
            className="icon"
          />
          {/* Show count only if cart is not empty */}
          {/* TODO: add cartCOunt */}
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
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

          {/* Normally */}
          {/* <button onClick={() => setShowLogin(true)} className="signup-btn">
            Sign In
          </button> */}

          {/* normal -> signin button | user loggedin -> gropdown with user profile and logout */}
          {!user ? (
            <button onClick={() => setShowLogin(true)} className="signup-btn">
              Sign In
            </button>
          ) : (
            <div className="user-dropdown" ref={dropdownRef}>
              <button
                className="signup-btn"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {user ? user.username : "loading..."}{" "}
                <span className="arrow">
                  <img src={assets.dropdown_icon} alt="dropdown arrow" />
                </span>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    <img
                      src={assets.profile_circle}
                      alt="profile"
                      className="dropdown-icon"
                    />
                    Profile
                  </button>

                  <button className="dropdown-item" onClick={handleLogout}>
                    <img
                      src={assets.logout_icon}
                      alt="logout"
                      className="dropdown-icon"
                    />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

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
