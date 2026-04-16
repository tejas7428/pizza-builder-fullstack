# Project Structure

This document explains the organization of the Pizza Builder application.

## Root Directory

```
pizza-builder/
├── backend/              # Backend API (Node.js + Express)
├── frontend/             # Frontend application (React + Vite)
├── .gitignore            # Git ignore file
├── package.json          # Root package.json with utility scripts
├── README.md             # Main project documentation
├── RAZORPAY_SETUP.md     # Razorpay setup instructions
├── EMAIL_SETUP.md        # Email setup instructions
├── MONGODB_SETUP.md      # MongoDB setup instructions
├── JWT_SETUP.md          # JWT setup instructions
├── PROJECT_STRUCTURE.md  # This file
├── API_CURL_COMMANDS.md  # API curl commands
├── PIZZA_BUILDER_API.postman_collection.json  # Postman collection
├── init-project.js       # Script to initialize project
├── start-dev.js          # Script to start development servers
└── run-tests.js          # Script to run tests
```

## Backend Directory

```
backend/
├── config/               # Configuration files
│   └── db.js            # Database connection
├── controllers/         # Request handlers
│   ├── auth.controller.js
│   ├── menu.controller.js
│   ├── order.controller.js
│   ├── admin.controller.js
│   └── payment.controller.js
├── middleware/          # Custom middleware
│   ├── auth.js          # Authentication middleware
│   └── errorHandler.js  # Error handling middleware
├── models/              # Mongoose models
│   ├── User.js
│   ├── InventoryItem.js
│   ├── Order.js
│   └── RazorpayOrderLog.js
├── routes/              # API routes
│   ├── auth.routes.js
│   ├── menu.routes.js
│   ├── order.routes.js
│   ├── admin.routes.js
│   └── payment.routes.js
├── __tests__/           # Test files
│   ├── auth.controller.test.js
│   └── order.controller.test.js
├── .env.example         # Environment variables example
├── package.json         # Backend dependencies
├── server.js            # Main server file
├── seed.js              # Database seeding script
├── README.md            # Backend documentation
└── jest.config.js       # Jest configuration
```

## Frontend Directory

```
frontend/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Reusable components
│   │   ├── Header.jsx
│   │   └── ...
│   ├── context/         # React context providers
│   │   ├── AuthContext.jsx
│   │   └── SocketContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── PizzaBuilder.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── OrderHistory.jsx
│   │   ├── AdminInventory.jsx
│   │   ├── AdminOrders.jsx
│   │   ├── VerifyEmail.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── services/        # API service functions
│   │   └── api.js
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   └── styles.css       # Component styles
├── .env.example         # Environment variables example
├── index.html           # HTML template
├── package.json         # Frontend dependencies
├── README.md            # Frontend documentation
├── vite.config.js       # Vite configuration
└── .gitignore           # Git ignore file
```

## Key Design Principles

1. **Separation of Concerns**: Backend and frontend are completely separate
2. **Modular Architecture**: Code is organized by feature/functionality
3. **RESTful API**: Backend follows REST principles
4. **Component-Based UI**: Frontend uses React components
5. **Environment Configuration**: Uses .env files for configuration
6. **Testing**: Includes unit tests for critical backend functionality
7. **Documentation**: Comprehensive documentation in Markdown files

## Development Workflow

1. **Backend First**: API is developed and tested first
2. **Frontend Integration**: React components consume the API
3. **Testing**: Both unit tests and manual testing
4. **Documentation**: Keeping documentation updated with changes

## Deployment Considerations

1. **Backend**: Can be deployed to any Node.js hosting platform
2. **Frontend**: Can be built and deployed as static files
3. **Database**: MongoDB can be hosted on Atlas or self-hosted
4. **Environment Variables**: Need to be configured for each environment