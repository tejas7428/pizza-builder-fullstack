# Email Testing Setup

For development and testing, you can use services like Mailtrap or Gmail SMTP to test email functionality.

## Option 1: Mailtrap (Recommended for Development)

1. Visit [Mailtrap](https://mailtrap.io/)
2. Sign up for a free account
3. Create a new inbox
4. Get your SMTP credentials:
   - Host: smtp.mailtrap.io
   - Port: 2525 (or 587, 465)
   - Username: Your Mailtrap username
   - Password: Your Mailtrap password

5. Add to your backend `.env` file:
   ```
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your_mailtrap_username
   SMTP_PASS=your_mailtrap_password
   ADMIN_EMAIL=your_admin_email@example.com
   ```

## Option 2: Gmail SMTP

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to your Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"

3. Add to your backend `.env` file:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ADMIN_EMAIL=your_admin_email@gmail.com
   ```

## Testing Email Functionality

Once configured, you can test:
- Email verification during registration
- Password reset emails
- Low stock notifications to admin

## Production Setup

For production, replace the SMTP settings with your production email service credentials (e.g., SendGrid, AWS SES, etc.).