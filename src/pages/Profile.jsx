import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { username } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    api("/users/" + username).then(setData).catch((e) => setError(e.message));

  useEffect(() => { setData(null); setError(""); load(); }, [username]);

  const toggleFollow = async () => {
    try {
      await api("/users/" + data.user._id + "/follow", { method: data.isFollowing ? "DELETE" : "POST" });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="muted">Loading...</p>;

  const isMe = data.user._id === user.id;

  return (
    <div className="narrow">
      <div className="card">
        <h2>@{data.user.username}</h2>
        {data.user.bio && <p>{data.user.bio}</p>}
        <p className="muted">
          Joined {new Date(data.user.createdAt).toLocaleDateString()} |{" "}
          <b>{data.followers}</b> followers | <b>{data.following}</b> following
        </p>
        {!isMe && (
          <button className={data.isFollowing ? "btn btn-outline" : "btn"} onClick={toggleFollow}>
            {data.isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <h3>Posts</h3>
      {data.posts.length === 0 && <div className="card muted">No posts yet</div>}
      {data.posts.map((p) => (
        <PostCard key={p._id} post={p}
          onDeleted={(id) => setData({ ...data, posts: data.posts.filter((x) => x._id !== id) })} />
      ))}
    </div>
  );
}
