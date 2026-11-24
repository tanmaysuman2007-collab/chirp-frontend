import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import PostCard from "../components/PostCard";

export default function Hashtag() {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    api("/hashtags/" + tag).then(setPosts).catch((e) => setError(e.message));
  }, [tag]);

  return (
    <div className="narrow">
      <h2>#{tag}</h2>
      {error && <p className="error">{error}</p>}
      {posts.length === 0 && !error && <div className="card muted">No posts with this hashtag</div>}
      {posts.map((p) => (
        <PostCard key={p._id} post={p} onDeleted={(id) => setPosts(posts.filter((x) => x._id !== id))} />
      ))}
    </div>
  );
}
