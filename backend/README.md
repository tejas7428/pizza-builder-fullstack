# Pizza Builder Backend

This is the backend API for the Pizza Builder application.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example` and fill in your values

3. Run the seed script to populate initial data:
   ```
   npm run seed
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/verify-email?token=` - Verify email
- POST `/api/auth/forgot-password` - Request password reset
- POST `/api/auth/reset-password` - Reset password

### Menu
- GET `/api/menu` - Get available menu items

### Orders
- POST `/api/orders` - Create a new order
- GET `/api/orders` - Get user's orders
- GET `/api/orders/:id` - Get order by ID

### Admin
- GET `/api/admin/inventory` - Get all inventory items
- PUT `/api/admin/inventory/:id` - Update inventory item
- GET `/api/admin/orders` - Get all orders
- PUT `/api/admin/orders/:id/status` - Update order status

### Payments
- POST `/api/payments/create-order` - Create Razorpay order
- POST `/api/payments/verify-payment` - Verify payment

## Seeding Data

Run the seed script to populate the database with initial data:
```
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