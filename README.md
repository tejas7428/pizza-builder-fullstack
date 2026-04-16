# Pizza Builder - Full Stack Pizza Ordering Application

A complete full-stack pizza ordering application with React frontend, Node.js/Express backend, and MongoDB database. Features include user authentication, custom pizza builder, inventory management, real-time order tracking, and payment integration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Seeding Initial Data](#seeding-initial-data)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)

## Features

1. **Authentication & Users**
   - Two roles: admin and user
   - Registration with email verification
   - Login/logout functionality
   - Password reset flow
   - JWT access token + refresh token authentication

2. **Pizza Builder Flow**
   - 5-step pizza customization process:
     1. Choose pizza base
     2. Choose sauce
     3. Choose cheese
     4. Choose veggies (multi-select)
     5. Choose meat (optional multi-select)
   - Real-time price calculation
   - Pizza preview

3. **Order Management**
   - Order creation and history
   - Real-time order status updates
   - Payment integration with Razorpay

4. **Admin Dashboard**
   - Inventory management (CRUD operations)
   - Order status management
   - Low-stock notifications
   - Stock threshold settings

5. **Real-time Updates**
   - Socket.IO integration for live order status updates
   - Admin actions immediately reflected on user dashboard

## Tech Stack

- **Frontend**: React, Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **Real-time**: Socket.IO
- **Payments**: Razorpay
- **Email**: Nodemailer
- **Testing**: Jest, React Testing Library
- **State Management**: React Context API, Custom Hooks

## Project Structure

```
pizza-builder/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── __tests__/
│   ├── .env.example
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── README.md
├── .gitignore
├── PizzaBuilder_API.postman_collection.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration (see [Environment Variables](#environment-variables))

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

### Backend (.env)

```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email (Nodemailer)
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
ADMIN_EMAIL=admin@example.com

# Application
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`.

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend development server will start on `http://localhost:3000`.

## Seeding Initial Data

To populate the database with initial data:

```bash
cd backend
npm run seed
```

This will create:
- An admin user (admin@example.com / admin123)
- A sample user (user@example.com / user123)
- 5 pizza bases
- 5 sauces
- 5 cheeses
- 8 veggies
- 6 meats

## API Documentation

The API endpoints are documented in the Postman collection included in the project:
- [PizzaBuilder_API.postman_collection.json](PizzaBuilder_API.postman_collection.json)

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify-email?token=` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Menu Endpoints
- `GET /api/menu` - Get available menu items

### Order Endpoints
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

### Admin Endpoints
- `GET /api/admin/inventory` - Get all inventory items
- `POST /api/admin/inventory` - Add new inventory item
- `PUT /api/admin/inventory/:id` - Update inventory item
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

### Payment Endpoints
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment

1. Set environment variables on your deployment platform
2. Run the seed script to populate initial data
3. Start the server with `npm start`

### Frontend Deployment

1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting platform

### Production Environment Variables

For production deployment, make sure to:
1. Use strong secret keys for JWT
2. Use production MongoDB connection string
3. Configure proper SMTP settings for email
4. Use live Razorpay keys instead of test keys
5. Set proper CORS origins

## Additional Notes

- The application uses HttpOnly cookies for secure JWT storage
- Passwords are hashed using bcrypt
- Email verification is required before users can place orders
- Inventory updates are atomic to prevent race conditions
- Real-time updates are implemented using Socket.IO
- The frontend is built with Vite for fast development and optimized production builds

## Support

For issues and feature requests, please create an issue in the repository.