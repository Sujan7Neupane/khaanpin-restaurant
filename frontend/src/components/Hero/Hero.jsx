import React from "react";
import "../Hero/Hero.css";
import { assets } from "../../assets/frontend_assets/assets";

/**
 * Hero Component
 * --------------
 * Hero section of the homepage with a visually appealing
 * grid of images and overlays. Includes:
 *  - Large left image with overlay text and button
 *  - Two smaller right images stacked vertically, each with overlay
 *  - On smaller device row becomes column of left two
 *  - buttons for "Learn More"
 *
 * Purpose: Highlight featured dishes and engage users immediately.
 */
const Hero = () => {
  return (
    <div className="standard-padding container">
      {/* Grid layout container for hero images */}
      <div className="grid-container">
        {/* LEFT LARGE IMAGE */}
        <div className="grid-item large">
          <img src={assets.pizza_img} alt="Large" loading="lazy" />
          {/* Overlay with description and CTA */}
          <div className="overlay">
            <p>Hot, cheesy, and loaded with flavor in every bite.</p>
            <button>Learn More</button>
          </div>
        </div>

        {/* RIGHT SMALL IMAGES STACK */}
        <div className="small-grid">
          {/* Top right small image */}
          <div className="grid-item small">
            <img src={assets.momo_img} alt="Top Right" loading="lazy" />
            {/* Overlay with description and CTA */}
            <div className="overlay">
              <p className="smallpara">
                Delicious momo packed with flavor, perfect bite every time.
              </p>
              <button>Learn More</button>
            </div>
          </div>

          {/* Bottom right small image */}
          <div className="grid-item small">
            <img src={assets.chowmein_img} alt="Bottom Right" loading="lazy" />
            {/* Overlay with description and CTA */}
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
