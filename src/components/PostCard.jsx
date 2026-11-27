import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";
import Icon from "./Icon";

// Splits text so every #hashtag becomes a clickable link.
function renderText(text) {
  return text.split(/(#\w+)/g).map((part, i) =>
    i % 2 === 1 ? (
      <Link key={i} className="hashtag" to={"/tag/" + part.slice(1).toLowerCase()}>
        {part}
      </Link>
    ) : (
      part
    )
  );
}

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return m + "m";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h";
  const d = Math.floor(h / 24);
  if (d < 7) return d + "d";
  return new Date(date).toLocaleDateString();
}

export default function PostCard({ post, onDeleted, showReplyLink = true }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || []);
  const liked = likes.includes(user.id);
  const authorName = post.author?.username || "unknown";
  const canDelete = post.author?._id === user.id || user.role === "admin";

  const toggleLike = async () => {
    try {
      const data = await api("/posts/" + post._id + "/like", { method: "POST" });
      setLikes(data.liked ? [...likes, user.id] : likes.filter((id) => id !== user.id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api("/posts/" + post._id, { method: "DELETE" });
      onDeleted && onDeleted(post._id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <article className="card post">
      <Link to={"/u/" + authorName}><Avatar name={authorName} /></Link>
      <div className="post-body">
        <div className="post-head">
          <Link to={"/u/" + authorName} className="author">@{authorName}</Link>
          <span className="time" title={new Date(post.createdAt).toLocaleString()}>
            · {timeAgo(post.createdAt)}
          </span>
        </div>
        <p className="post-text">{renderText(post.text)}</p>
        <div className="post-actions">
          <button className={liked ? "act like on" : "act like"} onClick={toggleLike}>
            <Icon name="heart" size={18} fill={liked ? "currentColor" : "none"} /> {likes.length}
          </button>
          {showReplyLink && (
            <Link to={"/post/" + post._id} className="act">
              <Icon name="message" size={18} /> Reply
            </Link>
          )}
          {canDelete && (
            <button className="act danger" title="Delete" onClick={handleDelete}>
              <Icon name="trash" size={18} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
