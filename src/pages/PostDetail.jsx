import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import Composer from "../components/Composer";
import Icon from "../components/Icon";
import PostCard from "../components/PostCard";
import { PostSkeleton } from "../components/Skeleton";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState("");

  const loadReplies = () => api("/posts/" + id + "/replies").then(setReplies);

  useEffect(() => {
    setError("");
    setPost(null);
    api("/posts/" + id).then(setPost).catch((e) => setError(e.message));
    loadReplies().catch(() => setReplies([]));
  }, [id]);

  const sendReply = async (text) => {
    await api("/posts/" + id + "/reply", { method: "POST", body: { text } });
    await loadReplies();
  };

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="narrow">
      <div className="page-head">
        <Link to="/" className="icon-btn" title="Back"><Icon name="back" /></Link>
        <h2>Post</h2>
      </div>
      {!post ? <PostSkeleton /> : (
        <PostCard post={post} showReplyLink={false} onDeleted={() => navigate("/")} />
      )}
      <Composer placeholder="Write a reply..." buttonText="Reply" onSubmit={sendReply} />
      <h3 className="section-title">Replies ({replies.length})</h3>
      {replies.length === 0 && <div className="card empty muted">No replies yet. Be the first.</div>}
      {replies.map((r) => (
        <PostCard key={r._id} post={r} showReplyLink={false}
          onDeleted={(rid) => setReplies(replies.filter((x) => x._id !== rid))} />
      ))}
    </div>
  );
}
