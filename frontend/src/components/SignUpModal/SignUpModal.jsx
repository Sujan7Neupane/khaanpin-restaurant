// This modal will popup when user clicks on the signup button which is on the header

import React, { useState } from "react";
import "../SignUpModal/SignUpModal.css";
import { toast } from "react-toastify";
import axios from "axios";

// setShowLogin -> passed from the parent component which will change the modal state
const SignUpModal = ({ setShowLogin }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  // console.log(backend_url);

  // this state identifies whether the user is signup or not
  // Based on the state signup and login page is shown
  const [isSignup, setIsSignup] = useState(true);

  // state for form handling
  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  // handling the input change and controlling input fields
  const onEventChangeHandler = (e) => {
    const name = e.target.name; //this comes from the <input name="name"
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  // login handler
  const handleLoginSignup = async (e) => {
    e.preventDefault();

    try {
      let response;

      // for signup page
      if (isSignup) {
        // api call
        response = await axios.post(
          `${backend_url}/api/v1/user/register`,
          // sending data to backend
          {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        );
      } else {
        // for login page
        response = await axios.post(
          // api call
          `${backend_url}/api/v1/user/login`,
          // sending data to backend
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        );
      }

      if (response.data.success) {
        console.log(response);
        toast.success(response.data.message || "Success");
        setShowLogin(false);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Authentication failed";
      toast.error(message);
    }
  };

  // checking fields inside data in state just for checking
  // whenever data changes this runs
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <>
      <div className="auth-overlay">
        <div className="auth-modal">
          {/* onClicking the close button form closes */}
          <button className="auth-close" onClick={() => setShowLogin(false)}>
            ×
          </button>
          {/* checks page and shows login and signup page accordingly  */}
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

          <form onSubmit={handleLoginSignup} className="auth-form">
            {/* hiding name on the login page  */}
            {isSignup && (
              <input
                onChange={onEventChangeHandler}
                value={data.name} //from useState variable
                name="name"
                type="text"
                placeholder="Full Name"
                required
              />
            )}

            <input
              // two way binding
              onChange={onEventChangeHandler}
              value={data.email}
              // two way binding

              name="email"
              type="email"
              placeholder="Email"
              required
            />

            {isSignup && (
              <input
                onChange={onEventChangeHandler}
                value={data.username}
                name="username"
                type="text"
                placeholder="Username"
                required
              />
            )}

            <input
              onChange={onEventChangeHandler}
              value={data.password}
              name="password"
              type="password"
              placeholder="Password"
              required
            />

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
    </>
  );
};

export default SignUpModal;
