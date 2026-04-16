# Pizza Builder API - CURL Commands

A collection of curl commands to test the Pizza Builder API endpoints.

## Authentication

### Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Logout User
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Cookie: refreshToken=YOUR_REFRESH_TOKEN"
```

### Verify Email
```bash
curl -X GET "http://localhost:5000/api/auth/verify-email?token=YOUR_VERIFICATION_TOKEN"
```

### Forgot Password
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

### Reset Password
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_RESET_TOKEN",
    "password": "newpassword123"
  }'
```

## Menu

### Get Menu Items
```bash
curl -X GET http://localhost:5000/api/menu \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Orders

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "items": [
      {
        "category": "base",
        "name": "Thin Crust",
        "quantity": 1,
        "price": 10
      }
    ],
    "total": 10
  }'
```

### Get User Orders
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Get Order by ID
```bash
curl -X GET http://localhost:5000/api/orders/ORDER_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Admin Operations

### Get Inventory
```bash
curl -X GET http://localhost:5000/api/admin/inventory \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Add New Inventory Item
```bash
curl -X POST http://localhost:5000/api/admin/inventory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "category": "base",
    "name": "New Base",
    "price": 5,
    "stock": 100,
    "threshold": 10
  }'
```

### Update Inventory Item
```bash
curl -X PUT http://localhost:5000/api/admin/inventory/INVENTORY_ITEM_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "stock": 50,
    "threshold": 5
  }'
```

### Get All Orders
```bash
curl -X GET http://localhost:5000/api/admin/orders \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Order Status
```bash
curl -X PUT http://localhost:5000/api/admin/orders/ORDER_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "status": "In Kitchen"
  }'
```

## Payments

### Create Razorpay Order
```bash
curl -X POST http://localhost:5000/api/payments/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "amount": 1000,
    "currency": "INR"
  }'
```

### Verify Payment
```bash
curl -X POST http://localhost:5000/api/payments/verify-payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "razorpay_order_id": "order_xxx",
    "razorpay_payment_id": "pay_xxx",
    "razorpay_signature": "signature_xxx"
  }'
```

## Notes

1. Replace `YOUR_ACCESS_TOKEN` with a valid JWT access token obtained after login
2. Replace `YOUR_REFRESH_TOKEN` with the refresh token from the login response
3. Replace `YOUR_VERIFICATION_TOKEN` with the email verification token
4. Replace `YOUR_RESET_TOKEN` with the password reset token
5. Replace `ORDER_ID` with an actual order ID
6. Replace `INVENTORY_ITEM_ID` with an actual inventory item ID
7. Make sure the backend server is running on `http://localhost:5000`