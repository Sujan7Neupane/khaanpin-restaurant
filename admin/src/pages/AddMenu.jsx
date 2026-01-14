import React, { useState } from "react";
import "../styles/AddMenu.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";

const AddMenu = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      toast.error("Please provide menu name and image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("image", image);

      const response = await axios.post(
        `${backend_url}/api/v1/menu/add`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response);

      toast.success(response.data.message);
      setName("");
      setImage(null);
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 409) {
        // Duplicate menu name
        toast.error("Menu with this name already exists");
      } else if (status === 400) {
        toast.error(message || "Invalid input");
      } else if (status === 401 || status === 403) {
        toast.error("You are not authorized to perform this action");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-menu-container">
      <form onSubmit={handleSubmit} className="add-menu-form">
        <h2 className="add-menu-title">Add Menu</h2>

        <p className="label">Upload Image</p>

        <div className="add-menu-row">
          {/* Image upload */}
          <div className="add-menu-image-upload">
            <label>
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Menu"
              />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* Menu name input */}
          <div className="add-menu-field">
            <p className="add-menu-label">Menu Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter menu name"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-menu-submit-btn">
          {loading ? <span className="add-menu-spinner"></span> : "Add Menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
