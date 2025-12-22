import React from "react";
import "./Contact.css";
import { assets } from "../../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Minimal Header */}
      <header className="contact-header">
        <h1>Contact</h1>
        <p>Questions or feedback? We're here to help.</p>
      </header>

      {/* Compact Content Grid */}
      <div className="contact-grid">
        {/* Contact Information */}
        <section className="contact-info">
          <h2>Get in Touch</h2>

          <div className="info-item">
            <span className="icon">
              <img src={assets.location_icon1} alt="" />
            </span>
            <div>
              <h3>Location</h3>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">
              <img src={assets.phone_calling_icon} alt="" />
            </span>
            <div>
              <h3>Phone</h3>
              <a href="tel:+9779800000000">+977 980-000-0000</a>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">
              <img src={assets.email_icon1} alt="" />
            </span>
            <div>
              <h3>Email</h3>
              <a href="mailto:support@yourrestaurant.com">
                support@yourrestaurant.com
              </a>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">
              <img src={assets.clock_icon} alt="" />
            </span>
            <div>
              <h3>Hours</h3>
              <p>Daily 10AM–11PM</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-section">
          <h2>Send a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>

            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>

            <div className="form-group">
              <select>
                <option value="">Select Subject</option>
                <option value="order">Order Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <textarea placeholder="Your Message" rows="4" required></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </section>
      </div>

      {/* Minimal FAQ Section */}
      <section className="faq-section">
        <h2>Quick Answers</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>Delivery Time?</h3>
            <p>30-45 minutes within Kathmandu valley.</p>
          </div>
          <div className="faq-item">
            <h3>Payment Methods?</h3>
            <p>Cash, cards, eSewa, Khalti, IME Pay.</p>
          </div>
          <div className="faq-item">
            <h3>Vegetarian Options?</h3>
            <p>Yes, we have vegetarian and vegan dishes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
