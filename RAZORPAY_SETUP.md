# Razorpay Test Setup

To use the Razorpay integration in test mode, you'll need to obtain test keys from Razorpay.

## Getting Test Keys

1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in to your account
3. Navigate to "Settings" → "API Keys"
4. Click "Generate Test Key"
5. Copy the Key ID and Key Secret

## Using Test Keys

1. Add the keys to your backend `.env` file:
   ```
   RAZORPAY_KEY_ID=your_test_key_id
   RAZORPAY_KEY_SECRET=your_test_key_secret
   ```

2. Add the Key ID to your frontend `.env` file:
   ```
   VITE_RAZORPAY_KEY_ID=your_test_key_id
   ```

## Test Cards

For testing payments, use these test card details:

- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: 123
- Name: Any name
- Country: Any country

When prompted for OTP, enter `123456` to simulate a successful payment.

## Webhook Testing

To test webhooks locally, you can use tools like:
- ngrok to expose your localhost
- Razorpay's webhook tester in the dashboard

For more information, refer to the [Razorpay Test Mode Documentation](https://razorpay.com/docs/payments/payments/test-card-upi-details/).