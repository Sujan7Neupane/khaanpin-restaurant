import React from "react";
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router";

// TODO: receive as a prop { recentOrders = []}
const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* Welcome */}
      <div className="welcome">
        <h2>Dashboard Overview</h2>
        <p>Welcome to your admin dashboard. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          {
            title: "Total Revenue",
            value: "$28,450",
            change: "+12.5%",
          },
          { title: "Active Orders", value: "142", change: "+8.2%" },
          { title: "Products", value: "342", change: "+5.1%" },
          { title: "Customers", value: "1,892", change: "+15.3%" },
        ].map((stat, i) => (
          <div className="stat-card" key={i}>
            <div>
              <p className="stat-title">{stat.title}</p>
              <h3>{stat.value}</h3>
              <span className="positive">{stat.change}</span>
            </div>
            {/* <div className="icon">{stat.icon}</div> */}
          </div>
        ))}
      </div>

      {/* Recent Orders (DIV-based) */}
      <div className="orders">
        <div className="orders-header">
          <h3>Recent Orders</h3>
          <span onClick={() => navigate("/order")} className="view-all">
            View All →
          </span>
        </div>

        {/* Header Row */}
        <div className="order-row header">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Amount ($)</div>
          <div>Status</div>
        </div>

        {/* Data Rows */}
        {/* {recentOrders.map((order) => (
          <div className="order-row" key={order._id}>
            <div>{order._id.slice(0, 7)}</div>
            <div>
              {order.address.firstName} {order.address.lastName}
            </div>
            <div>{order.amount}</div>
            <div>
              <span
                className={`status ${
                  order.status === "Delivered"
                    ? "delivered"
                    : order.status === "Processing"
                    ? "processing"
                    : "pending"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))} */}
      </div>

      {/* Quick Actions */}
      <div className="actions">
        <div className="action-card indigo">
          <h4>Add New Dish</h4>
          <p>Quickly add new dish</p>
          <button onClick={() => navigate("/add")}>Add Dishes</button>
        </div>

        <div className="action-card emerald">
          <h4>Manage Dishes</h4>
          <p>View and edit your dishes catalog</p>
          <button onClick={() => navigate("/list")}>View Dish List</button>
        </div>

        <div className="action-card amber">
          <h4>Order Management</h4>
          <p>Process and track customer orders</p>
          <button onClick={() => navigate("/order")}>View Orders</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
