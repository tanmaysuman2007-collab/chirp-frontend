import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthShell from "../components/AuthShell";

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
    <AuthShell title="Join Chirp" subtitle="Create your account in a few seconds.">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="input" placeholder="At least 3 characters" value={username}
          onChange={(e) => setUsername(e.target.value)} required />
        <label>Email</label>
        <input className="input" type="email" placeholder="you@college.edu" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input className="input" type="password" placeholder="At least 6 characters" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn wide" type="submit">Create account</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="muted center">Already have an account? <Link to="/login">Log in</Link></p>
    </AuthShell>
  );
}
