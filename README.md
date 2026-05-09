<div align="center">

# 💬 Chatty

**A real-time full-stack chat application built with the MERN stack and Socket.io**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## ✨ Features

- **Real-time messaging** — instant message delivery powered by WebSockets
- **User authentication** — secure signup, login, and logout with JWT cookies
- **Online presence** — see who's currently online with live status indicators
- **Image sharing** — send photos in conversations via Cloudinary
- **Profile customization** — upload and update your profile picture
- **32 themes** — choose from a full palette of UI themes (dark, light, synthwave, cyberpunk, and more)
- **Responsive design** — works on desktop and mobile screens
- **Redis caching** — faster API responses with cached auth, sidebar users, and conversation history

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| Socket.io | Real-time bidirectional communication |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| Cloudinary | Image upload and storage |
| cookie-parser | HTTP cookie middleware |
| Redis + ioredis | Caching and online user presence |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| Zustand | Lightweight global state management |
| Socket.io Client | WebSocket client |
| Axios | HTTP requests |
| Tailwind CSS + daisyUI | Styling and theming |
| React Router v6 | Client-side routing |
| React Hot Toast | Toast notifications |
| Lucide React | Icons |

---

## 📁 Project Structure

```
ChatApp/
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js      # signup, login, logout, profile
│       │   └── message.controller.js   # send & fetch messages, sidebar users
│       ├── lib/
│       │   ├── cloudinary.js           # Cloudinary config
│       │   ├── db.js                   # MongoDB connection
│       │   ├── redis.js                # Redis client (ioredis)
│       │   ├── socket.js               # Socket.io server + online user tracking via Redis
│       │   └── util.js                 # JWT token generation
│       ├── middleware/
│       │   └── auth.middleware.js      # Route protection via JWT
│       ├── models/
│       │   ├── user.model.js           # User schema
│       │   └── messages.model.js       # Message schema
│       ├── routes/
│       │   ├── auth.route.js           # /api/auth/*
│       │   └── message.route.js        # /api/messages/*
│       └── index.js                    # App entry point
│
└── frontend/
    └── src/
        ├── components/                 # Reusable UI components
        │   ├── ChatContainer.jsx
        │   ├── ChatHeader.jsx
        │   ├── MessageInput.jsx
        │   ├── Navbar.jsx
        │   ├── Sidebar.jsx
        │   └── skeletons/
        ├── pages/                      # Route-level pages
        │   ├── HomePage.jsx
        │   ├── LoginPage.jsx
        │   ├── SignUpPage.jsx
        │   ├── ProfilePage.jsx
        │   └── SettingsPage.jsx
        ├── store/                      # Zustand global stores
        │   ├── useAuthStore.js
        │   ├── useChatStore.js
        │   └── useThemeStore.js
        └── lib/
            └── axios.js                # Axios instance with base URL
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) — local or Atlas cluster
- [Redis](https://redis.io/) — local instance (`brew install redis` on macOS)
- [Cloudinary](https://cloudinary.com/) account — for image uploads

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatty.git
cd chatty
```

### 2. Configure the backend

```bash
cd backend
```

Create a `.env` file:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

Install dependencies and start:

```bash
npm install
npm run dev
```

### 3. Configure the frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5174` and the backend at `http://localhost:5001`.

---

## 🔌 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/signup` | — | Register a new user |
| `POST` | `/login` | — | Log in and receive JWT cookie |
| `POST` | `/logout` | ✓ | Clear auth cookie |
| `PUT` | `/update-profile` | ✓ | Upload new profile picture |
| `GET` | `/check` | ✓ | Verify current session |

### Messages — `/api/messages`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/users` | ✓ | Get all users for the sidebar |
| `GET` | `/:id` | ✓ | Get conversation with a user |
| `POST` | `/send/:id` | ✓ | Send a text or image message |

---

## ⚡ Real-time Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `connection` | Client → Server | `userId` in handshake query |
| `getOnlineUsers` | Server → All clients | `string[]` of online user IDs |
| `newMessage` | Server → Receiver | Full message object |
| `disconnect` | Client → Server | Removes user from online map |

---

## 🎨 Themes

Chatty ships with **32 built-in themes** via daisyUI. Switch between them anytime from the Settings page — your preference is saved to `localStorage`.

`light` · `dark` · `cupcake` · `bumblebee` · `emerald` · `corporate` · `synthwave` · `retro` · `cyberpunk` · `valentine` · `halloween` · `garden` · `forest` · `aqua` · `lofi` · `pastel` · `fantasy` · `wireframe` · `black` · `luxury` · `dracula` · `cmyk` · `autumn` · `business` · `acid` · `lemonade` · `night` · `coffee` · `winter` · `dim` · `nord` · `sunset`

---

## 🔐 Authentication Flow

1. User signs up → password is hashed with `bcryptjs` → JWT is issued and stored as an `httpOnly` cookie
2. Every protected request passes through `auth.middleware.js`, which verifies the token and attaches `req.user`
3. On logout, the cookie is cleared server-side
4. Socket connections authenticate by passing `userId` in the handshake query

---

## ⚡ Redis Caching Strategy

| What | Cache Key | TTL | Invalidation |
|---|---|---|---|
| Authenticated user | `user:{userId}` | 1 hour | On logout / profile update |
| Sidebar user list | `sidebar:{userId}` | 60 seconds | Auto-expires |
| Conversation messages | `messages:{id1}:{id2}` | 5 minutes | Deleted on new message |
| Online user socket | `socket:{userId}` | Session | Deleted on disconnect |
| Online users set | `onlineUsers` | Session | Updated on connect/disconnect |

---

## 📄 License

MIT — feel free to use this project however you like.
