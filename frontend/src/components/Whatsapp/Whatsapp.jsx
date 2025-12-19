import React from "react";
import { Link } from "react-router";

import { assets } from "../../assets/frontend_assets/assets";
import "../Whatsapp/Whatsapp.css";

const Whatsapp = () => {
  return (
    <div>
      <Link
        to="https://web.whatsapp.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <img src={assets.whatsapp_icon} alt="whatsapp" />
      </Link>
    </div>
  );
};

export default Whatsapp;
