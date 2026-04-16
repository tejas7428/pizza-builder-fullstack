# Pizza Builder Frontend

This is the frontend for the Pizza Builder application built with React and Vite.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## Features

- User authentication (login/register)
- Email verification
- Password reset
- Pizza builder with 5-step process
- Order history
- Real-time order status updates (via Socket.IO)
- Admin dashboard for inventory and order management

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context for state management
├── pages/          # Page components
├── services/       # API service functions
├── App.jsx         # Main App component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Development

The frontend is configured to proxy API requests to the backend server running on `http://localhost:5000`.

Make sure the backend server is running before starting the frontend development server.