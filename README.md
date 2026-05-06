# Intants School ERP - Mobile App

## Overview
React Native mobile application for
Intants School ERP system.
Built with Expo SDK 54.

## Apps Included
- **Parent App** - For parents to monitor
  their children
- **Teacher/Staff App** - For teachers
  to manage their work
- **Driver App** - For bus drivers to
  manage routes and attendance

## Tech Stack
- React Native (Expo SDK 54)
- TypeScript
- React Navigation v6
- Axios (HTTP client)
- React Query (server state)
- Zustand (local state)
- React Hook Form + Zod (validation)
- Expo Location (GPS tracking)
- Expo Notifications (push notifications)
- AsyncStorage (local storage)

## Project Structure
src/
screens/
auth/          # Login, OTP, School selector
parent/        # 13 parent screens
staff/         # 15 staff screens
driver/        # 9 driver screens
shared/        # Messages, Chat, Announcements
services/
api.ts         # Axios instance + interceptors
auth.service.ts
parent.service.ts
teacher.service.ts
driver.service.ts
notification.service.ts
stores/
authStore.ts   # User + token state
schoolStore.ts # School state
notificationStore.ts
hooks/
useAuth.ts
useParent.ts
useTeacher.ts
useDriver.ts
components/
common/        # Loading, Error, Empty states
types/
index.ts       # All TypeScript interfaces
lib/
validations.ts # Zod schemas
session.ts     # Session management
navigation/
AppNavigator.tsx # All routes

## Demo Credentials (Mock Data)
| Role | Phone | OTP |
|------|-------|-----|
| Parent | 9800000001 | 123456 |
| Parent | 9800000002 | 123456 |
| Staff + Parent | 9900000001 | 123456 |
| Driver | 9700000001 | 123456 |

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Expo Go app on phone

### Installation
```bash
git clone https://github.com/Akshayapanja/mobile-app-new
cd mobile-app-new
npm install
```

### Environment Setup
Create .env file in project root:
API_BASE_URL=https://your-api-url.com
APP_ENV=production

### Running the App
```bash
npx expo start --lan --port 8085
```

Open Expo Go on phone and enter
the exp:// URL shown in terminal.

## API Integration

### Base URL
Set in .env file:
API_BASE_URL=https://api.intants.com

### Authentication
All API calls include JWT token
automatically via axios interceptor.

Token is stored in AsyncStorage
as 'intants_token'.

School ID is sent in every request
header as 'x-school-id'.

### Token Refresh
Automatic token refresh on 401 error.
Refresh token stored as
'intants_refresh_token'.

### API Services
| Service | File | APIs |
|---------|------|------|
| Auth | auth.service.ts | 8 endpoints |
| Parent | parent.service.ts | 20 endpoints |
| Teacher | teacher.service.ts | 25 endpoints |
| Driver | driver.service.ts | 14 endpoints |

## Navigation Structure
Root Stack
Auth Stack
Login → OTPVerify → SchoolSelector
→ RoleSelect (if multiple roles)
Parent Stack
ParentTabs (Home/Children/Fees/Messages/Profile)
+ 12 additional screens
Staff Stack
StaffTabs (Home/Attendance/Homework/Messages/Profile)
+ 14 additional screens
Driver Stack
DriverTabs (Home/Route/Attendance/Profile)
+ 6 additional screens

## For Backend Team (Jayanth)

### What is Ready
- All API calls connected to correct endpoints
- JWT token management (auto attach + refresh)
- School ID sent in every request header
- Error handling with mock fallback
- Push notification service ready

### What Backend Needs to Do
1. Set API_BASE_URL in .env
2. Ensure JWT token format matches:
   Response: { token, refreshToken, user }
3. Ensure user object has:
   { id, name, phone, role, roles[], schoolId }
4. Push notifications:
   Import notification.service.ts
   Call registerForPushNotifications()
   after login

### TODO Comments
Search for "// TODO:" in codebase
for items that need real data:
- Replace hardcoded IDs with
  real IDs from user context
- Remove mock data fallbacks
- Connect real school data

### Mock Data Location
src/lib/mockData.ts - Remove when
backend is fully connected.

## Known Issues
- Push notifications require
  custom development build
  (not supported in Expo Go SDK 53+)
- GPS tracking requires location
  permission on device

## Build Instructions
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build Android APK
eas build --platform android --profile preview

# Build iOS
eas build --platform ios --profile preview
```

## GitHub Repository
https://github.com/Akshayapanja/mobile-app-new

## Contact
Akshaya - Frontend Developer
Email: akshaya.p@intants.com

