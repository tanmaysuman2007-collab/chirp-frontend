import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Trending({ refreshKey }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api("/hashtags/trending").then(setTags).catch(() => setTags([]));
  }, [refreshKey]);

  return (
    <div className="card">
      <h3>Trending (24h)</h3>
      {tags.length === 0 && <p className="muted">No hashtags yet</p>}
      {tags.map((t, i) => (
        <div key={t.tag} className="trend-row">
          <Link className="hashtag" to={"/tag/" + t.tag}>{i + 1}. #{t.tag}</Link>
          <span className="muted">{t.count} {t.count === 1 ? "post" : "posts"}</span>
        </div>
      ))}
    </div>
  );
}
