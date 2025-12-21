import React from "react";
import { Footer, Header } from "./components/index.js";

import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="main-container">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
