import React from "react";
import "../About/About.css";
import { assets } from "../../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="about-main">
      {/* Minimal Header */}
      <header className="about-head">
        <h1>About Us</h1>
        <p>More than food. It's an experience.</p>
      </header>

      {/* Hero Image Section */}
      <section className="about-hero-image">
        <div className="about-hero-img">
          <img src={assets.about_img} alt="Delicious food presentation" />
        </div>
        <div className="about-img-caption">
          <p>Fresh ingredients, authentic flavors</p>
        </div>
      </section>

      {/* Compact Story Section */}
      <section className="about-story-section">
        <div className="about-story-content">
          <h2>Our Story</h2>
          <p>
            Born from a love of authentic flavors and late-night cravings, we
            started with a simple mission: make great food accessible anytime,
            anywhere.
          </p>
          <p>
            What began as a small kitchen experiment in 2015 has grown into a
            destination for thousands who trust us for quality and consistency.
          </p>
        </div>
        <div className="about-stats">
          <div className="about-stat-item">
            <span className="about-stat-num">8+</span>
            <span className="about-stat-label">Years</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-num">50K+</span>
            <span className="about-stat-label">Customers</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-num">100+</span>
            <span className="about-stat-label">Menu Items</span>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-values-container">
          <h2>Our Promise</h2>
          <p className="about-values-subtitle">
            What drives us every day — from sourcing to serving.
          </p>

          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">🍅</div>
              <h3>Fresh Ingredients</h3>
              <p>
                Sourced daily from trusted local suppliers to ensure unmatched
                quality and taste.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">👨‍🍳</div>
              <h3>Crafted by Experts</h3>
              <p>
                Every dish is prepared with skill, care, and a passion for
                perfection.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">⚡</div>
              <h3>Quick & Reliable</h3>
              <p>
                Fast preparation and delivery without ever compromising
                freshness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="about-gallery">
        <h2>Behind the Scenes</h2>
        <div className="about-gallery-grid">
          <div className="about-gallery-item">
            <img src={assets.team_img} alt="Chef preparing food" />
            <p>Our kitchen team in action</p>
          </div>
          <div className="about-gallery-item">
            <img src={assets.fresh_veg} alt="Fresh ingredients" />
            <p>Fresh local ingredients</p>
          </div>
          <div className="about-gallery-item">
            <img src={assets.signature_dish} alt="Finished dish" />
            <p>Signature dishes</p>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="about-cta-section">
        <h2>Ready to Experience the Difference?</h2>
        <p>Join thousands of satisfied customers who trust us for quality.</p>
        <div className="about-cta-btns">
          <button className="about-btn about-btn-primary">Order Now</button>
          <button className="about-btn about-btn-secondary">View Menu</button>
        </div>
      </section>
    </div>
  );
};

export default About;
