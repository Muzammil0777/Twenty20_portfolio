# Twenty20 Assignment - Mern Stack Portfolio

A full-stack portfolio application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a complete authentication flow, protected routes, and a responsive portfolio interface.

## 🚀 Live Demo

[Insert Live Demo Link Here]

## ✨ Features

- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **Protected Routes**: Restrict access to the portfolio page for authenticated users only.
- **Responsive Design**: Built with React and Vite for a fast, mobile-friendly user experience.
- **RESTful API**: Node.js and Express backend serving data and handling authentication logic.
- **Database Integration**: MongoDB Atlas for persistent user data storage.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios, React Router Dom
- **Backend**: Node.js, Express.js, JWT, Bcryptjs, Cors
- **Database**: MongoDB Atlas

## ⚙️ Setup Instructions (Local)

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Twenty20_muz_assignment.git
cd Twenty20_muz_assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173 
# Note: Adjust FRONTEND_URL if your local frontend runs on a different port
```

Start the backend server:

```bash
npm start
# Server will run on http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or the port shown in your terminal).

## 🌍 Deployment

### Environment Variables for Vercel

#### Frontend (Vercel Project)
- `VITE_API_BASE_URL`: The URL of your deployed backend (e.g., `https://your-backend-project.vercel.app`)

#### Backend (Vercel Project)
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A strong secret key for token signing.
- `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://your-frontend-project.vercel.app`) to allow CORS.

## 📂 Project Structure

```
/
├── backend/          # Node.js/Express API
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── server.js     # Entry point
│
└── frontend/         # React application
    ├── src/
    │   ├── pages/    # Application pages
    │   └── services/ # API integration
    └── vercel.json   # Vercel configuration
```

## 🔒 Security

- Environment variables are used for sensitive keys.
- Passwords are hashed using bcrypt before storage.
- CORS is configured to allow requests only from trusted origins (configurable via env).

---
*Created for Twenty20 Assignment*
