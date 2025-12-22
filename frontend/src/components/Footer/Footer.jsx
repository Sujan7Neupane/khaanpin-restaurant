import "../Footer/Footer.css";
import { Link } from "react-router";
import { assets } from "../../assets/frontend_assets/assets";

/**
 * Footer Component
 * ----------------
 * Displays the website footer with three main sections:
 * 1. Left: Logo, description, and social media links
 * 2. Middle: Company navigation links
 * 3. Right: Contact information
 *
 * The footer also includes a bottom copyright section.
 */

const Footer = () => {
  return (
    <footer
      className="footer"
      // Optional background pattern
      style={{ backgroundImage: `url(${assets.pattern_bg})` }}
    >
      {/* TOP FOOTER SECTION
          Contains logo, company links, and contact info */}
      <div className="footer-top">
        {/* LEFT SECTION: Logo, description, social media */}
        <div className="footer-left">
          {/* Company logo */}
          <img src={assets.logo} alt="Logo" className="footer-logo" />

          {/* Short description / tagline */}
          <p className="footer-desc">
            We provide the best food delivery service with quality and care.
          </p>

          {/* Social media icons */}
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

        {/* MIDDLE SECTION: Company navigation links */}
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

        {/* RIGHT SECTION: Contact / Get in touch */}
        <div className="footer-right">
          <h3>GET IN TOUCH</h3>
          <p>Email: contact@khaanpin.com</p>
          <p>Address: Kathmandu, Nepal</p>
        </div>
      </div>

      <hr />

      {/* BOTTOM FOOTER SECTION Copyright / legal notice */}
      <div className="footer-bottom">
        <p>&copy; Khaanpin 2026. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
