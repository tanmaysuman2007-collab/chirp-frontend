// Fetch API wrapper. Adds the access token and retries once using the refresh token on a 401.
export const getAccess = () => localStorage.getItem("accessToken");
const getRefresh = () => localStorage.getItem("refreshToken");

export const setTokens = (access, refresh) => {
  if (access) localStorage.setItem("accessToken", access);
  if (refresh) localStorage.setItem("refreshToken", refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export async function api(path, { method = "GET", body } = {}) {
  const send = () =>
    fetch("/api" + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(getAccess() ? { Authorization: "Bearer " + getAccess() } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

  let res = await send();

  if (res.status === 401 && getRefresh() && !path.startsWith("/auth/")) {
    const r = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: getRefresh() }),
    });
    if (r.ok) {
      const d = await r.json();
      setTokens(d.accessToken);
      res = await send();
    } else {
      clearTokens();
      window.location.href = "/login";
    }
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
