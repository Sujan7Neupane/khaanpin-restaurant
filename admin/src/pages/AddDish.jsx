import React, { useEffect, useState } from "react";
import "../styles/AddDish.css";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddDish = () => {
  // importing backend url
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // to store image
  const [uploadImage, setUploadImage] = useState(null);

  // for loading icon on uploading the dish for better user experience
  // Step 1:
  const [loading, setLoading] = useState(false);

  // to store other fields like name category and control inputs
  const [data, setData] = useState({
    dish_name: "",
    description: "",
    price: "",
    category: "Appetizers & Snack",
  });

  // Step:1 making controlled field taking events from input fields
  const handleChange = (e) => {
    // name comes from name="" in input field
    // value will extract input value we type
    const dish_name = e.target.name;
    const value = e.target.value;

    // dish_name will be updated with value i.e. [dish_name]:value

    setData((data) => ({ ...data, [dish_name]: value }));
  };

  //  to make an api call sending data Object
  // Step 1: handleCall api call
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Error message for empty fields
    const requiredFields = ["dish_name", "description", "price", "category"];

    const isEmpty =
      requiredFields.some((field) => !data[field]) || !uploadImage;

    if (isEmpty) {
      toast.error("Please check empty fields");
      // stop loading since submission won’t continue
      setLoading(false);
      return;
    }

    // Step: 2 start loading once for is submitted
    setLoading(true);

    // to send the object make a formData a final object
    // send data to backend
    try {
      const formData = new FormData();
      formData.append("name", data.dish_name);
      formData.append("desc", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", uploadImage);

      // API handling using axios
      const response = await axios.post(
        `${backend_url}/api/v1/dish/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        // reseting fields and image after submitting
        setData({
          dish_name: "",
          description: "",
          price: "",
          category: "Appetizers & Snack",
        });
        setUploadImage(false);
        // toastify message for success
        toast.success(response.data.message);
      } else {
      }
    } catch (error) {
      // toastify message for error
      toast.error(response.data.message);
    } finally {
      // Step 3: stop loading
      setLoading(false);
    }
  };

  return (
    <div className="add-dish">
      {/* step 2: handle api call */}
      <form onSubmit={onSubmitHandler} className="dish-form">
        <h2 className="title">Add Dish</h2>

        {/* Upload Images */}
        <p className="label">Upload Image</p>
        <div className="image-upload">
          <label>
            {/* to preview the image after selecting on upload we use ternary operator in src */}
            {/* if image is selected (image?) then URL.createObjectURL(image) */}
            <img
              src={
                uploadImage
                  ? URL.createObjectURL(uploadImage)
                  : assets.upload_area
              }
              alt="upload"
            />
            <input
              // sends image to state from here
              // e.target.files not e.target.value
              onChange={(e) => setUploadImage(e.target.files[0])}
              type="file"
              accept="image/*"
              hidden
            />
          </label>
        </div>

        {/* Converting this field to controlled field */}
        {/* Controlled field is everthing we change or update in this field is reflected in the useState */}
        <div className="field">
          <p className="label">Dish Name</p>

          {/* Step 2: making controlled field  add value properties*/}
          {/* two way binding with onChange and value */}
          <input
            type="text"
            value={data.dish_name}
            name="dish_name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <p className="label">Dish Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Category Row */}
        <div className="row">
          <div className="field">
            <p className="label">Dish Category</p>
            <select onChange={handleChange} name="category">
              <option value="Appetizers">Appetizers & Snack</option>
              <option value="Dessert">Dessert</option>
              <option value="Main_dish">Main Dishes</option>
              <option value="Side_dish">Side Dishes</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Beverages">Beverages</option>
              <option value="Salads">Salads</option>
              <option value="Sauce">Sauce and Marinades</option>
            </select>
          </div>

          <div className="field">
            <p className="label">Price ($)</p>
            <input
              name="price"
              onChange={handleChange}
              value={data.price}
              type="number"
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          {loading ? <span className="spinner"></span> : "Add Dish"}
        </button>
      </form>
    </div>
  );
};

export default AddDish;
