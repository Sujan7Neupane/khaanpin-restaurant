import React, { useState } from "react";
import { Footer, Header, SignUpModal } from "./components/index.js";

import { Outlet } from "react-router-dom";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <SignUpModal setShowLogin={setShowLogin} /> : <></>}
      <div className="main-container">
        <Header setShowLogin={setShowLogin} />

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
