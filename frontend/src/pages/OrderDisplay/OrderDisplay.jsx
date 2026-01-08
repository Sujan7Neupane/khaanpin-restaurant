import React, { useEffect, useState } from "react";
import "./OrderDisplay.css";
import axios from "axios";

const OrderDisplay = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/order/userorders`, {
          withCredentials: true,
        });
        setOrders(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) return <p className="loading-text">Loading orders...</p>;

  return (
    <section className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-text">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card-main" key={order._id}>
            {/* Header */}
            <div className="order-header">
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
              <span className="order-id">Order #{order._id.slice(-6)}</span>
            </div>

            {/* Items */}
            <div className="order-items">
              {order.dishItems.map((item) => (
                <div className="order-item" key={item._id}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-meta">
                      $ {item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="order-footer">
              <div className="price-info">
                <p>Total</p>
                <h4>${order.amount}</h4>
              </div>

              <button className="track-btn">Track Order</button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default OrderDisplay;
