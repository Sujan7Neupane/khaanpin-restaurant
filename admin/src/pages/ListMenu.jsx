import React, { useEffect, useState } from "react";
import "../styles/ListMenu.css";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const ListMenu = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [menuList, setDishList] = useState([]);

  const fetchMenuList = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/v1/menu/list`);

      console.log("Menu List", response);

      if (response.data.success) {
        setDishList(response.data?.data || []);
      } else {
        toast.error("Failed to fetch menu");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching menu list");
    }
  };

  /* DELETE MENU */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?"))
      return;

    try {
      const response = await axios.delete(`${backend_url}/api/v1/menu/delete`, {
        data: { id },
        withCredentials: true,
      });

      if (response.data.success) {
        setDishList((prev) => prev.filter((item) => item._id !== id));
        toast.success(response.data.message || "Menu deleted");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unauthorized or session expired");
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <div className="menu-list">
      <h2 className="menu-title">Menu List</h2>

      <div className="menu-container">
        {/* Header (desktop only via CSS) */}
        <div className="menu-header">
          <span>Image</span>
          <span>Name</span>
          <span className="text-center">Action</span>
        </div>

        <div className="menu-items">
          {menuList.length === 0 ? (
            <p>No menu items found.</p>
          ) : (
            menuList.map((dish) => (
              <div className="menu-row" key={dish._id}>
                <img
                  src={dish.image || assets.default_dish}
                  alt={dish.name}
                  className="menu-image"
                />

                <p className="menu-name">{dish.name}</p>

                <div className="menu-action">
                  <img
                    src={assets.close_icon}
                    alt="delete"
                    className="menu-delete-icon"
                    onClick={() => handleDelete(dish._id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
