# Spotify Clone 🎵

A full-stack Spotify-inspired music streaming web application. Enjoy seamless music playback, playlists, albums, real-time chat, and more—all built with modern web technologies.

---

## 🚀 Features

- User authentication (OAuth & email)
- Browse and play songs & albums
- Playlist management
- Real-time chat with friends
- Responsive, modern UI
- Admin dashboard for managing content
- Animated skeleton loaders
- Audio player with playback controls

---

## 📸 Screenshots

> _Add your screenshots here_

| Home Page                            | Album Page                             | Admin Dashboard                      |
| ------------------------------------ | -------------------------------------- | ------------------------------------ |
| ![Home](frontend/public/spotify.png) | ![Album](frontend/public/albums/1.jpg) | ![Admin](frontend/public/google.png) |

---

## 🛠️ Tech Stack

**Frontend:**

- React + TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- Axios

**Backend:**

- Node.js
- Express.js
- MongoDB
- Cloudinary (media storage)
- Socket.io (real-time chat)

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB instance
- Cloudinary account (for media uploads)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/spotify-clone.git
   cd spotify-clone
   ```

2. **Install dependencies:**

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Set up environment variables:**

   - Create `.env` files in both `backend/` and `frontend/` as needed (see `.env.example` if provided).

4. **Run the backend:**

   ```bash
   cd backend
   npm start
   ```

5. **Run the frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

6. **Visit:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000) (default)

---

## 📁 Folder Structure

```
SPOTIFY-CLONE/
  backend/        # Express API, models, controllers, routes
  frontend/       # React app, components, pages, stores
```

---

## 📚 API Overview

- **Auth:** `/api/auth` – Login, register, OAuth
- **Songs:** `/api/songs` – CRUD for songs
- **Albums:** `/api/albums` – CRUD for albums
- **User:** `/api/user` – User info, playlists
- **Admin:** `/api/admin` – Admin actions
- **Chat:** `/api/chat` – Real-time messaging

> _See backend/src/routes/ for full details._

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Spotify](https://spotify.com) for inspiration
- [React](https://react.dev/), [Express](https://expressjs.com/), [MongoDB](https://mongodb.com/), [Tailwind CSS](https://tailwindcss.com/)
- All open-source contributors
