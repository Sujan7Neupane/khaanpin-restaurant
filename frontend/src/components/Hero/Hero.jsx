import React from "react";
import "../Hero/Hero.css";

const Hero = () => {
  return (
    <div>
      <div className="grid-container">
        {/* Left large image */}
        <div className="grid-item large">
          <img src="/path/to/image1.jpg" alt="Large" />
          <div className="overlay">
            <p>Short description for large image</p>
            <button>Learn More</button>
          </div>
        </div>

        {/* Right top image */}
        <div className="grid-item small">
          <img src="/path/to/image2.jpg" alt="Top Right" />
          <div className="overlay">
            <p>Short description for top right image</p>
            <button>Learn More</button>
          </div>
        </div>

        {/* Right bottom image */}
        <div className="grid-item small">
          <img src="/path/to/image3.jpg" alt="Bottom Right" />
          <div className="overlay">
            <p>Short description for bottom right image</p>
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
