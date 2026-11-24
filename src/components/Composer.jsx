import { useState } from "react";

export default function Composer({ placeholder, buttonText, onSubmit }) {
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

  return (
    <div className="card composer">
      <textarea
        className="input"
        rows="3"
        maxLength={280}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="composer-row">
        <span className={text.length > 260 ? "count warn" : "count"}>{text.length}/280</span>
        <button className="btn" disabled={busy || !text.trim()} onClick={handleSubmit}>
          {buttonText}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
