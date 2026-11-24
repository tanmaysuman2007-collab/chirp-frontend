import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Chirp</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to={"/u/" + user.username}>Profile</Link>
        {user.role === "admin" && <Link to="/admin">Admin</Link>}
        <button className="btn btn-outline" onClick={handleLogout}>Logout ({user.username})</button>
      </div>
    </nav>
  );
}
