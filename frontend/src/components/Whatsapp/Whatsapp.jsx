import React from "react";
import { Link } from "react-router";

import { assets } from "../../assets/frontend_assets/assets";
import "../Whatsapp/Whatsapp.css";

const Whatsapp = ({ showBar }) => {
  /**
   * Whatsapp Component
   * --------------
   * Whatsapp icon that appears on the bottom right corner
   * For the online food ordering through whatsapp
   * @param {boolean} showBar - Determines whether the bottom bar is visible and moves a bit up when bottom bar appears
   *
   */
  return (
    <div>
      <Link
        to="https://web.whatsapp.com/"
        target="_blank"
        rel="noopener noreferrer"
        // initially whatsapp was blocking our bottombar
        // RESULT: moved the whatsapp a bit up after bottombar appears
        className={`whatsapp-float ${showBar ? "move-up" : ""}`}
      >
        <img src={assets.whatsapp_icon} alt="whatsapp" />
      </Link>
    </div>
  );
};

export default Whatsapp;
