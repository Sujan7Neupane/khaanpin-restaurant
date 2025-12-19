import React from "react";
import { Header, Hero, Search, Whatsapp } from "./components/index.js";

const App = () => {
  return (
    <div className="main-container">
      <Header />
      <Search />
      <Hero />
      <Whatsapp />
    </div>
  );
};

export default App;
