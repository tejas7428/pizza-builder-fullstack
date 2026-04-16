const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('Setting up environment files...');

// Function to generate a random string
function generateRandomString(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Backend .env content
const backendEnvContent = `# MongoDB
MONGO_URI=mongodb://localhost:27017/pizza-builder

# JWT
JWT_SECRET=${generateRandomString()}
JWT_REFRESH_SECRET=${generateRandomString()}

# Razorpay (get from https://dashboard.razorpay.com/)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret

# Email (SMTP - for development use Mailtrap or Gmail)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Admin Email
ADMIN_EMAIL=admin@example.com

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Server Port
PORT=5000
`;

// Frontend .env content
const frontendEnvContent = `# Razorpay (for test mode)
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_SECRET=your_razorpay_key_secret
`;

// Create backend .env if it doesn't exist
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(backendEnvPath)) {
  fs.writeFileSync(backendEnvPath, backendEnvContent);
  console.log('Created backend/.env with sample values');
  console.log('Please update the values in backend/.env with your actual credentials');
} else {
  console.log('backend/.env already exists, skipping creation');
}

// Create frontend .env if it doesn't exist
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
if (!fs.existsSync(frontendEnvPath)) {
  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log('Created frontend/.env with sample values');
  console.log('Please update the values in frontend/.env with your actual credentials');
} else {
  console.log('frontend/.env already exists, skipping creation');
}

console.log('Environment setup complete!');
console.log('Next steps:');
console.log('1. Update the .env files with your actual credentials');
console.log('2. Run "npm run init" to install dependencies');
console.log('3. Run "cd backend && npm run seed" to populate initial data');
console.log('4. Run "npm run dev" to start development servers');