# Chirp Frontend (React + Vite)

## Run
1. Start the backend first: `npm run dev` inside chirp-backend (port 5000).
2. In this folder:
       npm install
       npm run dev
3. Open http://localhost:5173

The Vite proxy (vite.config.js) forwards /api and /socket.io to the backend,
so no CORS setup is needed.

## Build sequence
1. package.json, vite.config.js, index.html  -> npm install
2. src/api.js                                (Fetch wrapper + auto refresh on 401)
3. src/context/AuthContext.jsx               (Context API: user, login, register, logout)
4. src/components/  ProtectedRoute, Navbar, Composer, PostCard, Trending
5. src/pages/       Login, Register, Home, Profile, Hashtag, PostDetail, Admin
6. src/App.jsx      (routes)
7. src/main.jsx, src/index.css

## Pages
/login  /register  /  (feed + trending + live badge)  /u/:username  /tag/:tag  /post/:id  /admin
