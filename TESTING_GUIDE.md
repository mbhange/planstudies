# PlanStudies Testing Guide

## 📋 Database User Credentials

| Email | Role | Password | Status |
|-------|------|----------|--------|
| `admin@planstudies.com` | admin | `admin123` | ✅ Active |
| `student@gmail.com` | student | `student123` | ✅ Active |
| `agent@gmail.com` | agent | `agent123` | ✅ Active |
| `test@example.com` | student | `test123` | ✅ Active (for chat testing) |

## 🔍 Why Admin Emails Are Hardcoded

The admin emails are hardcoded in frontend files because:

1. **Chat Routing**: The chat system needs to know which admin to connect students to
2. **Regional Admins**: Different regions have different admin emails:
   - `admin@planstudies.com` (main admin)
   - `usadmin@gmail.com` (US admin)
   - `europe@gmail.com` (Europe admin)
   - `canada@gmail.com` (Canada admin)
   - `uk@gmail.com` (UK admin)
   - `aus@gmail.com` (Australia admin)
3. **Message Styling**: Used to determine if messages are from admin (green) or student (blue)
4. **Default Connection**: Students always chat with `admin@planstudies.com` by default

### Files with Hardcoded Admin Emails:
- `src/components/StudentDsh.jsx` (line 354, 488)
- `src/components/AgentDashboard.jsx` (line 323, 385)
- `src/pages/SubAdminUS.jsx` (line 527)
- `src/pages/SubAdminEurope.jsx` (line 515)
- `src/pages/SubAdminCanada.jsx` (line 515)
- `src/pages/SubAdminUK.jsx` (line 515)
- `src/pages/SubAdminAusNZ.jsx` (line 515)

## 🎯 How to Test Chat Functionality

### Option 1: Test with Existing Messages
1. **Login as student**: `test@example.com` / `test123`
2. **Click notification bell** to open chat
3. **View existing messages** (already exist in database):
   - Admin message: "Hello from admin to test@example.com"
   - Student reply: "Hello from student to admin"
4. **Send new messages** - they go to `admin@planstudies.com`
5. **Login as admin**: `admin@planstudies.com` / `admin123` 
6. **Reply to student messages**

### Option 2: Test with Any Student
1. **Login as any student** (e.g., `student@gmail.com` / `student123`)
2. **Send a message to admin** via chat
3. **Login as admin** and reply
4. **Switch back to student** to see admin's reply

## 🔧 Backend API Testing

### Get Messages
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/messages?sender=test@example.com&receiver=admin@planstudies.com" -Method GET

# Expected: Returns all messages between the two users (bidirectional)
```

### Send Message
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/messages" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"sender_email":"admin@planstudies.com","receiver_email":"test@example.com","message":"Test message"}'
```

### Login Test
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"test@example.com","password":"test123"}'
```

## 🐛 Debug Logs Added

I've added extensive debug logging to `StudentDsh.jsx`:
- API call URLs and parameters
- Message fetching responses
- Message filtering logic
- Admin message detection
- Message display decisions

Open browser console (F12) when testing to see detailed logs.

## ✅ What's Working

- ✅ Backend API endpoints
- ✅ Message storage and retrieval
- ✅ User authentication
- ✅ Bidirectional message filtering
- ✅ Admin email detection for styling
- ✅ File upload support
- ✅ Notification counts
- ✅ Message read/unread status

## 🚀 Next Steps

1. **Login** with the credentials above
2. **Test chat functionality** between student and admin
3. **Check console logs** for any issues
4. **Verify file uploads** work in messages
5. **Test notification badges** update correctly

## 📁 Key Files Modified

- `Backend/setup_test_users.js` - Script to set real passwords
- `src/components/StudentDsh.jsx` - Added debug logging
- Message APIs working correctly in `Backend/server.js`

## 🔒 Security Note

These are test credentials for development only. In production:
- Use strong passwords
- Implement proper password policies
- Use environment variables for sensitive data
- Implement rate limiting and other security measures
