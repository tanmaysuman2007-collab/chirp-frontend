import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-box card">
      <h2>Join Chirp</h2>
      <form onSubmit={handleSubmit}>
        <input className="input" placeholder="Username (min 3 chars)" value={username}
          onChange={(e) => setUsername(e.target.value)} required />
        <input className="input" type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password (min 6 chars)" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn" type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
