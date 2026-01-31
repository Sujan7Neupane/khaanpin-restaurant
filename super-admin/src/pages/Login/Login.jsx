import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthState } from "../../store/superadminSlice";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${backend_url}/api/v1/superadmin/login`,
        { email, password },
        { withCredentials: true },
      );

      dispatch(setAuthState({ isLoggedIn: true, user: res.data.data }));

      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/superadmin/current-superadmin`,
          {
            withCredentials: true,
          },
        );
        dispatch(setAuthState({ isLoggedIn: true, user: res.data.data }));
        navigate("/dashboard");
      } catch {
        console.log("Unauthorized Login");
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="login-left">
        <h1>Super Admin Panel</h1>
        <p>Manage users, roles, and system settings securely from one place.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2 className="text-center">Superadmin Login</h2>

          {error && <p className="error-text">{error}</p>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
