import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthShell from "../components/AuthShell";

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
    <AuthShell title="Welcome back" subtitle="Log in to see what your campus is talking about.">
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="input" type="email" placeholder="you@college.edu" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input className="input" type="password" placeholder="Your password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn wide" type="submit">Log in</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="muted center">New here? <Link to="/register">Create an account</Link></p>
    </AuthShell>
  );
}
