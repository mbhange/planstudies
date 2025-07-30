# PlanStudies Backend Setup

## Prerequisites

1. **MySQL Server** - Make sure MySQL is installed and running
2. **Node.js** - Version 14 or higher
3. **Environment Variables** - Make sure your `.env` file is properly configured

## Quick Start

### Option 1: Automatic Setup & Start
```bash
npm run setup-and-start
```

### Option 2: Manual Setup
```bash
# 1. Set up database
npm run setup

# 2. Start server
npm start
```

## Environment Variables

Make sure your `.env` file contains:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Developer@123
DB_NAME=user_management

EMAIL_USER=support@planstudies.in
EMAIL_PASS=your-app-password

JWT_SECRET=your-jwt-secret
PORT=5000

ODOO_URL=your-odoo-url
ODOO_DB=your-odoo-db
ODOO_USERNAME=your-odoo-username
ODOO_PASSWORD=your-odoo-password

TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number
```

## API Endpoints for Testing

### Health Check
- `GET /api/health` - Check if server is running

### Database Test
- `GET /api/test-db` - Test database connection

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/forgot-password` - Request password reset
- `POST /api/reset-password` - Reset password

### Users
- `GET /api/students` - Get all students
- `GET /api/agents` - Get all agents
- `GET /api/user?email=` - Get user by email

### Courses
- `GET /api/courses/test` - Get sample course data
- `POST /api/odoo/courses` - Get courses from Odoo

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments` - Get payments (with filters)

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages?sender=&receiver=` - Get messages

### OTP
- `POST /api/send-otp` - Send email OTP
- `POST /api/verify-otp` - Verify email OTP
- `POST /api/send-mobile-otp` - Send mobile OTP
- `POST /api/verify-mobile-otp` - Verify mobile OTP

## Testing the Backend

1. **Start the server:**
   ```bash
   npm run setup-and-start
   ```

2. **Test health endpoint:**
   ```bash
   curl http://localhost:5000/api/health
   ```

3. **Test database connection:**
   ```bash
   curl http://localhost:5000/api/test-db
   ```

4. **Test user registration:**
   ```bash
   curl -X POST http://localhost:5000/api/register \
     -H "Content-Type: application/json" \
     -d '{"role":"student","fullName":"Test User","email":"test@example.com","password":"password123","phone_number":"+1234567890"}'
   ```

## Troubleshooting

### Database Connection Issues
- Check if MySQL server is running
- Verify database credentials in `.env`
- Make sure the database `user_management` exists

### Email Issues
- Use Gmail App Password instead of regular password
- Enable 2FA on Gmail account
- Generate App Password in Gmail settings

### Twilio Issues
- Verify Twilio credentials
- Check phone number format (+1234567890)
- Ensure sufficient Twilio credit

## File Structure

```
Backend/
├── server.js           # Main server file
├── setup.js           # Database setup script
├── start.js           # Auto setup and start script
├── database_schema.sql # Database schema
├── package.json       # Dependencies
├── .env              # Environment variables
├── uploads/          # File uploads directory
└── README.md         # This file
```
