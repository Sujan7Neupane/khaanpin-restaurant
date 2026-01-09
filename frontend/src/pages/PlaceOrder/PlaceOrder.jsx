import React, { useState } from "react";
import "../PlaceOrder/PlaceOrder.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { clearCart } from "../../store/cartSlice";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // to navigate to specific page
  const navigate = useNavigate();

  // to clear cart after order placement
  const dispatch = useDispatch();

  // created reusable form state to clear form after placing order

  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { cartData, totalPrice } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.auth);
  // console.log(cartData);

  // Example amounts
  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 15;

  // Checkout handler
  const handleCheckout = async () => {
    if (cartData.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Basic validation
    for (const key in formData) {
      if (!formData[key]) {
        toast.error(`Please fill in your ${key}`);
        return;
      }
    }

    try {
      // Prepare order payload
      const payload = {
        dishItems: cartData.map((item) => ({
          dish: item.dish._id,
          quantity: item.quantity,
          price: item.price,
        })),
        deliveryFee: shippingFee,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: "cashOnDelivery",
      };

      const res = await axios.post(
        `${backend_url}/api/v1/order/place`,
        payload,
        {
          withCredentials: true,
        }
      );

      toast.success("Order placed successfully!");
      console.log(res.data);

      dispatch(clearCart());

      // Optionally, redirect to order confirmation page
      // TODO: redirect to orders page
      navigate("/my-orders");

      //Clear form
      setFormData(initialFormState);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="order-page">
      {/* Left: Form */}
      <div className="order-form">
        <h2>Shipping Details</h2>
        <form>
          {/* First + Last Name */}
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Street */}
          <div className="form-group">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>

          {/* City + State */}
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Zip Code + Country */}
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </div>

      {/* Right: Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping Fee:</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
