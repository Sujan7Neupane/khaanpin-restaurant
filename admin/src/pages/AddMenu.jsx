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
      formData.append("name", name);
      formData.append("image", image);

      // Send request with cookie
      const response = await axios.post(
        `${backend_url}/api/v1/menu/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // IMPORTANT: send JWT cookie automatically
        }
      );

      if (response.data.success) {
        toast.success("Menu added successfully!");
        setName("");
        setImage(null);
      } else {
        toast.error(response.data.message || "Failed to add menu");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
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
