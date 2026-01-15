import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="admin-header">
      <h1 className="logo">SuperAdmin</h1>

      <nav className="header-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>

      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <button className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;
