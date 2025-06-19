# StayFinder

A full-stack web application for property listings and bookings, featuring user authentication, property management, and a booking system. Built with a React + TypeScript + Vite frontend and a Node.js + Express + TypeScript + MongoDB backend.

---

## Project Structure

```
StayFinder-Glen/
│
├── backend/   # RESTful API (Node.js, Express, TypeScript, MongoDB)
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── index.ts
│
├── frontend/  # Web client (React, TypeScript, Vite)
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       ├── App.tsx
│       └── main.tsx
│
└── README.md  # Global project overview (this file)
```

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** dotenv, bcryptjs, cors

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### 1. Clone the repository
```bash
git clone <repo-url>
cd StayFinder-Glen
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create a .env file (see backend/README.md for details)
npm run build # or npm run dev for development
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## Usage
- The backend server will run on the port specified in your `.env` (default: 5000).
- The frontend (Vite) will run on its own dev server (default: 5173).
- Visit the frontend URL in your browser to use the app.

---

## More Information
- **Backend:** See [backend/README.md](./backend/README.md) for API endpoints, environment variables, and more.
- **Frontend:** See [frontend/README.md](./frontend/README.md) for frontend tooling and configuration.

---

## License
This project is licensed under the ISC License. 