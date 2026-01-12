import "../BottomBar/BottomBar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../../store/cartSlice";

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
  const { cartData, totalPrice } = useSelector((state) => state.cart);
  // console.log(totalPrice);

  // to set total cart items with quantity
  const totalQuantity = useSelector(selectTotalQuantity);

  // console.log(cartData);

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
          {/* TODO: add cart count */}
          {totalQuantity > 0 && (
            <span className="cart-badge">{totalQuantity}</span>
          )}
        </div>

        {/* Displays current cart total */}
        <p className="cart-total">$ {(totalPrice || 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BottomBar;
