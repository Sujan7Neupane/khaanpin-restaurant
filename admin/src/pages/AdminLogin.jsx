import React, { useState } from "react";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Section */}
        <div className="login-info">
          <h1>Admin Panel</h1>
          <p>
            Secure access to manage users, orders, products, and system
            settings.
          </p>
        </div>

        {/* Right Section */}
        <div className="login-form">
          <h2>Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
