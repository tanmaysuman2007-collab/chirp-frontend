import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState("");

  const loadReplies = () => api("/posts/" + id + "/replies").then(setReplies);

  useEffect(() => {
    setError("");
    api("/posts/" + id).then(setPost).catch((e) => setError(e.message));
    loadReplies().catch(() => setReplies([]));
  }, [id]);

  const sendReply = async (text) => {
    await api("/posts/" + id + "/reply", { method: "POST", body: { text } });
    await loadReplies();
  };

  if (error) return <p className="error">{error}</p>;
  if (!post) return <p className="muted">Loading...</p>;

  return (
    <div className="narrow">
      <PostCard post={post} showReplyLink={false} onDeleted={() => navigate("/")} />
      <Composer placeholder="Write a reply..." buttonText="Reply" onSubmit={sendReply} />
      <h3>Replies ({replies.length})</h3>
      {replies.map((r) => (
        <PostCard key={r._id} post={r} showReplyLink={false}
          onDeleted={(rid) => setReplies(replies.filter((x) => x._id !== rid))} />
      ))}
    </div>
  );
}
