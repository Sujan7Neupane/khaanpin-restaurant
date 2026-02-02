import React, { useState } from "react";
import "../SignUpModal/SignUpModal.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

// setShowLogin -> passed from the parent component which will change the modal state
const SignUpModal = ({ setShowLogin }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

  // Toggle between Signup & Login
  const [isSignup, setIsSignup] = useState(true);

  // Loading spinner state
  const [loading, setLoading] = useState(false);

  // Form data
  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  // Handle input changes
  const onEventChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Login / Signup handler
  const handleLoginSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      let response;

      if (isSignup) {
        // Signup
        response = await axios.post(
          `${backend_url}/api/v1/user/register`,
          {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
          },
          { withCredentials: true },
        );
      } else {
        // Login
        response = await axios.post(
          `${backend_url}/api/v1/user/login`,
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true },
        );
      }

      if (response.data.success) {
        // Fetch current user
        const currentUserRes = await axios.get(
          `${backend_url}/api/v1/user/current-user`,
          { withCredentials: true },
        );

        dispatch(setUser(currentUserRes.data.data));
        toast.success(response.data.message || "Success");
        setShowLogin(false);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Authentication failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        {/* Close modal */}
        <button className="auth-close" onClick={() => setShowLogin(false)}>
          ×
        </button>

        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <form onSubmit={handleLoginSignup} className="auth-form">
          {/* Name */}
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={data.name}
              onChange={onEventChangeHandler}
              required
            />
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={onEventChangeHandler}
            required
          />

          {/* Username */}
          {isSignup && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={onEventChangeHandler}
              required
            />
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onEventChangeHandler}
            required
          />

          {/* Submit Button */}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="btn-spinner" />
                <span>Processing...</span>
              </>
            ) : isSignup ? (
              "Sign Up for Free"
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Switch Login / Signup */}
        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <span
            onClick={() => !loading && setIsSignup(!isSignup)}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
