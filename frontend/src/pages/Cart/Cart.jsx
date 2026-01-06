import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { setCart, setError } from "../../store/cartSlice";
import "../Cart/Cart.css";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios";

/**
 * CartPage Component
 * ------------------
 * This page displays all products added to the user's cart.
 * It retrieves cart data from the Redux store, shows item details
 * (image, name, price, quantity), calculates the total amount,
 * and allows users to remove items from the cart.
 * The layout is fully responsive for desktop, tablet, and mobile devices.
 */

const CartPage = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  // useDispatch dispatches/sends the data through payload to store
  const dispatch = useDispatch();

  // for navigation to order page with proceed to checkout button
  const navigate = useNavigate();

  // all the cart Items inside the cart
  const { cartData, loading } = useSelector((state) => state.cart);

  // console.log(cartData);
  // console.log(totalPrice);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/v1/cart/cart-data`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        dispatch(
          setCart({
            cartData: response.data.data.cartData,
            totalPrice: response.data.data.totalPrice,
          })
        );
      } catch (error) {
        dispatch(setError(error));
      }
    };
    fetchCartData();
  }, [dispatch]);

  // Remove entire item from cart
  const handleRemoveFromCart = async (dishId) => {
    console.log(dishId);

    try {
      const res = await axios.delete(`${backend_url}/api/v1/cart/remove`, {
        data: { dishId },
        withCredentials: true,
      });

      // Update Redux with new cart returned from backend
      dispatch(
        setCart({
          cartData: res.data.data.cartData,
          totalPrice: res.data.data.totalPrice,
        })
      );
    } catch (error) {
      console.error(
        "Failed to remove item:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Calculate total amount
  const totalAmount = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {loading ? (
        <p>Loading cart...</p>
      ) : cartData.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {/* mapping through cartItems  */}
          {cartData.map((item, index) => (
            <div className="cart-item" key={`${item.dish._id}-${index}`}>
              <img src={item.dish.image} alt={item.dish.name} />
              <div className="cart-info">
                {/* Displaying other information */}
                <h3>{item.dish.name}</h3>
                <p>
                  <b>Price: </b>${item.price}
                </p>
                <p>
                  <b>Quantity:</b> {item.quantity}
                </p>
                <p>
                  <b>Total:</b> ${item.price * item.quantity}
                </p>
              </div>

              <div className="icon-wrapper">
                <img
                  src={assets.delete_icon} // make sure this exists in your assets
                  alt="delete"
                  className="delete-icon"
                  // here it dispatches/sends the data to our store
                  // removeFromCart receives a parameter itemsId which is send through eeach item.id
                  onClick={() => handleRemoveFromCart(item.dish._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* TODO: add from note */}

      {/* Total and Proceed to Payment Section */}
      <div className="total-section">
        {/* displays total amount here */}
        <h2>Grand Total: ${totalAmount.toFixed(2)}</h2>

        {/* Proceed to Payment button */}
        <button
          className="proceed-btn"
          // TODO: connect this button to payment gateway later
          onClick={() => navigate("/order")}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
