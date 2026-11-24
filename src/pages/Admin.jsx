import { useEffect, useState } from "react";
import { api } from "../api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [postId, setPostId] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api("/admin/users").then(setUsers).catch((e) => setError(e.message));
  }, []);

  const deletePost = async () => {
    setMsg("");
    setError("");
    try {
      const data = await api("/admin/posts/" + postId.trim(), { method: "DELETE" });
      setMsg(data.message);
      setPostId("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="narrow">
      <h2>Admin Panel</h2>
      <div className="card">
        <h3>Delete a post by ID</h3>
        <input className="input" placeholder="Post _id" value={postId} onChange={(e) => setPostId(e.target.value)} />
        <button className="btn" disabled={!postId.trim()} onClick={deletePost}>Delete post</button>
        {msg && <p className="ok">{msg}</p>}
        {error && <p className="error">{error}</p>}
      </div>
      <div className="card">
        <h3>All users ({users.length})</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>@{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
