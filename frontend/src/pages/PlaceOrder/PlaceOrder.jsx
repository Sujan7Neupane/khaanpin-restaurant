import React, { useState } from "react";
import "../PlaceOrder/PlaceOrder.css";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cartItems = useSelector((state) => state.cart.items);

  // Example amounts
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 15;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    console.log("Form Data:", formData);
    console.log("Total Amount:", total);
    alert("Proceeding to checkout...");
    // Add your checkout logic here
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
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
