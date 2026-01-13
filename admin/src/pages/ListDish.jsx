import React, { useEffect, useState } from "react";
import "../styles/ListDish.css";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const ListDish = () => {
  // all dish list will be stored here
  const [dishList, setDishList] = useState([]);

  // backend url
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // fetching backend data of list of dishes
  const fetchDishList = async () => {
    try {
      // gettimg list as a response
      const response = await axios.get(`${backend_url}/api/v1/dish/list`);
      // console.log(response.data);

      const dishesArray = response.data.data?.dishes || [];

      if (response.data.success) {
        setDishList(dishesArray);
        if (!dishesArray.length) {
          toast.info("No dishes found");
        }
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch dishes");
    }
  };

  const handleDelete = async (id) => {
    // console.log(id);

    // TODO: future making this modal instead of confirm
    if (!window.confirm("Are you sure you want to delete this dish?")) return;

    try {
      const response = await axios.delete(`${backend_url}/api/v1/dish/delete`, {
        data: { id }, //id is send using body not thorugh params
      });

      if (response.data.success) {
        setDishList((prev) => prev.filter((dish) => dish._id !== id));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete dish");
    }
  };

  useEffect(() => {
    fetchDishList();
  }, []);

  return (
    <div className="list-dish">
      <h2 className="title">All Dishes List</h2>

      <div className="products-container">
        <div className="product-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product Row Example */}
        <div className="product-list">
          {dishList.length === 0 ? (
            <p>No dishes found.</p>
          ) : (
            dishList.map((dish) => (
              <div className="product-row" key={dish._id}>
                <img
                  src={dish.image || assets.default_dish}
                  alt={dish.name}
                  className="product-image"
                />
                <p className="product-name">{dish.name}</p>
                <p className="product-category">{dish.name}</p>
                <p className="product-price">${dish.price.toFixed(2)}</p>
                <div className="product-action">
                  <img
                    onClick={() => handleDelete(dish._id)}
                    src={assets.close_icon}
                    alt="delete"
                    className="delete-icon"
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

export default ListDish;
