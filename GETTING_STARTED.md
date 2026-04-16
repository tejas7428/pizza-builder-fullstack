# Getting Started with Pizza Builder

This guide will help you set up and run the Pizza Builder application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (comes with Node.js) or yarn
- MongoDB (local instance or MongoDB Atlas account)

## Quick Start

Follow these steps to get the application running quickly:

### 1. Install Dependencies

```bash
# Install root dependencies (concurrently for running both servers)
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install:all
```

### 2. Configure Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Then edit the `.env` file with your configuration:
```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret_key

# Razorpay (get from https://razorpay.com)
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

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:

```bash
cd frontend
cp .env.example .env
```

Then edit the `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 3. Seed Initial Data

Populate the database with initial data including:
- Admin user (admin@example.com / admin123)
- Sample user (user@example.com / user123)
- Pizza bases, sauces, cheeses, veggies, and meats

```bash
cd backend
npm run seed
```

### 4. Run the Application

#### Option 1: Run Both Servers Concurrently (Recommended)
```bash
# From the root directory
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000) servers simultaneously.

#### Option 2: Run Servers Separately

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 5. Access the Application

Once both servers are running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing the Application

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

## API Testing

### Using Postman
Import the provided Postman collection:
- File: `PizzaBuilder_API.postman_collection.json`

### Using CURL
Refer to the CURL commands documentation:
- File: `API_CURL_COMMANDS.md`

## Project Structure

```
pizza-builder/
├── backend/           # Node.js/Express server
│   ├── controllers/   # Request handlers
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   ├── config/       # Configuration files
│   ├── __tests__/    # Backend tests
│   ├── .env          # Environment variables
│   ├── server.js     # Entry point
│   └── seed.js       # Data seeding script
├── frontend/          # React/Vite frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context providers
│   │   ├── hooks/      # Custom React hooks
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service functions
│   │   └── App.jsx     # Main App component
│   ├── public/         # Static assets
│   ├── .env            # Frontend environment variables
│   └── vite.config.js  # Vite configuration
├── README.md          # Main documentation
└── package.json       # Root package with convenience scripts
```

## Common Issues and Solutions

### Port Conflicts
If you see "port already in use" errors:
1. Check if other applications are using ports 3000 or 5000
2. Kill the processes or change the ports in the configuration files

### Database Connection Issues
Ensure your MongoDB connection string is correct:
- For local MongoDB: `mongodb://localhost:27017/pizza-builder`
- For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/pizza-builder`

### Environment Variables Not Loading
Make sure:
1. Your `.env` files are in the correct directories
2. Variable names match exactly (case-sensitive)
3. No spaces around the `=` sign

## Next Steps

1. **Explore the Admin Dashboard**
   - Login with admin credentials (admin@example.com / admin123)
   - Manage inventory items
   - Update order statuses

2. **Test User Features**
   - Register a new user account
   - Verify your email
   - Build and order a custom pizza

3. **Customize the Application**
   - Add new pizza components
   - Modify pricing
   - Extend functionality

4. **Deploy to Production**
   - Set up proper environment variables
   - Use production MongoDB instance
   - Configure real email service
   - Use live Razorpay keys

## Support

For issues and feature requests, please:
1. Check the existing documentation
2. Review the code comments
3. Create an issue in the repository if needed

Happy coding and enjoy your Pizza Builder application!