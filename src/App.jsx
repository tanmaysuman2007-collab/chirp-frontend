import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { AdminRoute, ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Hashtag from "./pages/Hashtag";
import PostDetail from "./pages/PostDetail";
import Admin from "./pages/Admin";

export default function App() {
  const { user } = useAuth();

  const routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/u/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/tag/:tag" element={<ProtectedRoute><Hashtag /></ProtectedRoute>} />
      <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  if (!user) return routes;

  return (
    <div className="shell">
      <Navbar />
      <div className="content">{routes}</div>
    </div>
  );
}
