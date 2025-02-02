# TuneFlow Web App Documentation

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Installation Guide](#installation-guide)
- [API Endpoints](#api-endpoints)
- [Frontend Structure](#frontend-structure)
- [Backend Structure](#backend-structure)

---

## Overview
This is a modern music player web application designed for real-time interaction between users. The app features user authentication, real-time chat, user activity tracking, and an admin panel for managing users and activities. 

---

## Technologies Used

### **Frontend**
- **React**: Component-based UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **TypeScript**: Static typing for JavaScript
- **Shadcn**: Component library for modern UI design

### **Backend**
- **Node.js**: Runtime for server-side applications
- **Express**: Web framework for building APIs
- **MongoDB**: NoSQL database
- **Lightning-fast Libraries**: To enhance performance

---

## Features
1. **Clerk Authentication**: Secure and scalable user authentication.
2. **Random User Chat**: Users can chat with random individuals in real time.
3. **Activity Feed**: Displays what users are currently listening to.
4. **Admin Panel**: Allows admins to manage users and monitor app activity.

---

## Project Architecture

```plaintext
Music Player Web App
|
|-- Frontend (React + Tailwind CSS + Zustand + Shadcn + TypeScript)
|     |
|     |-- Components (Re-usable React components for UI)
|     |-- Pages (Clerk authentication, activity feed, chat, admin panel)
|     |-- Zustand Store (Global state management)
|
|-- Backend (Node.js + Express)
|     |
|     |-- Routes (RESTful APIs for users, activities, chats, etc.)
|     |-- Controllers (Business logic for APIs)
|     |-- Models (MongoDB schemas)
|     |-- Middleware (Authentication and validation)
|
|-- Database (MongoDB)
      |
      |-- Collections (users, chats, activities, etc.)
```

---

## Installation Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or cloud)
- Clerk account for authentication

### Steps
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd music-player-app
   ```

2. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set Environment Variables**
   Create a `.env` file in the `backend` folder and add:
   ```env
   MONGO_URI=<Your MongoDB connection string>
   CLERK_API_KEY=<Your Clerk API key>
   JWT_SECRET=<Your JWT secret>
   ```

4. **Run the Application**
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd ../frontend
   npm start
   ```

5. **Access the Application**
   Open your browser and go to `http://localhost:3000`

---

## API Endpoints

### Authentication
- `POST /auth/login` - Login a user
- `POST /auth/register` - Register a user

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user details

### Activities
- `GET /activities` - Get all activities
- `POST /activities` - Add new activity

### Chats
- `GET /chats` - Get all chats
- `POST /chats` - Send a new message

---

## Frontend Structure

```plaintext
src/
|-- components/
|   |-- skeltons/
|   |-- ui/
|
|-- layout/
|
|-- lib/
|   |-- axios.ts
|   |-- utils.ts
|
|-- pages/
|   |-- Admin/
|   |-- album/
|   |-- Auth/
|   |-- chat/
|   |-- Home/
|   |-- NotFound.tsx
|
|-- provider/
|   |-- authProvider.tsx
|
|-- stores/
|   |-- useAuthStore.ts
|   |-- useChatStore.ts
|   |-- useMusicStore.ts
|   |-- usePlayerStore.ts
|
|-- types/
    |-- index.ts
```

---

## Backend Structure

```plaintext
server/
|-- controller/
|   |-- adminController.js
|   |-- albumController.js
|   |-- authController.js
|   |-- songController.js
|   |-- statsController.js
|   |-- userController.js
|
|-- routes/
|   |-- adminRoute.js
|   |-- albumsRoute.js
|   |-- authRoute.js
|   |-- songsRoute.js
|   |-- statsRoute.js
|   |-- userRoute.js
|
|-- models/
|-- middleware/
|-- lib/
|-- seeds/
|-- index.js
|-- .env
|-- package.json
|-- package-lock.json
```

---

Feel free to customize this documentation and make it your own!
