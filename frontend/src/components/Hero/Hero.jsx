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
            <p>Hot, cheesy, and loaded with flavor in every bite.</p>
            <button>Learn More</button>
          </div>
        </div>

        {/* Right top image */}
        {/* Small items wrapper */}
        <div className="small-grid">
          <div className="grid-item small">
            <img src={assets.momo_img} alt="Top Right" />
            <div className="overlay">
              <p className="smallpara">
                Delicious momo packed with flavor, perfect bite every time.
              </p>
              <button>Learn More</button>
            </div>
          </div>

          {/* Right bottom image */}
          <div className="grid-item small">
            <img src={assets.chowmein_img} alt="Bottom Right" />
            <div className="overlay">
              <p className="smallpara">
                Savory noodles loaded with veggies and your choice of protein.
              </p>
              <button>Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
