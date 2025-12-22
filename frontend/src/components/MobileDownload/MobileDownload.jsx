import React from "react";
import "../MobileDownload/MobileDownload.css";
import { assets } from "../../assets/frontend_assets/assets";

const MobileDownload = () => {
  /**
   * MobileDownload Component
   * --------------
   * Nothing special about this page
   * just navigating user to the mobile apps to download
   *
   */

  return (
    <section className="mobile-download">
      <div className="container">
        <h2 className="heading">Get Our App & Enjoy Convenience On the Go!</h2>
        <p className="subheading">
          Download now and access our services anytime, anywhere.
        </p>
        <div className="download-images">
          {/* navigating directly to the appstore and plastore */}
          <link
            href="https://play.google.com/store/apps/details?id=yourapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={assets.play_store} alt="Download on Google Play" />
          </link>
          <link
            href="https://apps.apple.com/app/idyourapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={assets.app_store} alt="Download on App Store" />
          </link>
        </div>
      </div>
    </section>
  );
};

export default MobileDownload;
