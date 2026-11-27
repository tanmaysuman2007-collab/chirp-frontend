import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import Icon from "../components/Icon";
import PostCard from "../components/PostCard";
import { PostSkeleton } from "../components/Skeleton";

export default function Hashtag() {
  const { tag } = useParams();
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setPosts(null);
    api("/hashtags/" + tag).then(setPosts).catch((e) => setError(e.message));
  }, [tag]);

  return (
    <div className="narrow">
      <div className="page-head">
        <Link to="/" className="icon-btn" title="Back"><Icon name="back" /></Link>
        <h2>#{tag}</h2>
      </div>
      {error && <p className="error">{error}</p>}
      {!posts && !error && <PostSkeleton />}
      {posts && posts.length === 0 && <div className="card empty muted">No posts with this hashtag yet</div>}
      {posts && posts.map((p) => (
        <PostCard key={p._id} post={p} onDeleted={(id) => setPosts(posts.filter((x) => x._id !== id))} />
      ))}
    </div>
  );
}
