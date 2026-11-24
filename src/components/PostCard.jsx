import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

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
    <div className="card post">
      <div className="post-head">
        <Link to={"/u/" + authorName} className="author">@{authorName}</Link>
        <span className="time">{new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <p className="post-text">{renderText(post.text)}</p>
      <div className="post-actions">
        <button className={liked ? "link-btn liked" : "link-btn"} onClick={toggleLike}>
          {liked ? "♥" : "♡"} {likes.length}
        </button>
        {showReplyLink && <Link to={"/post/" + post._id} className="link-btn">Reply</Link>}
        {canDelete && <button className="link-btn danger" onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}
