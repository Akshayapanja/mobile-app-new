# Handover Notes for Jayanth

## What Akshaya Built
Complete React Native frontend for
Intants School ERP mobile application.

## Apps Built
1. Parent App (13 screens)
2. Teacher/Staff App (15 screens)
3. Driver App (9 screens)
4. Shared screens (3 screens)
5. Auth screens (5 screens)

Total: 45 screens

## How to Connect Backend

### Step 1: Update .env
Change API_BASE_URL to your
backend URL:
API_BASE_URL=https://your-backend-url.com

### Step 2: Check Response Formats
Auth login response should return:
{
  token: string,
  refreshToken: string,
  user: {
    id: string,
    name: string,
    phone: string,
    role: 'parent' | 'teacher' | 'driver',
    roles: string[],
    schoolId: string,
    email?: string,
    employeeId?: string,
    designation?: string,
  }
}

Schools list response:
{
  data: [
    {
      id: string,
      name: string,
      address: string,
      shortName?: string,
    }
  ]
}

### Step 3: Remove Mock Data
After backend is connected:
1. Remove src/lib/mockData.ts
2. Remove mock fallbacks in screens
3. Search "// TODO: Remove when
   backend connected" for all locations

### Step 4: Enable Push Notifications
In App.tsx add:
import { notificationService }
  from './src/services/notification.service';

In useEffect after login:
notificationService
  .registerForPushNotifications();

### Step 5: GPS Tracking
Driver GPS tracking is in:
src/screens/driver/GPSTracking.tsx

It calls:
POST /api/v1/transport/gps-update/:vehicleId
Every 30 seconds automatically.

Requires location permission
from user on first launch.

## API Endpoints Used

### Auth (8 endpoints)
POST /api/v1/auth/send-otp
POST /api/v1/auth/verify-otp
POST /api/v1/auth/school/select
GET /api/v1/auth/me
GET /api/v1/auth/me/permissions
POST /api/v1/auth/switch-role
POST /api/v1/auth/logout
POST /api/v1/auth/token/refresh

### Parent (20 endpoints)
GET /api/v1/dashboard/parent
GET /api/v1/students
GET /api/v1/students/:id
GET /api/v1/attendance
GET /api/v1/attendance/stats
GET /api/v1/academics/timetable/section/:id
GET /api/v1/homework/section/:id
POST /api/v1/homework/submit
GET /api/v1/marks/student/:id
GET /api/v1/exams
GET /api/v1/fee-invoices/student/:id
GET /api/v1/fee-payments
POST /api/v1/leaves/apply
GET /api/v1/communication/announcements
GET /api/v1/communication/conversations
POST /api/v1/communication/conversations
GET /api/v1/communication/conversations/:id/messages
POST /api/v1/communication/conversations/:id/messages
GET /api/v1/communication/notifications/inbox
GET /api/v1/academics/calendar
GET /api/v1/transport/live-tracking
GET /api/v1/exams/report-cards/student/:id
POST /api/v1/certificates/request

### Teacher (25 endpoints)
GET /api/v1/dashboard/teacher
GET /api/v1/attendance
POST /api/v1/attendance/mark
GET /api/v1/homework/section/:id
POST /api/v1/homework
PATCH /api/v1/homework/:id
DELETE /api/v1/homework/:id
GET /api/v1/homework/submissions/:id
PATCH /api/v1/homework/submission/:id/grade
GET /api/v1/students
GET /api/v1/marks
POST /api/v1/marks/bulk
POST /api/v1/marks/lock
GET /api/v1/marks/class-analysis
GET /api/v1/timetable/teacher/:id
GET /api/v1/communication/announcements
POST /api/v1/communication/announcements
GET /api/v1/communication/conversations
POST /api/v1/communication/conversations/:id/messages
GET /api/v1/communication/notifications/inbox
POST /api/v1/leaves/apply
GET /api/v1/leaves/applications
GET /api/v1/payroll/payslips
GET /api/v1/academics/calendar
POST /api/v1/ai-chat/ask

### Driver (14 endpoints)
GET /api/v1/auth/me
GET /api/v1/transport/routes
GET /api/v1/transport/vehicles
GET /api/v1/transport/students
GET /api/v1/transport/attendance
POST /api/v1/transport/attendance
POST /api/v1/transport/attendance/bulk
POST /api/v1/transport/gps-update/:id
GET /api/v1/transport/live-tracking
GET /api/v1/transport/stats
GET /api/v1/transport/compliance-alerts
GET /api/v1/transport/ping
GET /api/v1/communication/notifications/inbox
GET /api/v1/attendance/stats

## Files to Check
- src/services/ - All API calls
- src/stores/ - Global state
- src/hooks/ - React Query hooks
- src/types/ - TypeScript interfaces
- src/lib/validations.ts - Form schemas
- src/navigation/AppNavigator.tsx - Routes
- notification.service.ts - Push notifications

## Environment Variables
API_BASE_URL - Backend API URL
APP_ENV - 'production' or 'development'

