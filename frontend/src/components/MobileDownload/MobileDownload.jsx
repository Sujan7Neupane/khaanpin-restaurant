import React from "react";
import "../MobileDownload/MobileDownload.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const MobileDownload = () => {
  /**
   * MobileDownload Component
   * --------------
   * Nothing special about this page
   * just navigating user to the mobile apps to download
   *
   */

  return (
    // link will cause error says "link is a void element tag and must neither have `children`"
    // FIX: do use Link from react-router-dom
    <section className="mobile-download">
      <div className="container">
        <h2 className="heading">Get Our App & Enjoy Convenience On the Go!</h2>
        <p className="subheading">
          Download now and access our services anytime, anywhere.
        </p>
        <div className="download-images">
          {/* navigating directly to the appstore and plastore */}
          <Link
            href="https://play.google.com/store/apps/details?id=yourapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={assets.play_store} alt="Download on Google Play" />
          </Link>
          <Link
            href="https://apps.apple.com/app/idyourapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={assets.app_store} alt="Download on App Store" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MobileDownload;
