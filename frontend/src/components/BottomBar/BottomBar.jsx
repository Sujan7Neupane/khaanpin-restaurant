import "../BottomBar/BottomBar.css";
import { assets } from "../../assets/frontend_assets/assets";

/**
 * BottomBar Component
 * ------------------
 * - Displays a fixed bottom navigation bar (mainly for mobile users)
 * - Provides quick access to logo, search, and cart
 * - Visibility is controlled by the parent via `showBar` prop
 *
 * @param {boolean} showBar - Determines whether the bottom bar is visible
 */
const BottomBar = ({ showBar }) => {
  return (
    /**
     * Applies the `show` class conditionally
     * - When `showBar` is true, the bar slides into view
     * - When false, the bar remains hidden
     */

    <div className={`bottom-bar ${showBar ? "show" : ""}`}>
      {/* Left Section: Mini logo for brand visibility */}
      <div className="bottom-left">
        <img src={assets.logo_mini} alt="logo" />
      </div>

      {/* Middle Section: Search input for quick dish lookup */}
      <div className="bottom-center">
        <img src={assets.search_icon} alt="search" />
        <input
          type="text"
          placeholder="Search dishes..."
          className="bottom-search-input"
        />
      </div>

      {/* Right Section: Cart icon with item count and total price */}
      <div className="bottom-right">
        <div className="cart-icon">
          <img src={assets.cart_icon} alt="cart" />
          <span className="cart-badge">0</span>
        </div>

        {/* Displays current cart total */}
        <p className="cart-total">$0.00</p>
      </div>
    </div>
  );
};

export default BottomBar;
