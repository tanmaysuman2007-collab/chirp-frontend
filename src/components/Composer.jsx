import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

export default function Composer({ placeholder, buttonText, onSubmit }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setBusy(true);
    setError("");
    try {
      await onSubmit(text);
      setText("");
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  const left = 280 - text.length;

  return (
    <div className="card composer">
      <Avatar name={user.username} />
      <div className="composer-main">
        <textarea
          rows="3"
          maxLength={280}
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="composer-row">
          <span className={left <= 20 ? "count warn" : "count"}>{left} left</span>
          <button className="btn" disabled={busy || !text.trim()} onClick={handleSubmit}>
            {busy ? "Posting..." : buttonText}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
