import React, { useState } from "react";
import { Footer, Header, SignUpModal } from "./components/index.js";
import { Outlet } from "react-router-dom";

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
  /**
   * Controls the visibility of the SignUp/Login modal
   * true  -> modal visible
   * false -> modal hidden
   */
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/*
          Authentication Modal
          Rendered conditionally based on showLogin state
          Pass setShowLogin to allow modal to close itself
          */}
      {showLogin ? <SignUpModal setShowLogin={setShowLogin} /> : <></>}

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
