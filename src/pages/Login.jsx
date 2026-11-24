import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-box card">
      <h2>Login to Chirp</h2>
      <form onSubmit={handleSubmit}>
        <input className="input" type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn" type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="muted">New here? <Link to="/register">Create an account</Link></p>
    </div>
  );
}
