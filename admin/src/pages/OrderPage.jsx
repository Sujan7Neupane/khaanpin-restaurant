import React from "react";
import "../styles/OrderPage.css";

const OrderPage = () => {
  return (
    <div className="orders-page">
      <h2 className="title">All Orders</h2>
      <div className="orders-headers">
        <span>Image</span>
        <span>Name</span>
        <span>Ordered By</span>
        <span>Address</span>
        <span>Status</span>
      </div>

      <div className="orders-container">
        <div className="order-row">
          <img src="dish1.jpg" alt="Dish Image" className="order-image" />
          <div className="order-items">
            <p>
              <span className="label-mobile">Name: </span>Pizza Margherita x 2 M
            </p>
            <p>
              <span className="label-mobile">Name: </span>Garlic Bread x 1 L
            </p>
          </div>
          <p className="order-customer">
            <span className="label-mobile">Ordered By: </span>Junga Bahadur Rana
          </p>
          <p className="order-address">
            <span className="label-mobile">Address: </span>123 Chabahil,
            Kathmandu
          </p>
          <select className="order-status">
            <option>Pending</option>
            <option>Ready to ship</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
