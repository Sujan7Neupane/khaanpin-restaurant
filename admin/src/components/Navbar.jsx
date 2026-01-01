import React from "react";
import "../styles/Navbar.css";
import { assets } from "../assets/admin_assets/assets";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={assets.logo} alt="" />
      </div>
      <div className="profile">
        <img src={assets.profile_image} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
