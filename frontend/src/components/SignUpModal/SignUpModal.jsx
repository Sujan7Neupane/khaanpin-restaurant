// This modal will popup when user clicks on the signup button which is on the header

import React, { useState } from "react";
import "../SignUpModal/SignUpModal.css";

// setShowLogin -> passed from the parent component which will change the modal state
const SignUpModal = ({ setShowLogin }) => {
  // this state identifies whether the user is signup or not
  // Based on the state signup and login page is shown
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        {/* onClicking the close button form closes */}
        <button className="auth-close" onClick={() => setShowLogin(false)}>
          ×
        </button>
        {/* checks page and shows login and signup page accordingly  */}
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <form className="auth-form">
          {/* hiding name on the login page  */}
          {isSignup && <input type="text" placeholder="Full Name" required />}

          <input type="email" placeholder="Email" required />

          <input type="password" placeholder="Password" required />

          <button type="submit" className="auth-btn">
            {/* if page is signup shows signup and Login show Login text */}
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          {/* Based on the page if login -> only email and password */}
          {/* If register -> name, email and password field */}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
