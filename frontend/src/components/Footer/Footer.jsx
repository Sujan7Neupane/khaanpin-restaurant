import React from "react";
import "../Footer/Footer.css";
import { Link } from "react-router";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: `url(${assets.pattern_bg})` }}
    >
      <div className="footer-top">
        {/* <!-- Left section: Logo, Description, Social Media --> */}
        <div className="footer-left">
          <img src={assets.logo} alt="Logo" className="footer-logo" />
          <p className="footer-desc">
            We provide the best food delivery service with quality and care.
          </p>
          <div className="footer-social">
            <Link to={"https://facebook.com"} target="_blank">
              <img src={assets.facebook_icon} alt="Facebook" />
            </Link>
            <Link to={"https://twitter.com"} target="_blank">
              <img src={assets.twitter_icon} alt="Twitter" />
            </Link>
            <Link to={"https://instagram.com"} target="_blank">
              <img src={assets.instagram_icon} alt="Instagram" />
            </Link>
          </div>
        </div>

        {/* <!-- Middle section: Company Links --> */}
        <div className="footer-middle">
          <h3>COMPANY</h3>
          <ul>
            <li>
              <Link to={"#"}>Home</Link>
            </li>
            <li>
              <Link to={"#"}>About Us</Link>
            </li>
            <li>
              <Link to={"#"}>Delivery</Link>
            </li>
            <li>
              <Link to={"#"}>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* <!-- Right section: Get in Touch --> */}
        <div className="footer-right">
          <h3>GET IN TOUCH</h3>
          <p>Email: contact@khaanpin.com</p>
          <p>Address: Kathmandu, Nepal</p>
        </div>
      </div>

      <hr />

      {/* <!-- Footer bottom: Copyright --> */}
      <div className="footer-bottom">
        <p>&copy; Khaanpin 2026. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
