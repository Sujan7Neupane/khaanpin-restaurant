import React, { useState } from "react";
import "../SignUpModal/SignUpModal.css";

const SignUpModal = ({ setShowLogin }) => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="auth-close" onClick={() => setShowLogin(false)}>
          ×
        </button>

        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <form className="auth-form">
          {isSignup && <input type="text" placeholder="Full Name" required />}

          <input type="email" placeholder="Email" required />

          <input type="password" placeholder="Password" required />

          <button type="submit" className="auth-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
