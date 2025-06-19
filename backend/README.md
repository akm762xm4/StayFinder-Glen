# StayFinder Backend

A RESTful API for the StayFinder application, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication (register, login)
- Property listings management (CRUD operations)
- Booking system
- Role-based access control (user/host)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/stayfinder
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Build the TypeScript code:
   ```bash
   npm run build
   ```

## Development

To run the server in development mode with hot reloading:
```bash
npm run dev
```

## Production

To run the server in production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Listings
- GET /api/listings - Get all listings
- GET /api/listings/:id - Get single listing
- POST /api/listings - Create listing (host only)
- PUT /api/listings/:id - Update listing (host only)
- DELETE /api/listings/:id - Delete listing (host only)

### Bookings
- POST /api/bookings - Create booking
- GET /api/bookings - Get user bookings
- GET /api/bookings/:id - Get single booking
- PUT /api/bookings/:id - Update booking status (host only)

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "message": "Error message here"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
``` 