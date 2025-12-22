import React, { useEffect, useState } from "react";
import "../HomePage/HomePage.css";

import {
  BottomBar,
  DishList,
  Hero,
  Menu,
  MobileDownload,
  Search,
  Whatsapp,
} from "../../components/index";

/**
 * HomePage Component
 * ------------------
 * Main landing page of the app, displaying:
 * - Search bar
 * - Hero section with featured dishes
 * - WhatsApp support button
 * - Bottom navigation bar (for mobile users)
 * - Menu categories
 * - List of dishes filtered by category
 * - Mobile app download prompt
 *
 * Handles scroll-based visibility for BottomBar and WhatsApp button.
 */

const HomePage = () => {
  /**
   * Tracks the currently selected menu category
   * Default: "All" to show all dishes
   */
  const [category, setCategory] = useState("All");

  // for the bottom bar and whatsapp position issue
  const [showBar, setShowBar] = useState(false);

  /**
   * useEffect hook to handle scroll events
   * - Adds scroll listener on mount
   * - Updates `showBar` based on window scroll position
   * - Cleans up listener on unmount
   */
  useEffect(() => {
    const handleScroll = () => {
      setShowBar(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // for the bottom bar and whatsapp position issue

  return (
    <div>
      {/* Search bar at top */}
      <Search />

      {/* Hero section: features main dishes */}
      <Hero showBar={showBar} />

      {/* Floating WhatsApp support button */}
      <Whatsapp showBar={showBar} />

      {/* Bottom navigation bar (mobile optimized) */}
      <BottomBar showBar={showBar} />

      {/* Menu category selection */}
      <Menu category={category} setCategory={setCategory} />

      {/* List of dishes filtered by selected category */}
      <DishList category={category} />

      {/* Mobile app download prompt */}
      <MobileDownload />
    </div>
  );
};

export default HomePage;
