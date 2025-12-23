import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { removeFromCart } from "../../store/cartSlice";
import "../Cart/Cart.css";
import { assets } from "../../assets/frontend_assets/assets";

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
  // useDispatch dispatches/sends the data through payload to store
  const dispatch = useDispatch();

  // for navigation to order page with proceed to checkout button
  const navigate = useNavigate();

  // all the cart Items inside the cart
  const cartItems = useSelector((state) => state.cart.items);

  // calculated total amount according to the price of the product
  // reduce() takes an array and turns it into a single value.
  // eg: [1, 2, 3, 4] → 10   first: all price in array -> result: total price
  // TODO: will be handled from the backend later
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // rendering on the basis of the value inside cartItems /Consitional rendering
  if (cartItems.length === 0) {
    return <h2 className="empty-cart">Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {/* mapping through cartItems  */}
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              {/* Displaying other information */}
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.price * item.quantity}</p>
            </div>

            <div className="icon-wrapper">
              <img
                src={assets.delete_icon} // make sure this exists in your assets
                alt="delete"
                className="delete-icon"
                // here it dispatches/sends the data to our store
                // removeFromCart receives a parameter itemsId which is send through eeach item.id
                onClick={() => dispatch(removeFromCart(item.id))}
              />
            </div>
          </div>
        ))}
      </div>

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
