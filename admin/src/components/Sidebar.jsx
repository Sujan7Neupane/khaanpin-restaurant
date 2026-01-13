import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets.js";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to={"/"}>
            <span>Dashboard</span>
            <img src={assets.dashboard} className="icon-img" />
          </NavLink>
        </li>
        <li>
          <NavLink to={"/add"}>
            <span>Add Dish</span>
            <img src={assets.add_icon} className="icon-img" />
          </NavLink>
        </li>

        <li>
          <NavLink to={"/add-menu"}>
            <span>Add New Menu</span>
            <img src={assets.menu_icon} className="icon-img" />
          </NavLink>
        </li>

        <li>
          <NavLink to={"/list-menu"}>
            <span>List Menu</span>
            <img src={assets.list_dish} className="icon-img" />
          </NavLink>
        </li>

        <li>
          <NavLink to={"/list"}>
            <span>List Dish</span>
            <img src={assets.list_dish} className="icon-img" />
          </NavLink>
        </li>

        <li>
          <NavLink to={"/order"}>
            <span>Orders List</span>
            <img src={assets.order_icon} className="icon-img" />
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
