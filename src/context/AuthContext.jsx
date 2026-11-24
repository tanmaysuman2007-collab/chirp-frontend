import { createContext, useContext, useState } from "react";
import { api, setTokens, clearTokens } from "../api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  const login = async (email, password) => {
    const data = await api("/auth/login", { method: "POST", body: { email, password } });
    setTokens(data.accessToken, data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (username, email, password) => {
    await api("/auth/register", { method: "POST", body: { username, email, password } });
    await login(email, password);
  };

  const logout = async () => {
    try { await api("/auth/logout", { method: "POST" }); } catch { /* ignore */ }
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
