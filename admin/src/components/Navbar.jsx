import React, { useState } from "react";
import "../styles/Navbar.css";
import { assets } from "../assets/admin_assets/assets";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../store/adminSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.admin);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/v1/admin/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/admin-login");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={assets.logo} alt="logo" />
      </div>

      <div className="profile" onClick={() => setOpenDropdown(!openDropdown)}>
        <img src={assets.profile_image} alt="profile" className="profile-img" />

        {/* Dropdown */}
        {openDropdown && (
          <div className="dropdown">
            <p className="username">{user?.email || "Admin"}</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
