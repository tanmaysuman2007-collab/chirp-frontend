import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { api, getAccess } from "../api";
import { useAuth } from "../context/AuthContext";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";
import Trending from "../components/Trending";
import { PostSkeleton } from "../components/Skeleton";

const LIMIT = 10;

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const [trendKey, setTrendKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const followingRef = useRef(new Set());

  const loadFeed = async (p = 1) => {
    try {
      const data = await api("/feed?page=" + p + "&limit=" + LIMIT);
      followingRef.current = new Set(data.following.map(String));
      setPosts((old) => (p === 1 ? data.posts : [...old, ...data.posts]));
      setHasMore(data.posts.length === LIMIT);
      setPage(p);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => { loadFeed(1); }, []);

  // Socket.IO: live "new posts" badge
  useEffect(() => {
    const socket = io({ auth: { token: getAccess() } });
    socket.on("post:new", ({ authorId }) => {
      if (authorId !== user.id && followingRef.current.has(String(authorId))) {
        setNewCount((n) => n + 1);
      }
    });
    return () => socket.disconnect();
  }, [user.id]);

  const createPost = async (text) => {
    await api("/posts", { method: "POST", body: { text } });
    await loadFeed(1);
    setTrendKey((k) => k + 1);
  };

  const showNew = () => {
    setNewCount(0);
    loadFeed(1);
    setTrendKey((k) => k + 1);
  };

  return (
    <div className="layout">
      <main>
        <div className="page-head"><h2>Home</h2></div>
        <Composer placeholder="What is happening? Use #hashtags" buttonText="Chirp" onSubmit={createPost} />
        {newCount > 0 && (
          <button className="new-badge" onClick={showNew}>
            {newCount} new {newCount === 1 ? "post" : "posts"} - click to refresh
          </button>
        )}
        {error && <p className="error">{error}</p>}
        {loading && [1, 2, 3].map((n) => <PostSkeleton key={n} />)}
        {!loading && posts.length === 0 && !error && (
          <div className="card empty">
            <h3>Your feed is empty</h3>
            <p className="muted">Post something, or follow other users to see their posts here.</p>
          </div>
        )}
        {posts.map((p) => (
          <PostCard key={p._id} post={p}
            onDeleted={(id) => setPosts((old) => old.filter((x) => x._id !== id))} />
        ))}
        {hasMore && (
          <button className="btn btn-outline wide" onClick={() => loadFeed(page + 1)}>Load more</button>
        )}
      </main>
      <aside>
        <Trending refreshKey={trendKey} />
      </aside>
    </div>
  );
}
