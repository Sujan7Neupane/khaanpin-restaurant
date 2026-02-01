import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/superadminSlice";
import axios from "axios";
import "./Header.css";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backend_url}/api/v1/superadmin/logout`,
        {},
        { withCredentials: true },
      );

      dispatch(logoutAction());
      navigate("/", { replace: true });
    } catch (err) {
      console.error(
        "Logout failed:",
        err.response?.data?.message || err.message,
      );
    }
  };

  return (
    <header className="admin-header">
      <h1 className="logo">SuperAdmin</h1>

      {/* MUST be before nav */}
      <input type="checkbox" id="menu-toggle" />

      <nav className="header-nav">
        <NavLink to="/dashboard" end>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/users">Users</NavLink>
      </nav>

      <label htmlFor="menu-toggle" className="menu-icon">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
