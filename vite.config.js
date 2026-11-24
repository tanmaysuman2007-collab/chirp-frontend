import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The proxy sends /api and /socket.io to the backend, so no CORS setup is needed.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
      "/socket.io": { target: "http://localhost:5000", ws: true },
    },
  },
});
