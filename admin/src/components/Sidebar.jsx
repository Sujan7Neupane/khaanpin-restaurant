import "../styles/Sidebar.css";
import { assets } from "../assets/admin_assets/assets.js";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <span>Add Dish</span>
          <img src={assets.add_icon} className="icon-img" />
        </li>

        <li>
          <span>List Dish</span>
          <img src={assets.list_dish} className="icon-img" />
        </li>

        <li>
          <span>Orders List</span>
          <img src={assets.order_icon} className="icon-img" />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
