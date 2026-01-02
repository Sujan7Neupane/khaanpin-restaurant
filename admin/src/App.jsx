import React from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <div className="admin-content">
        <Sidebar />
        <div className="main-area">
          <Navbar />
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
