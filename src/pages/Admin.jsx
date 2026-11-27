import { useEffect, useState } from "react";
import { api } from "../api";
import Avatar from "../components/Avatar";

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

  const admins = users.filter((u) => u.role === "admin").length;

  return (
    <div className="narrow">
      <div className="page-head"><h2>Admin Panel</h2></div>

      <div className="stat-grid">
        <div className="card stat"><b>{users.length}</b><span className="muted">Total users</span></div>
        <div className="card stat"><b>{admins}</b><span className="muted">Admins</span></div>
        <div className="card stat"><b>{users.length - admins}</b><span className="muted">Members</span></div>
      </div>

      <div className="card">
        <h3>Delete a post by ID</h3>
        <input className="input" placeholder="Paste the post _id" value={postId}
          onChange={(e) => setPostId(e.target.value)} />
        <button className="btn" disabled={!postId.trim()} onClick={deletePost}>Delete post</button>
        {msg && <p className="ok">{msg}</p>}
        {error && <p className="error">{error}</p>}
      </div>

      <div className="card">
        <h3>All users</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td><span className="user-cell"><Avatar name={u.username} size={28} />@{u.username}</span></td>
                  <td>{u.email}</td>
                  <td><span className={u.role === "admin" ? "pill pill-admin" : "pill"}>{u.role}</span></td>
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
