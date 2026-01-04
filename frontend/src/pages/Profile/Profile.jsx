import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Profile/Profile.css";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UserProfile = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user from Redux store
  const { user } = useSelector((state) => state.auth);

  console.log("Profile", user);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  if (!user) {
    return (
      <div className="profile-container">
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading profile...
        </p>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backend_url}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <img
            src={assets.profile_circle}
            alt="User Avatar"
            className="profile-avatar"
          />
          <h2 className="profile-name">{user?.name || "No Name"}</h2>
          <p className="profile-username">@{user?.username || "username"}</p>
        </div>

        {/* User Info */}
        <div className="profile-info">
          <h3>Profile Information</h3>
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{user?.name || "Not provided"}</span>
          </div>
          <div className="info-item">
            <span className="label">Username:</span>
            <span className="value">{user?.username || "Not provided"}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user?.email || "Not provided"}</span>
          </div>
          <div className="info-item">
            <span className="label">Joined:</span>
            <span className="value">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
