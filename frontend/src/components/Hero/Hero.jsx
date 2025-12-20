import React from "react";
import "../Hero/Hero.css";
import { assets } from "../../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="standard-padding container">
      <div className="grid-container">
        {/* Left large image */}
        <div className="grid-item large">
          <img src={assets.pizza_img} alt="Large" />
          <div className="overlay">
            <p>Short description for large image</p>
            <button>Learn More</button>
          </div>
        </div>

        {/* Right top image */}
        <div className="grid-item small">
          <img src={assets.pizza_img} alt="Top Right" />
          <div className="overlay">
            <p className="smallpara">Short description for top right image</p>
            <button>Learn More</button>
          </div>
        </div>

        {/* Right bottom image */}
        <div className="grid-item small">
          <img src={assets.pizza_img} alt="Bottom Right" />
          <div className="overlay">
            <p className="smallpara">
              Short description for bottom right image
            </p>
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
