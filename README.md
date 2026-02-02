# 📝 Full-Stack Todo & Focus Timer App

A modern **full-stack productivity app** built with **React, Zustand, Node.js, Express, and MongoDB**.  
Includes authentication, task management, subtasks, theme switching, and a persistent focus timer with global toast notifications.

---

### Demo

https://todolist-frontend-tmm7.onrender.com

---

## 🚀 Features

### 🔐 Authentication
- Secure login & registration
- JWT-based authentication (HTTP-only cookies)
- Persistent sessions
- Protected routes

### ✅ Task Management
- Create, update, delete tasks
- User-specific tasks (no data leakage)
- Subtasks support
- Due dates & task status
- Real-time UI updates

### ⏱ Focus Timer
- Work / Rest cycle
- Persistent even on refresh
- Global toast notification while running
- Toast dismiss without stopping timer
- Auto-cleanup on logout

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Zustand (state management)
- React Router
- Axios
- TailwindCSS
- DaisyUI
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Cookie-based auth
- bcrypt (password hashing)

### Deployment
- Frontend: Vite (`dist`)
- Backend: Render
- Database: MongoDB Atlas

---

## 📦 Environment Variables

### Backend (`.env`)
```env
PORT=8003
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND=https://your-frontend-domain.com

CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=

```

---

# 🔒 Authentication Notes (Important)

This app uses JWT stored in HTTP-only cookies.

Production cookie configuration:
```
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000
})
```
---

## CORS configuration:
```
app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true
}))
```
---

## 🧪 Local Development
### Backend
```
npm install
npm run dev
```
### Frontend
```
npm install
npm run dev
```

## 🏗 Production Build
```
npm run build
```
Deploy the dist/ folder as the publish directory.

---

# 🧠 Architecture Highlights

User data fully isolated per account

Tasks always scoped to req.user._id

Timer state persists via localStorage

UI state handled via Zustand

Logout clears sensitive client state

---

# 👋 Author

Made by Erwin
