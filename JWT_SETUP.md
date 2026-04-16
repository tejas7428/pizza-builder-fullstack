# JWT Setup

JSON Web Tokens (JWT) are used for authentication in this application. You need to generate secure secret keys for signing tokens.

## Generating JWT Secrets

### Option 1: Using OpenSSL (Recommended)

Generate a secure random secret using OpenSSL:

```bash
# Generate JWT secret
openssl rand -base64 32

# Generate JWT refresh secret
openssl rand -base64 32
```

### Option 2: Using Node.js

Generate secrets using Node.js crypto module:

```javascript
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this command twice to generate two different secrets.

### Option 3: Online Generator

You can use online tools like [https://www.allkeysgenerator.com/](https://www.allkeysgenerator.com/) to generate random keys.

**Note:** For production, always use secure, randomly generated secrets and keep them private.

## Adding to Environment Variables

Add the generated secrets to your backend `.env` file:

```
JWT_SECRET=your_generated_jwt_secret
JWT_REFRESH_SECRET=your_generated_jwt_refresh_secret
```

## Secret Security

- Keep your secrets private and never commit them to version control
- Use different secrets for development and production
- Rotate secrets periodically for better security
- Consider using environment-specific secrets for different deployment environments

## Token Expiry

The application uses:
- Access tokens with 15-minute expiry
- Refresh tokens with 7-day expiry

These can be adjusted in the [auth.controller.js](backend/controllers/auth.controller.js) file if needed.