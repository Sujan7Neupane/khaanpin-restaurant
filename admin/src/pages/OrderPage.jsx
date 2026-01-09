import React, { useEffect, useState } from "react";
import "../styles/OrderPage.css";
import axios from "axios";

const OrderPage = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/order/allOrders`);

        setOrders(res.data.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`${backend_url}/api/v1/order/changeStatus`, {
        orderId,
        status: newStatus,
      });

      // Update local state to reflect change immediately
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      alert("Order status updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <p className="loading">Loading orders...</p>;
  }

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
        {orders.map((order) => (
          <div className="order-row" key={order._id}>
            <img
              src={order.dishItems[0]?.dish?.image}
              alt="Dish"
              className="order-image"
            />

            {/* Dish items */}
            <div className="order-items">
              {order.dishItems.map((item) => (
                <p key={item._id}>
                  <span className="label-mobile">Name: </span>
                  {item.name} x {item.quantity}
                </p>
              ))}
            </div>

            {/* Ordered by */}
            <p className="order-customer">
              <span className="label-mobile">Ordered By: </span>
              {order.userId}
            </p>

            {/* Address */}
            <p className="order-address">
              <span className="label-mobile">Address: </span>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}
            </p>

            {/* Status */}
            <select
              className="order-status"
              value={order.status} // controlled component
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option>Order Placed</option>
              <option>Accepted</option>
              <option>Preparing</option>
              <option>Ready</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
