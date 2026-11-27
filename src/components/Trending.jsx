import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import Icon from "./Icon";

export default function Trending({ refreshKey }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api("/hashtags/trending").then(setTags).catch(() => setTags([]));
  }, [refreshKey]);

  return (
    <div className="card trending">
      <h3><Icon name="trend" size={18} /> Trending (24h)</h3>
      {tags.length === 0 && <p className="muted">No hashtags yet. Try posting with a #tag.</p>}
      {tags.map((t, i) => (
        <Link key={t.tag} to={"/tag/" + t.tag} className="trend-row">
          <span className="rank">{i + 1}</span>
          <span className="trend-tag">#{t.tag}</span>
          <span className="muted">{t.count} {t.count === 1 ? "post" : "posts"}</span>
        </Link>
      ))}
    </div>
  );
}
