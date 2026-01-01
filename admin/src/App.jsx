import React from "react";

import "./App.css";
import { Navbar, Sidebar } from "./components";

const App = () => {
  return (
    <div className="admin-content">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <main className="main-content">{/* Main Content here */}</main>
      </div>
    </div>
  );
};

export default App;
