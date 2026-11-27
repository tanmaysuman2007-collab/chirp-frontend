import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";
import Icon from "./Icon";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || "light");
  if (!user) return null;

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const cls = ({ isActive }) => (isActive ? "nav-item active" : "nav-item");

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">C</span>
        <span className="brand-text">Chirp</span>
      </div>

      <nav className="nav">
        <NavLink to="/" end className={cls}><Icon name="home" /><span>Home</span></NavLink>
        <NavLink to={"/u/" + user.username} className={cls}><Icon name="user" /><span>Profile</span></NavLink>
        {user.role === "admin" && (
          <NavLink to="/admin" className={cls}><Icon name="shield" /><span>Admin</span></NavLink>
        )}
        <button className="nav-item" onClick={toggleTheme}>
          <Icon name={theme === "dark" ? "sun" : "moon"} />
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
      </nav>

      <div className="sidebar-user">
        <Avatar name={user.username} size={38} />
        <div className="who">
          <b>@{user.username}</b>
          <small>{user.role}</small>
        </div>
        <button className="icon-btn" title="Logout" onClick={handleLogout}>
          <Icon name="logout" />
        </button>
      </div>
    </aside>
  );
}
