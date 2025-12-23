import "../BottomBar/BottomBar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

/**
 * BottomBar Component Description
 * ------------------
 * - Displays a fixed bottom navigation bar (mainly for mobile users)
 * - Provides quick access to logo, search, and cart
 * - Visibility is controlled by the parent via `showBar` prop
 *
 * @param {boolean} showBar - Determines whether the bottom bar is visible
 */

const BottomBar = ({ showBar }) => {
  // to navigate to certain pages
  const navigate = useNavigate();

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity (cart number)
  // TODO: will be handled from backend later
  let cartCount = 0;
  for (let item of cartItems) {
    cartCount += item.quantity;
  }

  // calculated total amount according to the price of the product
  // reduce() takes an array and turns it into a single value.
  // eg: [1, 2, 3, 4] → 10   first: all price in array -> result: total price
  // TODO: will be handled from the backend later
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    /**
     * Applies the `show` class conditionally
     * - When `showBar` is true, the bar comes
     * - When false, the bar hides
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
          <img
            onClick={() => navigate("/cart")}
            src={assets.cart_icon}
            alt="cart"
          />

          {/* Dynamic badge: total number of items */}
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>

        {/* Displays current cart total */}
        <p className="cart-total">$ {totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BottomBar;
