import React, { useState } from "react";
import "../DishCard/DishCard.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCart } from "../../store/cartSlice";
import axios from "axios";

/**
 * DishCard Component
 * ------------------
 * Represents a single dish item card in the menu.
 * Displays dish image, name, description, price, and allows adding/removing from cart.
 *
 * @param {string|number} id - Unique identifier for the dish
 * @param {string} name - Name of the dish
 * @param {number} price - Price of the dish
 * @param {string} desc - Short description of the dish
 * @param {string} image - URL or imported image of the dish
 */

// Currently comes manually from object
// TODO: data from backend
const DishCard = ({ id, name, price, desc, image }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // cart ko number counts
  // const [cartCount, setCartCount] = useState(0); //removed local state
  // Get cart items from Redux
  const { cartData } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // cart item that we added using addTocart
  const cartItem = cartData.find((item) => item.dish._id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Redux dispatch to dispatch/send data using payload
  const dispatch = useDispatch();

  // TODO: ADD TO CART HERE
  const handleAddToCart = async () => {
    //blocking user from adding item in cart if not logged in
    // TODO: adding guest add to cart for future
    if (!user) {
      return alert("Login to add dish to cart!");
    }
    try {
      // console.log("add to cart");
      // console.log(id);

      const res = await axios.post(
        `${backend_url}/api/v1/cart/add`,
        {
          dishId: id,
          quantity: 1,
        },
        { withCredentials: true }
      );

      // console.log(res);

      dispatch(setCart(res.data.data));
    } catch (error) {
      dispatch(clearCart());
    }
  };

  // Remove single item from cart
  const removeFromCart = async () => {
    try {
      const res = await axios.delete(
        `${backend_url}/api/v1/cart/remove-single`,
        {
          data: { dishId: id },
          withCredentials: true,
        }
      );

      dispatch(
        setCart({
          cartData: res.data.data.cartData,
          totalPrice: res.data.data.totalPrice,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dish-item">
      {/* Dish Image and Add/Remove Controls */}
      <div className="dish-item-img-container">
        <img src={image} className="dish-item-image" alt={name} />

        {/* Conditional rendering for cart controls */}
        {quantity === 0 ? (
          /**
           * When dish is not in the cart, show a white "Add" icon
           * Clicking it sets cartCount to 1
           */
          <img
            className="add-icon"
            src={assets.add_icon_white}
            alt="add"
            // here id name price image is passed to the store
            onClick={handleAddToCart}
            loading="lazy"
          />
        ) : (
          // Dish add garda + - dekhaune
          <div className="dish-item-counter">
            {/* Remove one item */}
            <img
              src={assets.remove_icon_red}
              alt="remove"
              onClick={removeFromCart}
              loading="lazy"
            />

            {/* Display current count */}
            <p>{quantity}</p>

            {/* Add one item */}
            <img
              src={assets.add_icon_green}
              alt="add"
              // here id name price image is passed to the store
              onClick={handleAddToCart}
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Dish information: name, description, price */}
      <div className="dish-item-info">
        <div className="dish-item-name-rating">
          {/* Dish name */}
          <p>{name}</p>

          {/* Static rating stars */}
          {/* TODO: addition of rating system using backend  */}
          <img src={assets.rating_starts} alt="rating" loading="lazy" />
        </div>

        {/* Dish description */}
        <p className="dish-item-desc">{desc}</p>

        {/* Dish price */}
        <p className="dish-item-price">${price}</p>
      </div>
    </div>
  );
};

export default DishCard;
