import React, { useState, useEffect } from "react";
import { Footer, Header, SignUpModal } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { logout, setUser } from "./store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart } from "./store/cartSlice.js";

/**
 * App Component
 * -------------
 * Root component of the application.
 * Handles global layout including:
 * - Header (with authentication modal trigger)
 * - Main content (via React Router's Outlet)
 * - Footer
 *
 * Also manages the visibility of the SignUp/Login modal.
 */
const App = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  /**
   * Controls the visibility of the SignUp/Login modal
   * true  -> modal visible
   * false -> modal hidden
   */
  const [showLogin, setShowLogin] = useState(false);

  // prevent Header from rendering before the user is loaded
  const [loading, setLoading] = useState(true);

  /**
   * On app load:
   * - Call /current-user
   * - Backend checks refresh token from httpOnly cookie
   * - Persist login across refresh
   */
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/user/current-user`, {
          withCredentials: true,
        });
        dispatch(setUser(res.data.data)); // store user in Redux
      } catch (err) {
        dispatch(logout()); // clear Redux if token invalid/missing
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  // load cart initially
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${backend_url}/api/v1/cart/cart-data`, {
          withCredentials: true,
        });

        dispatch(
          setCart({
            cartData: res.data.data.cartData,
            totalPrice: res.data.data.totalPrice,
          })
        );
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ zIndex: 2000 }}
      />
      {/*
          Authentication Modal
          Rendered conditionally based on showLogin state
          Pass setShowLogin to allow modal to close itself
          */}
      {showLogin && <SignUpModal setShowLogin={setShowLogin} />}

      {/* 
          Main Page Layout
          Contains Header, dynamic main content, and Footer
        */}
      <div className="main-container">
        {/* Header receives setShowLogin to trigger modal */}
        <Header setShowLogin={setShowLogin} />

        {/* Main content rendered via React Router Outlet */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;
