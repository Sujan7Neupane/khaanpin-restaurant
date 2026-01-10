import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/AdminLogin.css";
import axios from "axios";
import { login } from "../store/adminSlice.js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${backend_url}/api/v1/admin/login`,
        { email, password },
        { withCredentials: true }
      );

      // res.data.data has { email, role }
      dispatch(login(res.data.data));

      setLoading(false);
      toast.success("Admin logged in successfully");
      // navigate after login
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || err.message;
      setError(message);
      toast.error(message);
    }
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

            {error && <p className="error">{error}</p>}

            <button className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
