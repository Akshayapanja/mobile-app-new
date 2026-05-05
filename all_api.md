# 📡 Complete API Documentation - Intants ERP

**Total APIs: 403**
**Previously Documented: 0**
**New APIs: 403**

Generated: 30/4/2026, 4:16:34 pm

---

## 🆕 NEW APIS (403 APIs)

> **Note for Mobile Team:** These APIs were not in the previous documentation. Check the "Mobile Apps" column to see which apps can use each API.

### ACADEMICS - 35 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/academics/calendar` | - | - |
| POST | `/api/v1/academics/calendar` | - | - |
| DELETE | `/api/v1/academics/calendar/:id` | - | - |
| GET | `/api/v1/academics/class-subjects` | - | - |
| POST | `/api/v1/academics/class-subjects` | - | - |
| PATCH | `/api/v1/academics/class-subjects/:id` | - | - |
| DELETE | `/api/v1/academics/class-subjects/:id` | - | - |
| GET | `/api/v1/academics/classes` | - | - |
| POST | `/api/v1/academics/classes` | - | - |
| PATCH | `/api/v1/academics/classes/:id` | - | - |
| DELETE | `/api/v1/academics/classes/:id` | - | - |
| POST | `/api/v1/academics/classes/bulk` | - | - |
| GET | `/api/v1/academics/grading` | - | - |
| POST | `/api/v1/academics/grading` | - | - |
| PATCH | `/api/v1/academics/grading/:id` | - | - |
| GET | `/api/v1/academics/sections` | - | - |
| POST | `/api/v1/academics/sections` | - | - |
| PATCH | `/api/v1/academics/sections/:id` | - | - |
| DELETE | `/api/v1/academics/sections/:id` | - | - |
| GET | `/api/v1/academics/subjects` | - | - |
| POST | `/api/v1/academics/subjects` | - | - |
| PATCH | `/api/v1/academics/subjects/:id` | - | - |
| DELETE | `/api/v1/academics/subjects/:id` | - | - |
| GET | `/api/v1/academics/teacher-assignments` | - | - |
| POST | `/api/v1/academics/teacher-assignments` | - | - |
| PATCH | `/api/v1/academics/teacher-assignments/:id` | - | - |
| DELETE | `/api/v1/academics/teacher-assignments/:id` | - | - |
| GET | `/api/v1/academics/terms` | - | - |
| POST | `/api/v1/academics/terms` | - | - |
| PATCH | `/api/v1/academics/terms/:id` | - | - |
| POST | `/api/v1/academics/timetable` | Teacher, Student | - |
| GET | `/api/v1/academics/timetable/section/:sectionId` | Teacher, Student | - |
| GET | `/api/v1/academics/years` | - | - |
| POST | `/api/v1/academics/years` | - | - |
| PATCH | `/api/v1/academics/years/:id` | - | - |

### ADMISSIONS - 4 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/admissions/enquiry` | - | ✅ Yes |
| GET | `/api/v1/admissions/enquiry` | - | ✅ Yes |
| POST | `/api/v1/admissions/enquiry/:id/enroll` | - | ✅ Yes |
| PATCH | `/api/v1/admissions/enquiry/:id/stage` | - | ✅ Yes |

### AI-CHAT - 1 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/ai-chat/ask` | - | - |

### ATTENDANCE - 3 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/attendance` | Parent, Teacher, Student, Driver | - |
| POST | `/api/v1/attendance/mark` | Parent, Teacher, Student, Driver | - |
| GET | `/api/v1/attendance/stats` | Parent, Teacher, Student, Driver | - |

### AUTH - 10 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/auth/login` | - | - |
| POST | `/api/v1/auth/logout` | - | - |
| GET | `/api/v1/auth/me` | - | - |
| GET | `/api/v1/auth/me/permissions` | - | - |
| POST | `/api/v1/auth/school/select` | - | - |
| POST | `/api/v1/auth/send-otp` | - | - |
| POST | `/api/v1/auth/student-login` | - | - |
| POST | `/api/v1/auth/switch-role` | - | - |
| POST | `/api/v1/auth/token/refresh` | - | - |
| POST | `/api/v1/auth/verify-otp` | - | - |

### CERTIFICATES - 6 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/certificates/issue` | Parent, Teacher, Student | - |
| GET | `/api/v1/certificates/issued` | Parent, Teacher, Student | - |
| POST | `/api/v1/certificates/request` | Parent, Teacher, Student | - |
| GET | `/api/v1/certificates/types` | Parent, Teacher, Student | - |
| POST | `/api/v1/certificates/types` | Parent, Teacher, Student | - |
| GET | `/api/v1/certificates/validate/:uuid` | Parent, Teacher, Student | - |

### COMMUNICATION - 11 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/communication/announcements` | Parent, Teacher, Student | - |
| GET | `/api/v1/communication/announcements` | Parent, Teacher, Student | - |
| POST | `/api/v1/communication/announcements/:id` | Parent, Teacher, Student | - |
| POST | `/api/v1/communication/announcements/:id/delete` | Parent, Teacher, Student | - |
| GET | `/api/v1/communication/announcements/manage` | Parent, Teacher, Student | - |
| GET | `/api/v1/communication/conversations` | Parent, Teacher, Student | - |
| POST | `/api/v1/communication/conversations` | Parent, Teacher, Student | - |
| POST | `/api/v1/communication/conversations/:id/messages` | Parent, Teacher, Student | - |
| GET | `/api/v1/communication/conversations/:id/messages` | Parent, Teacher, Student | - |
| GET | `/api/v1/communication/notifications/inbox` | Parent, Teacher, Student | - |
| POST | `/api/v1/communication/notifications/sms/test` | Parent, Teacher, Student | - |

### DASHBOARD - 3 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/dashboard/admin` | Teacher | - |
| GET | `/api/v1/dashboard/parent` | Parent, Teacher | - |
| GET | `/api/v1/dashboard/teacher` | Teacher | - |

### EXAM-SCHEDULES - 4 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/exam-schedules` | - | - |
| GET | `/api/v1/exam-schedules` | - | - |
| PUT | `/api/v1/exam-schedules/:id` | - | - |
| DELETE | `/api/v1/exam-schedules/:id` | - | - |

### EXAMS - 19 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/exams` | Parent, Teacher, Student | - |
| GET | `/api/v1/exams` | Parent, Teacher, Student | - |
| GET | `/api/v1/exams/:id` | Parent, Teacher, Student | - |
| PUT | `/api/v1/exams/:id` | Parent, Teacher, Student | - |
| DELETE | `/api/v1/exams/:id` | Parent, Teacher, Student | - |
| PUT | `/api/v1/exams/:id/publish` | Parent, Teacher, Student | - |
| PATCH | `/api/v1/exams/hall-tickets/:id/status` | Parent, Teacher, Student | - |
| GET | `/api/v1/exams/hall-tickets/exam/:examId` | Parent, Teacher, Student | - |
| POST | `/api/v1/exams/hall-tickets/generate/:examId` | Parent, Teacher, Student | - |
| GET | `/api/v1/exams/hall-tickets/student/:studentId` | Parent, Teacher, Student | - |
| POST | `/api/v1/exams/rechecks` | Parent, Teacher, Student | - |
| GET | `/api/v1/exams/rechecks` | Parent, Teacher, Student | - |
| PATCH | `/api/v1/exams/rechecks/:id/process` | Parent, Teacher, Student | - |
| GET | `/api/v1/exams/report-cards/download/:studentId` | Parent, Teacher, Student | - |
| POST | `/api/v1/exams/report-cards/generate/:studentId` | Parent, Teacher, Student | - |
| GET | `/api/v1/exams/report-cards/student/:studentId` | Parent, Teacher, Student | - |
| PATCH | `/api/v1/exams/seating/:studentId` | Parent, Teacher, Student | - |
| POST | `/api/v1/exams/seating/generate` | Parent, Teacher, Student | - |
| GET | `/api/v1/exams/seating/section/:sectionId` | Parent, Teacher, Student | - |

### FEE-CONCESSIONS - 4 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/fee-concessions` | - | - |
| GET | `/api/v1/fee-concessions` | - | - |
| PATCH | `/api/v1/fee-concessions/:id` | - | - |
| PUT | `/api/v1/fee-concessions/:id/approve` | - | - |

### FEE-INVOICES - 9 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/fee-invoices` | Parent | - |
| POST | `/api/v1/fee-invoices/:id/revise` | Parent | - |
| PATCH | `/api/v1/fee-invoices/:id/waive` | Parent | - |
| POST | `/api/v1/fee-invoices/apply-late-fees` | Parent | - |
| POST | `/api/v1/fee-invoices/carry-forward-arrears` | Parent | - |
| GET | `/api/v1/fee-invoices/dues-report` | Parent | - |
| POST | `/api/v1/fee-invoices/generate` | Parent | - |
| POST | `/api/v1/fee-invoices/rollover-year` | Parent | - |
| GET | `/api/v1/fee-invoices/student/:studentId` | Parent | - |

### FEE-PAYMENTS - 4 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/fee-payments` | Parent | - |
| PATCH | `/api/v1/fee-payments/:id/refund` | Parent | - |
| POST | `/api/v1/fee-payments/collect` | Parent | - |
| GET | `/api/v1/fee-payments/receipt/:paymentId` | Parent | - |

### FEE-STRUCTURES - 9 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/fee-structures` | - | - |
| GET | `/api/v1/fee-structures` | - | - |
| GET | `/api/v1/fee-structures/:id` | - | - |
| PUT | `/api/v1/fee-structures/:id` | - | - |
| DELETE | `/api/v1/fee-structures/:id` | - | - |
| POST | `/api/v1/fee-structures/:id/map-classes` | - | - |
| POST | `/api/v1/fee-structures/:structureId/installments` | - | - |
| GET | `/api/v1/fee-structures/:structureId/installments` | - | - |
| DELETE | `/api/v1/fee-structures/:structureId/installments/:id` | - | - |

### FINANCE - 48 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/finance/advance-deposits` | - | - |
| GET | `/api/v1/finance/advance-deposits` | - | - |
| DELETE | `/api/v1/finance/advance-deposits/:id` | - | - |
| POST | `/api/v1/finance/advance-deposits/:id/apply` | - | - |
| GET | `/api/v1/finance/advance-deposits/student/:studentId` | - | - |
| POST | `/api/v1/finance/budgets` | - | - |
| GET | `/api/v1/finance/budgets` | - | - |
| PATCH | `/api/v1/finance/budgets/:id/approve` | - | - |
| POST | `/api/v1/finance/budgets/:id/submit` | - | - |
| POST | `/api/v1/finance/cheque-returns` | - | - |
| GET | `/api/v1/finance/cheque-returns` | - | - |
| GET | `/api/v1/finance/cheque-returns/pdc-calendar` | - | - |
| PATCH | `/api/v1/finance/cheque-returns/pdc/:paymentId/present` | - | - |
| POST | `/api/v1/finance/expenses` | - | - |
| GET | `/api/v1/finance/expenses` | - | - |
| DELETE | `/api/v1/finance/expenses/:id` | - | - |
| PATCH | `/api/v1/finance/expenses/:id/approve` | - | - |
| POST | `/api/v1/finance/fee-categories` | - | - |
| GET | `/api/v1/finance/fee-categories` | - | - |
| PATCH | `/api/v1/finance/fee-categories/:id` | - | - |
| DELETE | `/api/v1/finance/fee-categories/:id` | - | - |
| POST | `/api/v1/finance/fee-reminders` | - | - |
| GET | `/api/v1/finance/fee-reminders` | - | - |
| PATCH | `/api/v1/finance/fee-reminders/:id` | - | - |
| DELETE | `/api/v1/finance/fee-reminders/:id` | - | - |
| POST | `/api/v1/finance/fee-reminders/run` | - | - |
| POST | `/api/v1/finance/fines` | - | - |
| GET | `/api/v1/finance/fines` | - | - |
| PATCH | `/api/v1/finance/fines/:id/pay` | - | - |
| PATCH | `/api/v1/finance/fines/:id/waive` | - | - |
| POST | `/api/v1/finance/print-templates` | - | - |
| GET | `/api/v1/finance/print-templates` | - | - |
| GET | `/api/v1/finance/print-templates/:id` | - | - |
| PATCH | `/api/v1/finance/print-templates/:id` | - | - |
| DELETE | `/api/v1/finance/print-templates/:id` | - | - |
| GET | `/api/v1/finance/print-templates/default` | - | - |
| GET | `/api/v1/finance/receipts` | - | - |
| GET | `/api/v1/finance/receipts/:id` | - | - |
| DELETE | `/api/v1/finance/receipts/:id` | - | - |
| POST | `/api/v1/finance/reconciliation/settle` | - | - |
| GET | `/api/v1/finance/reconciliation/settlements` | - | - |
| POST | `/api/v1/finance/rte-students` | Teacher, Driver | - |
| GET | `/api/v1/finance/rte-students` | Teacher, Driver | - |
| PATCH | `/api/v1/finance/rte-students/:id/reimbursement` | Teacher, Driver | - |
| POST | `/api/v1/finance/tax-records` | - | - |
| GET | `/api/v1/finance/tax-records` | - | - |
| DELETE | `/api/v1/finance/tax-records/:id` | - | - |
| PATCH | `/api/v1/finance/tax-records/:id/file` | - | - |

### GRADING-SYSTEMS - 5 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/grading-systems` | - | - |
| GET | `/api/v1/grading-systems` | - | - |
| PUT | `/api/v1/grading-systems/:id` | - | - |
| DELETE | `/api/v1/grading-systems/:id` | - | - |
| POST | `/api/v1/grading-systems/:id/scales` | - | - |

### HEALTH - 6 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/health` | Parent, Student | - |
| POST | `/api/v1/health/incidents` | Parent, Student | - |
| GET | `/api/v1/health/ready` | Parent, Student | - |
| POST | `/api/v1/health/records` | Parent, Student | - |
| GET | `/api/v1/health/records/:studentId` | Parent, Student | - |
| GET | `/api/v1/health/status` | Parent, Student | - |

### HOMEWORK - 8 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/homework` | Parent, Teacher, Student | - |
| PATCH | `/api/v1/homework/:id` | Parent, Teacher, Student | - |
| DELETE | `/api/v1/homework/:id` | Parent, Teacher, Student | - |
| POST | `/api/v1/homework/notify` | Parent, Teacher, Student | - |
| GET | `/api/v1/homework/section/:sectionId` | Parent, Teacher, Student | - |
| PATCH | `/api/v1/homework/submission/:id/grade` | Parent, Teacher, Student | - |
| GET | `/api/v1/homework/submissions/:homeworkId` | Parent, Teacher, Student | - |
| POST | `/api/v1/homework/submit` | Parent, Teacher, Student | - |

### IMPORTS - 2 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/imports/:type` | - | ✅ Yes |
| GET | `/api/v1/imports/status/:jobId` | - | ✅ Yes |

### INVENTORY - 17 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/inventory` | - | - |
| GET | `/api/v1/inventory/damage-reports` | - | - |
| POST | `/api/v1/inventory/damage-reports` | - | - |
| POST | `/api/v1/inventory/items` | - | - |
| PATCH | `/api/v1/inventory/items/:id` | - | - |
| DELETE | `/api/v1/inventory/items/:id` | - | - |
| GET | `/api/v1/inventory/low-stock` | - | - |
| GET | `/api/v1/inventory/purchase-orders` | - | - |
| POST | `/api/v1/inventory/purchase-orders` | - | - |
| GET | `/api/v1/inventory/search` | - | - |
| GET | `/api/v1/inventory/suppliers` | - | - |
| POST | `/api/v1/inventory/suppliers` | - | - |
| PATCH | `/api/v1/inventory/suppliers/:id` | - | - |
| DELETE | `/api/v1/inventory/suppliers/:id` | - | - |
| POST | `/api/v1/inventory/transaction` | - | - |
| GET | `/api/v1/inventory/transactions` | - | - |
| GET | `/api/v1/inventory/transactions/:id` | - | - |

### LEAVES - 8 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| PATCH | `/api/v1/leaves/:id/status` | Teacher | - |
| POST | `/api/v1/leaves/apply` | Teacher | - |
| GET | `/api/v1/leaves/balances` | Teacher | - |
| PATCH | `/api/v1/leaves/balances/:balanceId` | Teacher | - |
| POST | `/api/v1/leaves/balances/init/:staffId` | Teacher | - |
| GET | `/api/v1/leaves/history` | Teacher | - |
| POST | `/api/v1/leaves/types` | Teacher | - |
| GET | `/api/v1/leaves/types` | Teacher | - |

### LIBRARY - 6 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/library/books` | Parent, Student | - |
| POST | `/api/v1/library/books` | Parent, Student | - |
| GET | `/api/v1/library/books/export` | Parent, Student | - |
| POST | `/api/v1/library/circulate` | Parent, Student | - |
| GET | `/api/v1/library/circulation` | Parent, Student | - |
| POST | `/api/v1/library/member/register` | Parent, Student | - |

### MARKS - 6 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/marks` | Parent, Teacher, Student | - |
| POST | `/api/v1/marks/bulk` | Parent, Teacher, Student | - |
| GET | `/api/v1/marks/class-analysis` | Parent, Teacher, Student | - |
| POST | `/api/v1/marks/lock` | Parent, Teacher, Student | - |
| GET | `/api/v1/marks/student/:studentId` | Parent, Teacher, Student | - |
| POST | `/api/v1/marks/unlock` | Parent, Teacher, Student | - |

### PARENT - 5 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/parent/billing` | Parent | - |
| POST | `/api/v1/parent/emergency-alert` | Parent | - |
| GET | `/api/v1/parent/wards` | Parent | - |
| GET | `/api/v1/parent/wards/:id` | Parent | - |
| POST | `/api/v1/parent/wards/:id/leave` | Parent | - |

### PAYMENTS - 6 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/payments/checkout` | - | - |
| POST | `/api/v1/payments/gateway-config` | - | - |
| GET | `/api/v1/payments/gateway-config` | - | - |
| DELETE | `/api/v1/payments/gateway-config/:id` | - | - |
| POST | `/api/v1/payments/webhook/razorpay` | - | - |
| POST | `/api/v1/payments/webhook/razorpay/school` | - | - |

### PAYROLL - 14 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| PATCH | `/api/v1/payroll/:id/adjust` | - | ✅ Yes |
| POST | `/api/v1/payroll/advances` | - | ✅ Yes |
| GET | `/api/v1/payroll/advances` | - | ✅ Yes |
| PATCH | `/api/v1/payroll/advances/:id/approve` | - | ✅ Yes |
| PATCH | `/api/v1/payroll/advances/:id/disburse` | - | ✅ Yes |
| POST | `/api/v1/payroll/generate` | - | ✅ Yes |
| GET | `/api/v1/payroll/generate/preview` | - | ✅ Yes |
| GET | `/api/v1/payroll/list` | - | ✅ Yes |
| PATCH | `/api/v1/payroll/payslip/:id/void` | - | ✅ Yes |
| GET | `/api/v1/payroll/payslip/:payrollId` | - | ✅ Yes |
| GET | `/api/v1/payroll/salary-structure/:staffId` | Teacher | - |
| POST | `/api/v1/payroll/salary-structure/:staffId` | Teacher | - |
| GET | `/api/v1/payroll/settings` | - | ✅ Yes |
| POST | `/api/v1/payroll/settings` | - | ✅ Yes |

### PLATFORM - 39 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/platform/api-versions` | - | ✅ Yes |
| POST | `/api/v1/platform/api-versions/:version` | - | ✅ Yes |
| GET | `/api/v1/platform/audit-logs` | - | ✅ Yes |
| GET | `/api/v1/platform/backup-logs` | - | ✅ Yes |
| POST | `/api/v1/platform/backup-logs` | - | ✅ Yes |
| GET | `/api/v1/platform/data-deletion-requests` | - | ✅ Yes |
| POST | `/api/v1/platform/data-deletion-requests` | - | ✅ Yes |
| PATCH | `/api/v1/platform/data-deletion-requests/:id` | - | ✅ Yes |
| GET | `/api/v1/platform/invoices` | - | ✅ Yes |
| POST | `/api/v1/platform/invoices` | - | ✅ Yes |
| PATCH | `/api/v1/platform/invoices/:id/pay` | - | ✅ Yes |
| GET | `/api/v1/platform/school-groups` | - | ✅ Yes |
| POST | `/api/v1/platform/school-groups` | - | ✅ Yes |
| POST | `/api/v1/platform/school-groups/:id/members` | - | ✅ Yes |
| GET | `/api/v1/platform/schools` | - | ✅ Yes |
| POST | `/api/v1/platform/schools` | - | ✅ Yes |
| DELETE | `/api/v1/platform/schools/:id` | - | ✅ Yes |
| GET | `/api/v1/platform/schools/:id/finance-summary` | - | ✅ Yes |
| POST | `/api/v1/platform/schools/:id/initialize` | - | ✅ Yes |
| POST | `/api/v1/platform/schools/:id/payment-gateway` | - | ✅ Yes |
| GET | `/api/v1/platform/schools/:id/payment-gateway` | - | ✅ Yes |
| POST | `/api/v1/platform/schools/:id/promote-admin` | - | ✅ Yes |
| GET | `/api/v1/platform/schools/:id/rate-limit` | - | ✅ Yes |
| POST | `/api/v1/platform/schools/:id/rate-limit` | - | ✅ Yes |
| PATCH | `/api/v1/platform/schools/:id/status` | - | ✅ Yes |
| POST | `/api/v1/platform/schools/:id/subscription` | - | ✅ Yes |
| POST | `/api/v1/platform/schools/onboard-full` | - | ✅ Yes |
| GET | `/api/v1/platform/security-incidents` | - | ✅ Yes |
| POST | `/api/v1/platform/security-incidents` | - | ✅ Yes |
| PATCH | `/api/v1/platform/security-incidents/:id` | - | ✅ Yes |
| GET | `/api/v1/platform/stats` | - | ✅ Yes |
| GET | `/api/v1/platform/subscriptions` | - | ✅ Yes |
| POST | `/api/v1/platform/subscriptions/:id/modules` | - | ✅ Yes |
| GET | `/api/v1/platform/system-health-checks` | Parent, Student | - |
| POST | `/api/v1/platform/system-health-checks` | Parent, Student | - |
| GET | `/api/v1/platform/usage-metrics` | - | ✅ Yes |
| POST | `/api/v1/platform/usage-metrics` | - | ✅ Yes |
| GET | `/api/v1/platform/users` | - | ✅ Yes |
| POST | `/api/v1/platform/users` | - | ✅ Yes |

### REPORTS - 13 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/reports/finance/class-outstanding` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/concessions` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/daily-collection` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/defaulters` | - | ✅ Yes |
| POST | `/api/v1/reports/finance/demand-letter` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/expense-budget` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/income-statement` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/monthly-summary` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/payroll-summary` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/tax-liability` | - | ✅ Yes |
| GET | `/api/v1/reports/finance/yearly-comparison` | - | ✅ Yes |
| GET | `/api/v1/reports/report-card/:studentId` | - | - |
| GET | `/api/v1/reports/summary` | - | - |

### ROLES - 9 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/roles` | - | - |
| POST | `/api/v1/roles` | - | - |
| PATCH | `/api/v1/roles/:id` | - | ✅ Yes |
| DELETE | `/api/v1/roles/:id` | - | ✅ Yes |
| PATCH | `/api/v1/roles/:id/access` | - | ✅ Yes |
| POST | `/api/v1/roles/assign` | - | ✅ Yes |
| GET | `/api/v1/roles/modules` | - | ✅ Yes |
| POST | `/api/v1/roles/reseed-default-catalog` | - | ✅ Yes |
| POST | `/api/v1/roles/unassign` | - | ✅ Yes |

### SCHOOLS - 10 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/schools/academic-years` | - | - |
| POST | `/api/v1/schools/academic-years` | - | - |
| PATCH | `/api/v1/schools/academic-years/:id` | - | - |
| GET | `/api/v1/schools/calendar` | - | - |
| POST | `/api/v1/schools/calendar` | - | - |
| GET | `/api/v1/schools/profile` | - | - |
| PATCH | `/api/v1/schools/profile` | - | - |
| POST | `/api/v1/schools/profile/logo` | - | - |
| GET | `/api/v1/schools/terms` | - | - |
| POST | `/api/v1/schools/terms` | - | - |

### SETTINGS - 14 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/settings/audit` | - | ✅ Yes |
| GET | `/api/v1/settings/configs` | - | ✅ Yes |
| POST | `/api/v1/settings/configs` | - | ✅ Yes |
| POST | `/api/v1/settings/custom-fields` | - | ✅ Yes |
| GET | `/api/v1/settings/custom-fields/:entityType` | - | ✅ Yes |
| DELETE | `/api/v1/settings/custom-fields/:id` | - | ✅ Yes |
| GET | `/api/v1/settings/devices` | - | ✅ Yes |
| DELETE | `/api/v1/settings/devices/:id` | - | ✅ Yes |
| GET | `/api/v1/settings/notification-rules` | - | ✅ Yes |
| POST | `/api/v1/settings/notification-rules` | - | ✅ Yes |
| POST | `/api/v1/settings/notification-rules/test-channel` | - | ✅ Yes |
| POST | `/api/v1/settings/workflows` | - | ✅ Yes |
| DELETE | `/api/v1/settings/workflows/:id` | - | ✅ Yes |
| GET | `/api/v1/settings/workflows/:type` | - | ✅ Yes |

### STAFF - 8 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/staff` | Teacher | - |
| PATCH | `/api/v1/staff/:id` | Teacher | - |
| GET | `/api/v1/staff/:id` | Teacher | - |
| POST | `/api/v1/staff/:id/documents` | Teacher | - |
| GET | `/api/v1/staff/:id/documents` | Teacher | - |
| DELETE | `/api/v1/staff/:id/documents/:documentId` | Teacher | - |
| POST | `/api/v1/staff/:id/profile-photo` | Teacher | - |
| POST | `/api/v1/staff/onboard` | Teacher | - |

### STUDENTS - 16 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| GET | `/api/v1/students` | Teacher, Driver | - |
| GET | `/api/v1/students/:id` | Teacher, Driver | - |
| PATCH | `/api/v1/students/:id` | Teacher, Driver | - |
| POST | `/api/v1/students/:id/documents` | Teacher, Driver | - |
| GET | `/api/v1/students/:id/documents` | Teacher, Driver | - |
| PATCH | `/api/v1/students/:id/graduate` | Teacher, Driver | - |
| PATCH | `/api/v1/students/:id/guardian-contact` | Teacher, Driver | - |
| POST | `/api/v1/students/:id/issue-tc` | Teacher, Driver | - |
| POST | `/api/v1/students/:id/profile-photo` | Teacher, Driver | - |
| PATCH | `/api/v1/students/:id/promote` | Teacher, Driver | - |
| PATCH | `/api/v1/students/:id/withdraw` | Teacher, Driver | - |
| POST | `/api/v1/students/admit` | Teacher, Driver | - |
| POST | `/api/v1/students/bulk-promote` | Teacher, Driver | - |
| POST | `/api/v1/students/import` | Teacher, Driver | - |
| GET | `/api/v1/students/search` | Teacher, Driver | - |
| POST | `/api/v1/students/sync-siblings` | Teacher, Driver | - |

### TIMETABLE - 5 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/timetable` | Teacher, Student | - |
| GET | `/api/v1/timetable/section/:sectionId` | Teacher, Student | - |
| GET | `/api/v1/timetable/structure` | Teacher, Student | - |
| PATCH | `/api/v1/timetable/structure/:id` | Teacher, Student | - |
| GET | `/api/v1/timetable/teacher/:teacherId` | Teacher, Student | - |

### TRANSPORT - 36 new APIs

| Method | Endpoint | Mobile Apps | Web Only |
|--------|----------|-------------|----------|
| POST | `/api/v1/transport/assign` | Parent, Driver | - |
| DELETE | `/api/v1/transport/assign/:id` | Parent, Driver | - |
| GET | `/api/v1/transport/attendance` | Parent, Teacher, Student, Driver | - |
| POST | `/api/v1/transport/attendance` | Parent, Teacher, Student, Driver | - |
| POST | `/api/v1/transport/attendance/bulk` | Parent, Teacher, Student, Driver | - |
| GET | `/api/v1/transport/compliance-alerts` | Parent, Driver | - |
| GET | `/api/v1/transport/drivers` | Parent, Driver | - |
| POST | `/api/v1/transport/drivers` | Parent, Driver | - |
| PATCH | `/api/v1/transport/drivers/:id` | Parent, Driver | - |
| DELETE | `/api/v1/transport/drivers/:id` | Parent, Driver | - |
| POST | `/api/v1/transport/fee-invoices/generate` | Parent, Driver | - |
| GET | `/api/v1/transport/fee-slabs` | Parent, Driver | - |
| POST | `/api/v1/transport/fee-slabs` | Parent, Driver | - |
| PATCH | `/api/v1/transport/fee-slabs/:id` | Parent, Driver | - |
| DELETE | `/api/v1/transport/fee-slabs/:id` | Parent, Driver | - |
| GET | `/api/v1/transport/fuel-logs` | Parent, Driver | - |
| POST | `/api/v1/transport/gps-update/:vehicleId` | Parent, Driver | - |
| GET | `/api/v1/transport/live-tracking` | Parent, Driver | - |
| GET | `/api/v1/transport/ping` | Parent, Driver | - |
| GET | `/api/v1/transport/routes` | Parent, Driver | - |
| POST | `/api/v1/transport/routes` | Parent, Driver | - |
| PATCH | `/api/v1/transport/routes/:id` | Parent, Driver | - |
| DELETE | `/api/v1/transport/routes/:id` | Parent, Driver | - |
| POST | `/api/v1/transport/routes/:id/compute-path` | Parent, Driver | - |
| POST | `/api/v1/transport/routes/:id/stops` | Parent, Driver | - |
| PATCH | `/api/v1/transport/routes/:id/stops/:stopId` | Parent, Driver | - |
| DELETE | `/api/v1/transport/routes/:id/stops/:stopId` | Parent, Driver | - |
| GET | `/api/v1/transport/stats` | Parent, Driver | - |
| GET | `/api/v1/transport/students` | Parent, Teacher, Driver | - |
| GET | `/api/v1/transport/vehicles` | Parent, Driver | - |
| POST | `/api/v1/transport/vehicles` | Parent, Driver | - |
| PATCH | `/api/v1/transport/vehicles/:id` | Parent, Driver | - |
| DELETE | `/api/v1/transport/vehicles/:id` | Parent, Driver | - |
| POST | `/api/v1/transport/vehicles/:id/fuel` | Parent, Driver | - |
| GET | `/api/v1/transport/vehicles/:id/maintenance` | Parent, Driver | - |
| POST | `/api/v1/transport/vehicles/:id/maintenance` | Parent, Driver | - |

---

## 📑 Table of Contents

1. [ACADEMICS](#academics) - 35 APIs
2. [ADMISSIONS](#admissions) - 4 APIs
3. [AI-CHAT](#ai-chat) - 1 APIs
4. [ATTENDANCE](#attendance) - 3 APIs
5. [AUTH](#auth) - 10 APIs
6. [CERTIFICATES](#certificates) - 6 APIs
7. [COMMUNICATION](#communication) - 11 APIs
8. [DASHBOARD](#dashboard) - 3 APIs
9. [EXAM-SCHEDULES](#exam-schedules) - 4 APIs
10. [EXAMS](#exams) - 19 APIs
11. [FEE-CONCESSIONS](#fee-concessions) - 4 APIs
12. [FEE-INVOICES](#fee-invoices) - 9 APIs
13. [FEE-PAYMENTS](#fee-payments) - 4 APIs
14. [FEE-STRUCTURES](#fee-structures) - 9 APIs
15. [FINANCE](#finance) - 48 APIs
16. [GRADING-SYSTEMS](#grading-systems) - 5 APIs
17. [HEALTH](#health) - 6 APIs
18. [HOMEWORK](#homework) - 8 APIs
19. [IMPORTS](#imports) - 2 APIs
20. [INVENTORY](#inventory) - 17 APIs
21. [LEAVES](#leaves) - 8 APIs
22. [LIBRARY](#library) - 6 APIs
23. [MARKS](#marks) - 6 APIs
24. [PARENT](#parent) - 5 APIs
25. [PAYMENTS](#payments) - 6 APIs
26. [PAYROLL](#payroll) - 14 APIs
27. [PLATFORM](#platform) - 39 APIs
28. [REPORTS](#reports) - 13 APIs
29. [ROLES](#roles) - 9 APIs
30. [SCHOOLS](#schools) - 10 APIs
31. [SETTINGS](#settings) - 14 APIs
32. [STAFF](#staff) - 8 APIs
33. [STUDENTS](#students) - 16 APIs
34. [TIMETABLE](#timetable) - 5 APIs
35. [TRANSPORT](#transport) - 36 APIs

---

## 📖 Legend

- **Mobile Apps Column:** Shows which mobile apps can use this API
  - 🟢 **Parent App** - For parents/guardians
  - 🔵 **Teacher App** - For teachers/faculty
  - 🟡 **Student App** - For students
  - 🟠 **Driver App** - For transport drivers
- **Web Only:** APIs that are only for web admin panel (not suitable for mobile)

---

## 📚 Complete API Reference

### ACADEMICS

**Count:** 35 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/academics/calendar` | - | - | 🆕 |
| 2 | **POST** | `/api/v1/academics/calendar` | - | - | 🆕 |
| 3 | **DELETE** | `/api/v1/academics/calendar/:id` | - | - | 🆕 |
| 4 | **GET** | `/api/v1/academics/class-subjects` | - | - | 🆕 |
| 5 | **POST** | `/api/v1/academics/class-subjects` | - | - | 🆕 |
| 6 | **PATCH** | `/api/v1/academics/class-subjects/:id` | - | - | 🆕 |
| 7 | **DELETE** | `/api/v1/academics/class-subjects/:id` | - | - | 🆕 |
| 8 | **GET** | `/api/v1/academics/classes` | - | - | 🆕 |
| 9 | **POST** | `/api/v1/academics/classes` | - | - | 🆕 |
| 10 | **PATCH** | `/api/v1/academics/classes/:id` | - | - | 🆕 |
| 11 | **DELETE** | `/api/v1/academics/classes/:id` | - | - | 🆕 |
| 12 | **POST** | `/api/v1/academics/classes/bulk` | - | - | 🆕 |
| 13 | **GET** | `/api/v1/academics/grading` | - | - | 🆕 |
| 14 | **POST** | `/api/v1/academics/grading` | - | - | 🆕 |
| 15 | **PATCH** | `/api/v1/academics/grading/:id` | - | - | 🆕 |
| 16 | **GET** | `/api/v1/academics/sections` | - | - | 🆕 |
| 17 | **POST** | `/api/v1/academics/sections` | - | - | 🆕 |
| 18 | **PATCH** | `/api/v1/academics/sections/:id` | - | - | 🆕 |
| 19 | **DELETE** | `/api/v1/academics/sections/:id` | - | - | 🆕 |
| 20 | **GET** | `/api/v1/academics/subjects` | - | - | 🆕 |
| 21 | **POST** | `/api/v1/academics/subjects` | - | - | 🆕 |
| 22 | **PATCH** | `/api/v1/academics/subjects/:id` | - | - | 🆕 |
| 23 | **DELETE** | `/api/v1/academics/subjects/:id` | - | - | 🆕 |
| 24 | **GET** | `/api/v1/academics/teacher-assignments` | - | - | 🆕 |
| 25 | **POST** | `/api/v1/academics/teacher-assignments` | - | - | 🆕 |
| 26 | **PATCH** | `/api/v1/academics/teacher-assignments/:id` | - | - | 🆕 |
| 27 | **DELETE** | `/api/v1/academics/teacher-assignments/:id` | - | - | 🆕 |
| 28 | **GET** | `/api/v1/academics/terms` | - | - | 🆕 |
| 29 | **POST** | `/api/v1/academics/terms` | - | - | 🆕 |
| 30 | **PATCH** | `/api/v1/academics/terms/:id` | - | - | 🆕 |
| 31 | **POST** | `/api/v1/academics/timetable` | Teacher, Student | - | 🆕 |
| 32 | **GET** | `/api/v1/academics/timetable/section/:sectionId` | Teacher, Student | - | 🆕 |
| 33 | **GET** | `/api/v1/academics/years` | - | - | 🆕 |
| 34 | **POST** | `/api/v1/academics/years` | - | - | 🆕 |
| 35 | **PATCH** | `/api/v1/academics/years/:id` | - | - | 🆕 |

---

### ADMISSIONS

**Count:** 4 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/admissions/enquiry` | - | ✅ | 🆕 |
| 2 | **GET** | `/api/v1/admissions/enquiry` | - | ✅ | 🆕 |
| 3 | **POST** | `/api/v1/admissions/enquiry/:id/enroll` | - | ✅ | 🆕 |
| 4 | **PATCH** | `/api/v1/admissions/enquiry/:id/stage` | - | ✅ | 🆕 |

---

### AI-CHAT

**Count:** 1 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/ai-chat/ask` | - | - | 🆕 |

---

### ATTENDANCE

**Count:** 3 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/attendance` | Parent, Teacher, Student, Driver | - | 🆕 |
| 2 | **POST** | `/api/v1/attendance/mark` | Parent, Teacher, Student, Driver | - | 🆕 |
| 3 | **GET** | `/api/v1/attendance/stats` | Parent, Teacher, Student, Driver | - | 🆕 |

---

### AUTH

**Count:** 10 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/auth/login` | - | - | 🆕 |
| 2 | **POST** | `/api/v1/auth/logout` | - | - | 🆕 |
| 3 | **GET** | `/api/v1/auth/me` | - | - | 🆕 |
| 4 | **GET** | `/api/v1/auth/me/permissions` | - | - | 🆕 |
| 5 | **POST** | `/api/v1/auth/school/select` | - | - | 🆕 |
| 6 | **POST** | `/api/v1/auth/send-otp` | - | - | 🆕 |
| 7 | **POST** | `/api/v1/auth/student-login` | - | - | 🆕 |
| 8 | **POST** | `/api/v1/auth/switch-role` | - | - | 🆕 |
| 9 | **POST** | `/api/v1/auth/token/refresh` | - | - | 🆕 |
| 10 | **POST** | `/api/v1/auth/verify-otp` | - | - | 🆕 |

---

### CERTIFICATES

**Count:** 6 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/certificates/issue` | Parent, Teacher, Student | - | 🆕 |
| 2 | **GET** | `/api/v1/certificates/issued` | Parent, Teacher, Student | - | 🆕 |
| 3 | **POST** | `/api/v1/certificates/request` | Parent, Teacher, Student | - | 🆕 |
| 4 | **GET** | `/api/v1/certificates/types` | Parent, Teacher, Student | - | 🆕 |
| 5 | **POST** | `/api/v1/certificates/types` | Parent, Teacher, Student | - | 🆕 |
| 6 | **GET** | `/api/v1/certificates/validate/:uuid` | Parent, Teacher, Student | - | 🆕 |

---

### COMMUNICATION

**Count:** 11 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/communication/announcements` | Parent, Teacher, Student | - | 🆕 |
| 2 | **GET** | `/api/v1/communication/announcements` | Parent, Teacher, Student | - | 🆕 |
| 3 | **POST** | `/api/v1/communication/announcements/:id` | Parent, Teacher, Student | - | 🆕 |
| 4 | **POST** | `/api/v1/communication/announcements/:id/delete` | Parent, Teacher, Student | - | 🆕 |
| 5 | **GET** | `/api/v1/communication/announcements/manage` | Parent, Teacher, Student | - | 🆕 |
| 6 | **GET** | `/api/v1/communication/conversations` | Parent, Teacher, Student | - | 🆕 |
| 7 | **POST** | `/api/v1/communication/conversations` | Parent, Teacher, Student | - | 🆕 |
| 8 | **POST** | `/api/v1/communication/conversations/:id/messages` | Parent, Teacher, Student | - | 🆕 |
| 9 | **GET** | `/api/v1/communication/conversations/:id/messages` | Parent, Teacher, Student | - | 🆕 |
| 10 | **GET** | `/api/v1/communication/notifications/inbox` | Parent, Teacher, Student | - | 🆕 |
| 11 | **POST** | `/api/v1/communication/notifications/sms/test` | Parent, Teacher, Student | - | 🆕 |

---

### DASHBOARD

**Count:** 3 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/dashboard/admin` | Teacher | - | 🆕 |
| 2 | **GET** | `/api/v1/dashboard/parent` | Parent, Teacher | - | 🆕 |
| 3 | **GET** | `/api/v1/dashboard/teacher` | Teacher | - | 🆕 |

---

### EXAM-SCHEDULES

**Count:** 4 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/exam-schedules` | - | - | 🆕 |
| 2 | **GET** | `/api/v1/exam-schedules` | - | - | 🆕 |
| 3 | **PUT** | `/api/v1/exam-schedules/:id` | - | - | 🆕 |
| 4 | **DELETE** | `/api/v1/exam-schedules/:id` | - | - | 🆕 |

---

### EXAMS

**Count:** 19 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/exams` | Parent, Teacher, Student | - | 🆕 |
| 2 | **GET** | `/api/v1/exams` | Parent, Teacher, Student | - | 🆕 |
| 3 | **GET** | `/api/v1/exams/:id` | Parent, Teacher, Student | - | 🆕 |
| 4 | **PUT** | `/api/v1/exams/:id` | Parent, Teacher, Student | - | 🆕 |
| 5 | **DELETE** | `/api/v1/exams/:id` | Parent, Teacher, Student | - | 🆕 |
| 6 | **PUT** | `/api/v1/exams/:id/publish` | Parent, Teacher, Student | - | 🆕 |
| 7 | **PATCH** | `/api/v1/exams/hall-tickets/:id/status` | Parent, Teacher, Student | - | 🆕 |
| 8 | **GET** | `/api/v1/exams/hall-tickets/exam/:examId` | Parent, Teacher, Student | - | 🆕 |
| 9 | **POST** | `/api/v1/exams/hall-tickets/generate/:examId` | Parent, Teacher, Student | - | 🆕 |
| 10 | **GET** | `/api/v1/exams/hall-tickets/student/:studentId` | Parent, Teacher, Student | - | 🆕 |
| 11 | **POST** | `/api/v1/exams/rechecks` | Parent, Teacher, Student | - | 🆕 |
| 12 | **GET** | `/api/v1/exams/rechecks` | Parent, Teacher, Student | - | 🆕 |
| 13 | **PATCH** | `/api/v1/exams/rechecks/:id/process` | Parent, Teacher, Student | - | 🆕 |
| 14 | **GET** | `/api/v1/exams/report-cards/download/:studentId` | Parent, Teacher, Student | - | 🆕 |
| 15 | **POST** | `/api/v1/exams/report-cards/generate/:studentId` | Parent, Teacher, Student | - | 🆕 |
| 16 | **GET** | `/api/v1/exams/report-cards/student/:studentId` | Parent, Teacher, Student | - | 🆕 |
| 17 | **PATCH** | `/api/v1/exams/seating/:studentId` | Parent, Teacher, Student | - | 🆕 |
| 18 | **POST** | `/api/v1/exams/seating/generate` | Parent, Teacher, Student | - | 🆕 |
| 19 | **GET** | `/api/v1/exams/seating/section/:sectionId` | Parent, Teacher, Student | - | 🆕 |

---

### FEE-CONCESSIONS

**Count:** 4 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/fee-concessions` | - | - | 🆕 |
| 2 | **GET** | `/api/v1/fee-concessions` | - | - | 🆕 |
| 3 | **PATCH** | `/api/v1/fee-concessions/:id` | - | - | 🆕 |
| 4 | **PUT** | `/api/v1/fee-concessions/:id/approve` | - | - | 🆕 |

---

### FEE-INVOICES

**Count:** 9 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/fee-invoices` | Parent | - | 🆕 |
| 2 | **POST** | `/api/v1/fee-invoices/:id/revise` | Parent | - | 🆕 |
| 3 | **PATCH** | `/api/v1/fee-invoices/:id/waive` | Parent | - | 🆕 |
| 4 | **POST** | `/api/v1/fee-invoices/apply-late-fees` | Parent | - | 🆕 |
| 5 | **POST** | `/api/v1/fee-invoices/carry-forward-arrears` | Parent | - | 🆕 |
| 6 | **GET** | `/api/v1/fee-invoices/dues-report` | Parent | - | 🆕 |
| 7 | **POST** | `/api/v1/fee-invoices/generate` | Parent | - | 🆕 |
| 8 | **POST** | `/api/v1/fee-invoices/rollover-year` | Parent | - | 🆕 |
| 9 | **GET** | `/api/v1/fee-invoices/student/:studentId` | Parent | - | 🆕 |

---

### FEE-PAYMENTS

**Count:** 4 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/fee-payments` | Parent | - | 🆕 |
| 2 | **PATCH** | `/api/v1/fee-payments/:id/refund` | Parent | - | 🆕 |
| 3 | **POST** | `/api/v1/fee-payments/collect` | Parent | - | 🆕 |
| 4 | **GET** | `/api/v1/fee-payments/receipt/:paymentId` | Parent | - | 🆕 |

---

### FEE-STRUCTURES

**Count:** 9 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/fee-structures` | - | - | 🆕 |
| 2 | **GET** | `/api/v1/fee-structures` | - | - | 🆕 |
| 3 | **GET** | `/api/v1/fee-structures/:id` | - | - | 🆕 |
| 4 | **PUT** | `/api/v1/fee-structures/:id` | - | - | 🆕 |
| 5 | **DELETE** | `/api/v1/fee-structures/:id` | - | - | 🆕 |
| 6 | **POST** | `/api/v1/fee-structures/:id/map-classes` | - | - | 🆕 |
| 7 | **POST** | `/api/v1/fee-structures/:structureId/installments` | - | - | 🆕 |
| 8 | **GET** | `/api/v1/fee-structures/:structureId/installments` | - | - | 🆕 |
| 9 | **DELETE** | `/api/v1/fee-structures/:structureId/installments/:id` | - | - | 🆕 |

---

### FINANCE

**Count:** 48 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/finance/advance-deposits` | - | - | 🆕 |
| 2 | **GET** | `/api/v1/finance/advance-deposits` | - | - | 🆕 |
| 3 | **DELETE** | `/api/v1/finance/advance-deposits/:id` | - | - | 🆕 |
| 4 | **POST** | `/api/v1/finance/advance-deposits/:id/apply` | - | - | 🆕 |
| 5 | **GET** | `/api/v1/finance/advance-deposits/student/:studentId` | - | - | 🆕 |
| 6 | **POST** | `/api/v1/finance/budgets` | - | - | 🆕 |
| 7 | **GET** | `/api/v1/finance/budgets` | - | - | 🆕 |
| 8 | **PATCH** | `/api/v1/finance/budgets/:id/approve` | - | - | 🆕 |
| 9 | **POST** | `/api/v1/finance/budgets/:id/submit` | - | - | 🆕 |
| 10 | **POST** | `/api/v1/finance/cheque-returns` | - | - | 🆕 |
| 11 | **GET** | `/api/v1/finance/cheque-returns` | - | - | 🆕 |
| 12 | **GET** | `/api/v1/finance/cheque-returns/pdc-calendar` | - | - | 🆕 |
| 13 | **PATCH** | `/api/v1/finance/cheque-returns/pdc/:paymentId/present` | - | - | 🆕 |
| 14 | **POST** | `/api/v1/finance/expenses` | - | - | 🆕 |
| 15 | **GET** | `/api/v1/finance/expenses` | - | - | 🆕 |
| 16 | **DELETE** | `/api/v1/finance/expenses/:id` | - | - | 🆕 |
| 17 | **PATCH** | `/api/v1/finance/expenses/:id/approve` | - | - | 🆕 |
| 18 | **POST** | `/api/v1/finance/fee-categories` | - | - | 🆕 |
| 19 | **GET** | `/api/v1/finance/fee-categories` | - | - | 🆕 |
| 20 | **PATCH** | `/api/v1/finance/fee-categories/:id` | - | - | 🆕 |
| 21 | **DELETE** | `/api/v1/finance/fee-categories/:id` | - | - | 🆕 |
| 22 | **POST** | `/api/v1/finance/fee-reminders` | - | - | 🆕 |
| 23 | **GET** | `/api/v1/finance/fee-reminders` | - | - | 🆕 |
| 24 | **PATCH** | `/api/v1/finance/fee-reminders/:id` | - | - | 🆕 |
| 25 | **DELETE** | `/api/v1/finance/fee-reminders/:id` | - | - | 🆕 |
| 26 | **POST** | `/api/v1/finance/fee-reminders/run` | - | - | 🆕 |
| 27 | **POST** | `/api/v1/finance/fines` | - | - | 🆕 |
| 28 | **GET** | `/api/v1/finance/fines` | - | - | 🆕 |
| 29 | **PATCH** | `/api/v1/finance/fines/:id/pay` | - | - | 🆕 |
| 30 | **PATCH** | `/api/v1/finance/fines/:id/waive` | - | - | 🆕 |
| 31 | **POST** | `/api/v1/finance/print-templates` | - | - | 🆕 |
| 32 | **GET** | `/api/v1/finance/print-templates` | - | - | 🆕 |
| 33 | **GET** | `/api/v1/finance/print-templates/:id` | - | - | 🆕 |
| 34 | **PATCH** | `/api/v1/finance/print-templates/:id` | - | - | 🆕 |
| 35 | **DELETE** | `/api/v1/finance/print-templates/:id` | - | - | 🆕 |
| 36 | **GET** | `/api/v1/finance/print-templates/default` | - | - | 🆕 |
| 37 | **GET** | `/api/v1/finance/receipts` | - | - | 🆕 |
| 38 | **GET** | `/api/v1/finance/receipts/:id` | - | - | 🆕 |
| 39 | **DELETE** | `/api/v1/finance/receipts/:id` | - | - | 🆕 |
| 40 | **POST** | `/api/v1/finance/reconciliation/settle` | - | - | 🆕 |
| 41 | **GET** | `/api/v1/finance/reconciliation/settlements` | - | - | 🆕 |
| 42 | **POST** | `/api/v1/finance/rte-students` | Teacher, Driver | - | 🆕 |
| 43 | **GET** | `/api/v1/finance/rte-students` | Teacher, Driver | - | 🆕 |
| 44 | **PATCH** | `/api/v1/finance/rte-students/:id/reimbursement` | Teacher, Driver | - | 🆕 |
| 45 | **POST** | `/api/v1/finance/tax-records` | - | - | 🆕 |
| 46 | **GET** | `/api/v1/finance/tax-records` | - | - | 🆕 |
| 47 | **DELETE** | `/api/v1/finance/tax-records/:id` | - | - | 🆕 |
| 48 | **PATCH** | `/api/v1/finance/tax-records/:id/file` | - | - | 🆕 |

---

### GRADING-SYSTEMS

**Count:** 5 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/grading-systems` | - | - | 🆕 |
| 2 | **GET** | `/api/v1/grading-systems` | - | - | 🆕 |
| 3 | **PUT** | `/api/v1/grading-systems/:id` | - | - | 🆕 |
| 4 | **DELETE** | `/api/v1/grading-systems/:id` | - | - | 🆕 |
| 5 | **POST** | `/api/v1/grading-systems/:id/scales` | - | - | 🆕 |

---

### HEALTH

**Count:** 6 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/health` | Parent, Student | - | 🆕 |
| 2 | **POST** | `/api/v1/health/incidents` | Parent, Student | - | 🆕 |
| 3 | **GET** | `/api/v1/health/ready` | Parent, Student | - | 🆕 |
| 4 | **POST** | `/api/v1/health/records` | Parent, Student | - | 🆕 |
| 5 | **GET** | `/api/v1/health/records/:studentId` | Parent, Student | - | 🆕 |
| 6 | **GET** | `/api/v1/health/status` | Parent, Student | - | 🆕 |

---

### HOMEWORK

**Count:** 8 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/homework` | Parent, Teacher, Student | - | 🆕 |
| 2 | **PATCH** | `/api/v1/homework/:id` | Parent, Teacher, Student | - | 🆕 |
| 3 | **DELETE** | `/api/v1/homework/:id` | Parent, Teacher, Student | - | 🆕 |
| 4 | **POST** | `/api/v1/homework/notify` | Parent, Teacher, Student | - | 🆕 |
| 5 | **GET** | `/api/v1/homework/section/:sectionId` | Parent, Teacher, Student | - | 🆕 |
| 6 | **PATCH** | `/api/v1/homework/submission/:id/grade` | Parent, Teacher, Student | - | 🆕 |
| 7 | **GET** | `/api/v1/homework/submissions/:homeworkId` | Parent, Teacher, Student | - | 🆕 |
| 8 | **POST** | `/api/v1/homework/submit` | Parent, Teacher, Student | - | 🆕 |

---

### IMPORTS

**Count:** 2 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/imports/:type` | - | ✅ | 🆕 |
| 2 | **GET** | `/api/v1/imports/status/:jobId` | - | ✅ | 🆕 |

---

### INVENTORY

**Count:** 17 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/inventory` | - | - | 🆕 |
| 2 | **GET** | `/api/v1/inventory/damage-reports` | - | - | 🆕 |
| 3 | **POST** | `/api/v1/inventory/damage-reports` | - | - | 🆕 |
| 4 | **POST** | `/api/v1/inventory/items` | - | - | 🆕 |
| 5 | **PATCH** | `/api/v1/inventory/items/:id` | - | - | 🆕 |
| 6 | **DELETE** | `/api/v1/inventory/items/:id` | - | - | 🆕 |
| 7 | **GET** | `/api/v1/inventory/low-stock` | - | - | 🆕 |
| 8 | **GET** | `/api/v1/inventory/purchase-orders` | - | - | 🆕 |
| 9 | **POST** | `/api/v1/inventory/purchase-orders` | - | - | 🆕 |
| 10 | **GET** | `/api/v1/inventory/search` | - | - | 🆕 |
| 11 | **GET** | `/api/v1/inventory/suppliers` | - | - | 🆕 |
| 12 | **POST** | `/api/v1/inventory/suppliers` | - | - | 🆕 |
| 13 | **PATCH** | `/api/v1/inventory/suppliers/:id` | - | - | 🆕 |
| 14 | **DELETE** | `/api/v1/inventory/suppliers/:id` | - | - | 🆕 |
| 15 | **POST** | `/api/v1/inventory/transaction` | - | - | 🆕 |
| 16 | **GET** | `/api/v1/inventory/transactions` | - | - | 🆕 |
| 17 | **GET** | `/api/v1/inventory/transactions/:id` | - | - | 🆕 |

---

### LEAVES

**Count:** 8 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **PATCH** | `/api/v1/leaves/:id/status` | Teacher | - | 🆕 |
| 2 | **POST** | `/api/v1/leaves/apply` | Teacher | - | 🆕 |
| 3 | **GET** | `/api/v1/leaves/balances` | Teacher | - | 🆕 |
| 4 | **PATCH** | `/api/v1/leaves/balances/:balanceId` | Teacher | - | 🆕 |
| 5 | **POST** | `/api/v1/leaves/balances/init/:staffId` | Teacher | - | 🆕 |
| 6 | **GET** | `/api/v1/leaves/history` | Teacher | - | 🆕 |
| 7 | **POST** | `/api/v1/leaves/types` | Teacher | - | 🆕 |
| 8 | **GET** | `/api/v1/leaves/types` | Teacher | - | 🆕 |

---

### LIBRARY

**Count:** 6 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/library/books` | Parent, Student | - | 🆕 |
| 2 | **POST** | `/api/v1/library/books` | Parent, Student | - | 🆕 |
| 3 | **GET** | `/api/v1/library/books/export` | Parent, Student | - | 🆕 |
| 4 | **POST** | `/api/v1/library/circulate` | Parent, Student | - | 🆕 |
| 5 | **GET** | `/api/v1/library/circulation` | Parent, Student | - | 🆕 |
| 6 | **POST** | `/api/v1/library/member/register` | Parent, Student | - | 🆕 |

---

### MARKS

**Count:** 6 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/marks` | Parent, Teacher, Student | - | 🆕 |
| 2 | **POST** | `/api/v1/marks/bulk` | Parent, Teacher, Student | - | 🆕 |
| 3 | **GET** | `/api/v1/marks/class-analysis` | Parent, Teacher, Student | - | 🆕 |
| 4 | **POST** | `/api/v1/marks/lock` | Parent, Teacher, Student | - | 🆕 |
| 5 | **GET** | `/api/v1/marks/student/:studentId` | Parent, Teacher, Student | - | 🆕 |
| 6 | **POST** | `/api/v1/marks/unlock` | Parent, Teacher, Student | - | 🆕 |

---

### PARENT

**Count:** 5 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/parent/billing` | Parent | - | 🆕 |
| 2 | **POST** | `/api/v1/parent/emergency-alert` | Parent | - | 🆕 |
| 3 | **GET** | `/api/v1/parent/wards` | Parent | - | 🆕 |
| 4 | **GET** | `/api/v1/parent/wards/:id` | Parent | - | 🆕 |
| 5 | **POST** | `/api/v1/parent/wards/:id/leave` | Parent | - | 🆕 |

---

### PAYMENTS

**Count:** 6 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/payments/checkout` | - | - | 🆕 |
| 2 | **POST** | `/api/v1/payments/gateway-config` | - | - | 🆕 |
| 3 | **GET** | `/api/v1/payments/gateway-config` | - | - | 🆕 |
| 4 | **DELETE** | `/api/v1/payments/gateway-config/:id` | - | - | 🆕 |
| 5 | **POST** | `/api/v1/payments/webhook/razorpay` | - | - | 🆕 |
| 6 | **POST** | `/api/v1/payments/webhook/razorpay/school` | - | - | 🆕 |

---

### PAYROLL

**Count:** 14 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **PATCH** | `/api/v1/payroll/:id/adjust` | - | ✅ | 🆕 |
| 2 | **POST** | `/api/v1/payroll/advances` | - | ✅ | 🆕 |
| 3 | **GET** | `/api/v1/payroll/advances` | - | ✅ | 🆕 |
| 4 | **PATCH** | `/api/v1/payroll/advances/:id/approve` | - | ✅ | 🆕 |
| 5 | **PATCH** | `/api/v1/payroll/advances/:id/disburse` | - | ✅ | 🆕 |
| 6 | **POST** | `/api/v1/payroll/generate` | - | ✅ | 🆕 |
| 7 | **GET** | `/api/v1/payroll/generate/preview` | - | ✅ | 🆕 |
| 8 | **GET** | `/api/v1/payroll/list` | - | ✅ | 🆕 |
| 9 | **PATCH** | `/api/v1/payroll/payslip/:id/void` | - | ✅ | 🆕 |
| 10 | **GET** | `/api/v1/payroll/payslip/:payrollId` | - | ✅ | 🆕 |
| 11 | **GET** | `/api/v1/payroll/salary-structure/:staffId` | Teacher | - | 🆕 |
| 12 | **POST** | `/api/v1/payroll/salary-structure/:staffId` | Teacher | - | 🆕 |
| 13 | **GET** | `/api/v1/payroll/settings` | - | ✅ | 🆕 |
| 14 | **POST** | `/api/v1/payroll/settings` | - | ✅ | 🆕 |

---

### PLATFORM

**Count:** 39 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/platform/api-versions` | - | ✅ | 🆕 |
| 2 | **POST** | `/api/v1/platform/api-versions/:version` | - | ✅ | 🆕 |
| 3 | **GET** | `/api/v1/platform/audit-logs` | - | ✅ | 🆕 |
| 4 | **GET** | `/api/v1/platform/backup-logs` | - | ✅ | 🆕 |
| 5 | **POST** | `/api/v1/platform/backup-logs` | - | ✅ | 🆕 |
| 6 | **GET** | `/api/v1/platform/data-deletion-requests` | - | ✅ | 🆕 |
| 7 | **POST** | `/api/v1/platform/data-deletion-requests` | - | ✅ | 🆕 |
| 8 | **PATCH** | `/api/v1/platform/data-deletion-requests/:id` | - | ✅ | 🆕 |
| 9 | **GET** | `/api/v1/platform/invoices` | - | ✅ | 🆕 |
| 10 | **POST** | `/api/v1/platform/invoices` | - | ✅ | 🆕 |
| 11 | **PATCH** | `/api/v1/platform/invoices/:id/pay` | - | ✅ | 🆕 |
| 12 | **GET** | `/api/v1/platform/school-groups` | - | ✅ | 🆕 |
| 13 | **POST** | `/api/v1/platform/school-groups` | - | ✅ | 🆕 |
| 14 | **POST** | `/api/v1/platform/school-groups/:id/members` | - | ✅ | 🆕 |
| 15 | **GET** | `/api/v1/platform/schools` | - | ✅ | 🆕 |
| 16 | **POST** | `/api/v1/platform/schools` | - | ✅ | 🆕 |
| 17 | **DELETE** | `/api/v1/platform/schools/:id` | - | ✅ | 🆕 |
| 18 | **GET** | `/api/v1/platform/schools/:id/finance-summary` | - | ✅ | 🆕 |
| 19 | **POST** | `/api/v1/platform/schools/:id/initialize` | - | ✅ | 🆕 |
| 20 | **POST** | `/api/v1/platform/schools/:id/payment-gateway` | - | ✅ | 🆕 |
| 21 | **GET** | `/api/v1/platform/schools/:id/payment-gateway` | - | ✅ | 🆕 |
| 22 | **POST** | `/api/v1/platform/schools/:id/promote-admin` | - | ✅ | 🆕 |
| 23 | **GET** | `/api/v1/platform/schools/:id/rate-limit` | - | ✅ | 🆕 |
| 24 | **POST** | `/api/v1/platform/schools/:id/rate-limit` | - | ✅ | 🆕 |
| 25 | **PATCH** | `/api/v1/platform/schools/:id/status` | - | ✅ | 🆕 |
| 26 | **POST** | `/api/v1/platform/schools/:id/subscription` | - | ✅ | 🆕 |
| 27 | **POST** | `/api/v1/platform/schools/onboard-full` | - | ✅ | 🆕 |
| 28 | **GET** | `/api/v1/platform/security-incidents` | - | ✅ | 🆕 |
| 29 | **POST** | `/api/v1/platform/security-incidents` | - | ✅ | 🆕 |
| 30 | **PATCH** | `/api/v1/platform/security-incidents/:id` | - | ✅ | 🆕 |
| 31 | **GET** | `/api/v1/platform/stats` | - | ✅ | 🆕 |
| 32 | **GET** | `/api/v1/platform/subscriptions` | - | ✅ | 🆕 |
| 33 | **POST** | `/api/v1/platform/subscriptions/:id/modules` | - | ✅ | 🆕 |
| 34 | **GET** | `/api/v1/platform/system-health-checks` | Parent, Student | - | 🆕 |
| 35 | **POST** | `/api/v1/platform/system-health-checks` | Parent, Student | - | 🆕 |
| 36 | **GET** | `/api/v1/platform/usage-metrics` | - | ✅ | 🆕 |
| 37 | **POST** | `/api/v1/platform/usage-metrics` | - | ✅ | 🆕 |
| 38 | **GET** | `/api/v1/platform/users` | - | ✅ | 🆕 |
| 39 | **POST** | `/api/v1/platform/users` | - | ✅ | 🆕 |

---

### REPORTS

**Count:** 13 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/reports/finance/class-outstanding` | - | ✅ | 🆕 |
| 2 | **GET** | `/api/v1/reports/finance/concessions` | - | ✅ | 🆕 |
| 3 | **GET** | `/api/v1/reports/finance/daily-collection` | - | ✅ | 🆕 |
| 4 | **GET** | `/api/v1/reports/finance/defaulters` | - | ✅ | 🆕 |
| 5 | **POST** | `/api/v1/reports/finance/demand-letter` | - | ✅ | 🆕 |
| 6 | **GET** | `/api/v1/reports/finance/expense-budget` | - | ✅ | 🆕 |
| 7 | **GET** | `/api/v1/reports/finance/income-statement` | - | ✅ | 🆕 |
| 8 | **GET** | `/api/v1/reports/finance/monthly-summary` | - | ✅ | 🆕 |
| 9 | **GET** | `/api/v1/reports/finance/payroll-summary` | - | ✅ | 🆕 |
| 10 | **GET** | `/api/v1/reports/finance/tax-liability` | - | ✅ | 🆕 |
| 11 | **GET** | `/api/v1/reports/finance/yearly-comparison` | - | ✅ | 🆕 |
| 12 | **GET** | `/api/v1/reports/report-card/:studentId` | - | - | 🆕 |
| 13 | **GET** | `/api/v1/reports/summary` | - | - | 🆕 |

---

### ROLES

**Count:** 9 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/roles` | - | - | 🆕 |
| 2 | **POST** | `/api/v1/roles` | - | - | 🆕 |
| 3 | **PATCH** | `/api/v1/roles/:id` | - | ✅ | 🆕 |
| 4 | **DELETE** | `/api/v1/roles/:id` | - | ✅ | 🆕 |
| 5 | **PATCH** | `/api/v1/roles/:id/access` | - | ✅ | 🆕 |
| 6 | **POST** | `/api/v1/roles/assign` | - | ✅ | 🆕 |
| 7 | **GET** | `/api/v1/roles/modules` | - | ✅ | 🆕 |
| 8 | **POST** | `/api/v1/roles/reseed-default-catalog` | - | ✅ | 🆕 |
| 9 | **POST** | `/api/v1/roles/unassign` | - | ✅ | 🆕 |

---

### SCHOOLS

**Count:** 10 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/schools/academic-years` | - | - | 🆕 |
| 2 | **POST** | `/api/v1/schools/academic-years` | - | - | 🆕 |
| 3 | **PATCH** | `/api/v1/schools/academic-years/:id` | - | - | 🆕 |
| 4 | **GET** | `/api/v1/schools/calendar` | - | - | 🆕 |
| 5 | **POST** | `/api/v1/schools/calendar` | - | - | 🆕 |
| 6 | **GET** | `/api/v1/schools/profile` | - | - | 🆕 |
| 7 | **PATCH** | `/api/v1/schools/profile` | - | - | 🆕 |
| 8 | **POST** | `/api/v1/schools/profile/logo` | - | - | 🆕 |
| 9 | **GET** | `/api/v1/schools/terms` | - | - | 🆕 |
| 10 | **POST** | `/api/v1/schools/terms` | - | - | 🆕 |

---

### SETTINGS

**Count:** 14 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/settings/audit` | - | ✅ | 🆕 |
| 2 | **GET** | `/api/v1/settings/configs` | - | ✅ | 🆕 |
| 3 | **POST** | `/api/v1/settings/configs` | - | ✅ | 🆕 |
| 4 | **POST** | `/api/v1/settings/custom-fields` | - | ✅ | 🆕 |
| 5 | **GET** | `/api/v1/settings/custom-fields/:entityType` | - | ✅ | 🆕 |
| 6 | **DELETE** | `/api/v1/settings/custom-fields/:id` | - | ✅ | 🆕 |
| 7 | **GET** | `/api/v1/settings/devices` | - | ✅ | 🆕 |
| 8 | **DELETE** | `/api/v1/settings/devices/:id` | - | ✅ | 🆕 |
| 9 | **GET** | `/api/v1/settings/notification-rules` | - | ✅ | 🆕 |
| 10 | **POST** | `/api/v1/settings/notification-rules` | - | ✅ | 🆕 |
| 11 | **POST** | `/api/v1/settings/notification-rules/test-channel` | - | ✅ | 🆕 |
| 12 | **POST** | `/api/v1/settings/workflows` | - | ✅ | 🆕 |
| 13 | **DELETE** | `/api/v1/settings/workflows/:id` | - | ✅ | 🆕 |
| 14 | **GET** | `/api/v1/settings/workflows/:type` | - | ✅ | 🆕 |

---

### STAFF

**Count:** 8 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/staff` | Teacher | - | 🆕 |
| 2 | **PATCH** | `/api/v1/staff/:id` | Teacher | - | 🆕 |
| 3 | **GET** | `/api/v1/staff/:id` | Teacher | - | 🆕 |
| 4 | **POST** | `/api/v1/staff/:id/documents` | Teacher | - | 🆕 |
| 5 | **GET** | `/api/v1/staff/:id/documents` | Teacher | - | 🆕 |
| 6 | **DELETE** | `/api/v1/staff/:id/documents/:documentId` | Teacher | - | 🆕 |
| 7 | **POST** | `/api/v1/staff/:id/profile-photo` | Teacher | - | 🆕 |
| 8 | **POST** | `/api/v1/staff/onboard` | Teacher | - | 🆕 |

---

### STUDENTS

**Count:** 16 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **GET** | `/api/v1/students` | Teacher, Driver | - | 🆕 |
| 2 | **GET** | `/api/v1/students/:id` | Teacher, Driver | - | 🆕 |
| 3 | **PATCH** | `/api/v1/students/:id` | Teacher, Driver | - | 🆕 |
| 4 | **POST** | `/api/v1/students/:id/documents` | Teacher, Driver | - | 🆕 |
| 5 | **GET** | `/api/v1/students/:id/documents` | Teacher, Driver | - | 🆕 |
| 6 | **PATCH** | `/api/v1/students/:id/graduate` | Teacher, Driver | - | 🆕 |
| 7 | **PATCH** | `/api/v1/students/:id/guardian-contact` | Teacher, Driver | - | 🆕 |
| 8 | **POST** | `/api/v1/students/:id/issue-tc` | Teacher, Driver | - | 🆕 |
| 9 | **POST** | `/api/v1/students/:id/profile-photo` | Teacher, Driver | - | 🆕 |
| 10 | **PATCH** | `/api/v1/students/:id/promote` | Teacher, Driver | - | 🆕 |
| 11 | **PATCH** | `/api/v1/students/:id/withdraw` | Teacher, Driver | - | 🆕 |
| 12 | **POST** | `/api/v1/students/admit` | Teacher, Driver | - | 🆕 |
| 13 | **POST** | `/api/v1/students/bulk-promote` | Teacher, Driver | - | 🆕 |
| 14 | **POST** | `/api/v1/students/import` | Teacher, Driver | - | 🆕 |
| 15 | **GET** | `/api/v1/students/search` | Teacher, Driver | - | 🆕 |
| 16 | **POST** | `/api/v1/students/sync-siblings` | Teacher, Driver | - | 🆕 |

---

### TIMETABLE

**Count:** 5 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/timetable` | Teacher, Student | - | 🆕 |
| 2 | **GET** | `/api/v1/timetable/section/:sectionId` | Teacher, Student | - | 🆕 |
| 3 | **GET** | `/api/v1/timetable/structure` | Teacher, Student | - | 🆕 |
| 4 | **PATCH** | `/api/v1/timetable/structure/:id` | Teacher, Student | - | 🆕 |
| 5 | **GET** | `/api/v1/timetable/teacher/:teacherId` | Teacher, Student | - | 🆕 |

---

### TRANSPORT

**Count:** 36 APIs

| # | Method | Endpoint | Mobile Apps | Web Only | New |
|---|--------|----------|-------------|----------|-----|
| 1 | **POST** | `/api/v1/transport/assign` | Parent, Driver | - | 🆕 |
| 2 | **DELETE** | `/api/v1/transport/assign/:id` | Parent, Driver | - | 🆕 |
| 3 | **GET** | `/api/v1/transport/attendance` | Parent, Teacher, Student, Driver | - | 🆕 |
| 4 | **POST** | `/api/v1/transport/attendance` | Parent, Teacher, Student, Driver | - | 🆕 |
| 5 | **POST** | `/api/v1/transport/attendance/bulk` | Parent, Teacher, Student, Driver | - | 🆕 |
| 6 | **GET** | `/api/v1/transport/compliance-alerts` | Parent, Driver | - | 🆕 |
| 7 | **GET** | `/api/v1/transport/drivers` | Parent, Driver | - | 🆕 |
| 8 | **POST** | `/api/v1/transport/drivers` | Parent, Driver | - | 🆕 |
| 9 | **PATCH** | `/api/v1/transport/drivers/:id` | Parent, Driver | - | 🆕 |
| 10 | **DELETE** | `/api/v1/transport/drivers/:id` | Parent, Driver | - | 🆕 |
| 11 | **POST** | `/api/v1/transport/fee-invoices/generate` | Parent, Driver | - | 🆕 |
| 12 | **GET** | `/api/v1/transport/fee-slabs` | Parent, Driver | - | 🆕 |
| 13 | **POST** | `/api/v1/transport/fee-slabs` | Parent, Driver | - | 🆕 |
| 14 | **PATCH** | `/api/v1/transport/fee-slabs/:id` | Parent, Driver | - | 🆕 |
| 15 | **DELETE** | `/api/v1/transport/fee-slabs/:id` | Parent, Driver | - | 🆕 |
| 16 | **GET** | `/api/v1/transport/fuel-logs` | Parent, Driver | - | 🆕 |
| 17 | **POST** | `/api/v1/transport/gps-update/:vehicleId` | Parent, Driver | - | 🆕 |
| 18 | **GET** | `/api/v1/transport/live-tracking` | Parent, Driver | - | 🆕 |
| 19 | **GET** | `/api/v1/transport/ping` | Parent, Driver | - | 🆕 |
| 20 | **GET** | `/api/v1/transport/routes` | Parent, Driver | - | 🆕 |
| 21 | **POST** | `/api/v1/transport/routes` | Parent, Driver | - | 🆕 |
| 22 | **PATCH** | `/api/v1/transport/routes/:id` | Parent, Driver | - | 🆕 |
| 23 | **DELETE** | `/api/v1/transport/routes/:id` | Parent, Driver | - | 🆕 |
| 24 | **POST** | `/api/v1/transport/routes/:id/compute-path` | Parent, Driver | - | 🆕 |
| 25 | **POST** | `/api/v1/transport/routes/:id/stops` | Parent, Driver | - | 🆕 |
| 26 | **PATCH** | `/api/v1/transport/routes/:id/stops/:stopId` | Parent, Driver | - | 🆕 |
| 27 | **DELETE** | `/api/v1/transport/routes/:id/stops/:stopId` | Parent, Driver | - | 🆕 |
| 28 | **GET** | `/api/v1/transport/stats` | Parent, Driver | - | 🆕 |
| 29 | **GET** | `/api/v1/transport/students` | Parent, Teacher, Driver | - | 🆕 |
| 30 | **GET** | `/api/v1/transport/vehicles` | Parent, Driver | - | 🆕 |
| 31 | **POST** | `/api/v1/transport/vehicles` | Parent, Driver | - | 🆕 |
| 32 | **PATCH** | `/api/v1/transport/vehicles/:id` | Parent, Driver | - | 🆕 |
| 33 | **DELETE** | `/api/v1/transport/vehicles/:id` | Parent, Driver | - | 🆕 |
| 34 | **POST** | `/api/v1/transport/vehicles/:id/fuel` | Parent, Driver | - | 🆕 |
| 35 | **GET** | `/api/v1/transport/vehicles/:id/maintenance` | Parent, Driver | - | 🆕 |
| 36 | **POST** | `/api/v1/transport/vehicles/:id/maintenance` | Parent, Driver | - | 🆕 |

---

## 📱 Quick Reference for Mobile Teams

### PARENT APP - 122 APIs

<details>
<summary>Click to expand parent APIs</summary>

| Method | Endpoint |
|--------|----------|
| GET | `/api/v1/attendance` |
| POST | `/api/v1/attendance/mark` |
| GET | `/api/v1/attendance/stats` |
| POST | `/api/v1/certificates/issue` |
| GET | `/api/v1/certificates/issued` |
| POST | `/api/v1/certificates/request` |
| GET | `/api/v1/certificates/types` |
| POST | `/api/v1/certificates/types` |
| GET | `/api/v1/certificates/validate/:uuid` |
| POST | `/api/v1/communication/announcements` |
| GET | `/api/v1/communication/announcements` |
| POST | `/api/v1/communication/announcements/:id` |
| POST | `/api/v1/communication/announcements/:id/delete` |
| GET | `/api/v1/communication/announcements/manage` |
| GET | `/api/v1/communication/conversations` |
| POST | `/api/v1/communication/conversations` |
| POST | `/api/v1/communication/conversations/:id/messages` |
| GET | `/api/v1/communication/conversations/:id/messages` |
| GET | `/api/v1/communication/notifications/inbox` |
| POST | `/api/v1/communication/notifications/sms/test` |
| GET | `/api/v1/dashboard/parent` |
| POST | `/api/v1/exams` |
| GET | `/api/v1/exams` |
| GET | `/api/v1/exams/:id` |
| PUT | `/api/v1/exams/:id` |
| DELETE | `/api/v1/exams/:id` |
| PUT | `/api/v1/exams/:id/publish` |
| PATCH | `/api/v1/exams/hall-tickets/:id/status` |
| GET | `/api/v1/exams/hall-tickets/exam/:examId` |
| POST | `/api/v1/exams/hall-tickets/generate/:examId` |
| GET | `/api/v1/exams/hall-tickets/student/:studentId` |
| POST | `/api/v1/exams/rechecks` |
| GET | `/api/v1/exams/rechecks` |
| PATCH | `/api/v1/exams/rechecks/:id/process` |
| GET | `/api/v1/exams/report-cards/download/:studentId` |
| POST | `/api/v1/exams/report-cards/generate/:studentId` |
| GET | `/api/v1/exams/report-cards/student/:studentId` |
| PATCH | `/api/v1/exams/seating/:studentId` |
| POST | `/api/v1/exams/seating/generate` |
| GET | `/api/v1/exams/seating/section/:sectionId` |
| GET | `/api/v1/fee-invoices` |
| POST | `/api/v1/fee-invoices/:id/revise` |
| PATCH | `/api/v1/fee-invoices/:id/waive` |
| POST | `/api/v1/fee-invoices/apply-late-fees` |
| POST | `/api/v1/fee-invoices/carry-forward-arrears` |
| GET | `/api/v1/fee-invoices/dues-report` |
| POST | `/api/v1/fee-invoices/generate` |
| POST | `/api/v1/fee-invoices/rollover-year` |
| GET | `/api/v1/fee-invoices/student/:studentId` |
| GET | `/api/v1/fee-payments` |
| PATCH | `/api/v1/fee-payments/:id/refund` |
| POST | `/api/v1/fee-payments/collect` |
| GET | `/api/v1/fee-payments/receipt/:paymentId` |
| GET | `/api/v1/health` |
| POST | `/api/v1/health/incidents` |
| GET | `/api/v1/health/ready` |
| POST | `/api/v1/health/records` |
| GET | `/api/v1/health/records/:studentId` |
| GET | `/api/v1/health/status` |
| POST | `/api/v1/homework` |
| PATCH | `/api/v1/homework/:id` |
| DELETE | `/api/v1/homework/:id` |
| POST | `/api/v1/homework/notify` |
| GET | `/api/v1/homework/section/:sectionId` |
| PATCH | `/api/v1/homework/submission/:id/grade` |
| GET | `/api/v1/homework/submissions/:homeworkId` |
| POST | `/api/v1/homework/submit` |
| GET | `/api/v1/library/books` |
| POST | `/api/v1/library/books` |
| GET | `/api/v1/library/books/export` |
| POST | `/api/v1/library/circulate` |
| GET | `/api/v1/library/circulation` |
| POST | `/api/v1/library/member/register` |
| GET | `/api/v1/marks` |
| POST | `/api/v1/marks/bulk` |
| GET | `/api/v1/marks/class-analysis` |
| POST | `/api/v1/marks/lock` |
| GET | `/api/v1/marks/student/:studentId` |
| POST | `/api/v1/marks/unlock` |
| GET | `/api/v1/parent/billing` |
| POST | `/api/v1/parent/emergency-alert` |
| GET | `/api/v1/parent/wards` |
| GET | `/api/v1/parent/wards/:id` |
| POST | `/api/v1/parent/wards/:id/leave` |
| GET | `/api/v1/platform/system-health-checks` |
| POST | `/api/v1/platform/system-health-checks` |
| POST | `/api/v1/transport/assign` |
| DELETE | `/api/v1/transport/assign/:id` |
| GET | `/api/v1/transport/attendance` |
| POST | `/api/v1/transport/attendance` |
| POST | `/api/v1/transport/attendance/bulk` |
| GET | `/api/v1/transport/compliance-alerts` |
| GET | `/api/v1/transport/drivers` |
| POST | `/api/v1/transport/drivers` |
| PATCH | `/api/v1/transport/drivers/:id` |
| DELETE | `/api/v1/transport/drivers/:id` |
| POST | `/api/v1/transport/fee-invoices/generate` |
| GET | `/api/v1/transport/fee-slabs` |
| POST | `/api/v1/transport/fee-slabs` |
| PATCH | `/api/v1/transport/fee-slabs/:id` |
| DELETE | `/api/v1/transport/fee-slabs/:id` |
| GET | `/api/v1/transport/fuel-logs` |
| POST | `/api/v1/transport/gps-update/:vehicleId` |
| GET | `/api/v1/transport/live-tracking` |
| GET | `/api/v1/transport/ping` |
| GET | `/api/v1/transport/routes` |
| POST | `/api/v1/transport/routes` |
| PATCH | `/api/v1/transport/routes/:id` |
| DELETE | `/api/v1/transport/routes/:id` |
| POST | `/api/v1/transport/routes/:id/compute-path` |
| POST | `/api/v1/transport/routes/:id/stops` |
| PATCH | `/api/v1/transport/routes/:id/stops/:stopId` |
| DELETE | `/api/v1/transport/routes/:id/stops/:stopId` |
| GET | `/api/v1/transport/stats` |
| GET | `/api/v1/transport/students` |
| GET | `/api/v1/transport/vehicles` |
| POST | `/api/v1/transport/vehicles` |
| PATCH | `/api/v1/transport/vehicles/:id` |
| DELETE | `/api/v1/transport/vehicles/:id` |
| POST | `/api/v1/transport/vehicles/:id/fuel` |
| GET | `/api/v1/transport/vehicles/:id/maintenance` |
| POST | `/api/v1/transport/vehicles/:id/maintenance` |

</details>

### TEACHER APP - 104 APIs

<details>
<summary>Click to expand teacher APIs</summary>

| Method | Endpoint |
|--------|----------|
| POST | `/api/v1/academics/timetable` |
| GET | `/api/v1/academics/timetable/section/:sectionId` |
| GET | `/api/v1/attendance` |
| POST | `/api/v1/attendance/mark` |
| GET | `/api/v1/attendance/stats` |
| POST | `/api/v1/certificates/issue` |
| GET | `/api/v1/certificates/issued` |
| POST | `/api/v1/certificates/request` |
| GET | `/api/v1/certificates/types` |
| POST | `/api/v1/certificates/types` |
| GET | `/api/v1/certificates/validate/:uuid` |
| POST | `/api/v1/communication/announcements` |
| GET | `/api/v1/communication/announcements` |
| POST | `/api/v1/communication/announcements/:id` |
| POST | `/api/v1/communication/announcements/:id/delete` |
| GET | `/api/v1/communication/announcements/manage` |
| GET | `/api/v1/communication/conversations` |
| POST | `/api/v1/communication/conversations` |
| POST | `/api/v1/communication/conversations/:id/messages` |
| GET | `/api/v1/communication/conversations/:id/messages` |
| GET | `/api/v1/communication/notifications/inbox` |
| POST | `/api/v1/communication/notifications/sms/test` |
| GET | `/api/v1/dashboard/admin` |
| GET | `/api/v1/dashboard/parent` |
| GET | `/api/v1/dashboard/teacher` |
| POST | `/api/v1/exams` |
| GET | `/api/v1/exams` |
| GET | `/api/v1/exams/:id` |
| PUT | `/api/v1/exams/:id` |
| DELETE | `/api/v1/exams/:id` |
| PUT | `/api/v1/exams/:id/publish` |
| PATCH | `/api/v1/exams/hall-tickets/:id/status` |
| GET | `/api/v1/exams/hall-tickets/exam/:examId` |
| POST | `/api/v1/exams/hall-tickets/generate/:examId` |
| GET | `/api/v1/exams/hall-tickets/student/:studentId` |
| POST | `/api/v1/exams/rechecks` |
| GET | `/api/v1/exams/rechecks` |
| PATCH | `/api/v1/exams/rechecks/:id/process` |
| GET | `/api/v1/exams/report-cards/download/:studentId` |
| POST | `/api/v1/exams/report-cards/generate/:studentId` |
| GET | `/api/v1/exams/report-cards/student/:studentId` |
| PATCH | `/api/v1/exams/seating/:studentId` |
| POST | `/api/v1/exams/seating/generate` |
| GET | `/api/v1/exams/seating/section/:sectionId` |
| POST | `/api/v1/finance/rte-students` |
| GET | `/api/v1/finance/rte-students` |
| PATCH | `/api/v1/finance/rte-students/:id/reimbursement` |
| POST | `/api/v1/homework` |
| PATCH | `/api/v1/homework/:id` |
| DELETE | `/api/v1/homework/:id` |
| POST | `/api/v1/homework/notify` |
| GET | `/api/v1/homework/section/:sectionId` |
| PATCH | `/api/v1/homework/submission/:id/grade` |
| GET | `/api/v1/homework/submissions/:homeworkId` |
| POST | `/api/v1/homework/submit` |
| PATCH | `/api/v1/leaves/:id/status` |
| POST | `/api/v1/leaves/apply` |
| GET | `/api/v1/leaves/balances` |
| PATCH | `/api/v1/leaves/balances/:balanceId` |
| POST | `/api/v1/leaves/balances/init/:staffId` |
| GET | `/api/v1/leaves/history` |
| POST | `/api/v1/leaves/types` |
| GET | `/api/v1/leaves/types` |
| GET | `/api/v1/marks` |
| POST | `/api/v1/marks/bulk` |
| GET | `/api/v1/marks/class-analysis` |
| POST | `/api/v1/marks/lock` |
| GET | `/api/v1/marks/student/:studentId` |
| POST | `/api/v1/marks/unlock` |
| GET | `/api/v1/payroll/salary-structure/:staffId` |
| POST | `/api/v1/payroll/salary-structure/:staffId` |
| GET | `/api/v1/staff` |
| PATCH | `/api/v1/staff/:id` |
| GET | `/api/v1/staff/:id` |
| POST | `/api/v1/staff/:id/documents` |
| GET | `/api/v1/staff/:id/documents` |
| DELETE | `/api/v1/staff/:id/documents/:documentId` |
| POST | `/api/v1/staff/:id/profile-photo` |
| POST | `/api/v1/staff/onboard` |
| GET | `/api/v1/students` |
| GET | `/api/v1/students/:id` |
| PATCH | `/api/v1/students/:id` |
| POST | `/api/v1/students/:id/documents` |
| GET | `/api/v1/students/:id/documents` |
| PATCH | `/api/v1/students/:id/graduate` |
| PATCH | `/api/v1/students/:id/guardian-contact` |
| POST | `/api/v1/students/:id/issue-tc` |
| POST | `/api/v1/students/:id/profile-photo` |
| PATCH | `/api/v1/students/:id/promote` |
| PATCH | `/api/v1/students/:id/withdraw` |
| POST | `/api/v1/students/admit` |
| POST | `/api/v1/students/bulk-promote` |
| POST | `/api/v1/students/import` |
| GET | `/api/v1/students/search` |
| POST | `/api/v1/students/sync-siblings` |
| POST | `/api/v1/timetable` |
| GET | `/api/v1/timetable/section/:sectionId` |
| GET | `/api/v1/timetable/structure` |
| PATCH | `/api/v1/timetable/structure/:id` |
| GET | `/api/v1/timetable/teacher/:teacherId` |
| GET | `/api/v1/transport/attendance` |
| POST | `/api/v1/transport/attendance` |
| POST | `/api/v1/transport/attendance/bulk` |
| GET | `/api/v1/transport/students` |

</details>

### STUDENT APP - 77 APIs

<details>
<summary>Click to expand student APIs</summary>

| Method | Endpoint |
|--------|----------|
| POST | `/api/v1/academics/timetable` |
| GET | `/api/v1/academics/timetable/section/:sectionId` |
| GET | `/api/v1/attendance` |
| POST | `/api/v1/attendance/mark` |
| GET | `/api/v1/attendance/stats` |
| POST | `/api/v1/certificates/issue` |
| GET | `/api/v1/certificates/issued` |
| POST | `/api/v1/certificates/request` |
| GET | `/api/v1/certificates/types` |
| POST | `/api/v1/certificates/types` |
| GET | `/api/v1/certificates/validate/:uuid` |
| POST | `/api/v1/communication/announcements` |
| GET | `/api/v1/communication/announcements` |
| POST | `/api/v1/communication/announcements/:id` |
| POST | `/api/v1/communication/announcements/:id/delete` |
| GET | `/api/v1/communication/announcements/manage` |
| GET | `/api/v1/communication/conversations` |
| POST | `/api/v1/communication/conversations` |
| POST | `/api/v1/communication/conversations/:id/messages` |
| GET | `/api/v1/communication/conversations/:id/messages` |
| GET | `/api/v1/communication/notifications/inbox` |
| POST | `/api/v1/communication/notifications/sms/test` |
| POST | `/api/v1/exams` |
| GET | `/api/v1/exams` |
| GET | `/api/v1/exams/:id` |
| PUT | `/api/v1/exams/:id` |
| DELETE | `/api/v1/exams/:id` |
| PUT | `/api/v1/exams/:id/publish` |
| PATCH | `/api/v1/exams/hall-tickets/:id/status` |
| GET | `/api/v1/exams/hall-tickets/exam/:examId` |
| POST | `/api/v1/exams/hall-tickets/generate/:examId` |
| GET | `/api/v1/exams/hall-tickets/student/:studentId` |
| POST | `/api/v1/exams/rechecks` |
| GET | `/api/v1/exams/rechecks` |
| PATCH | `/api/v1/exams/rechecks/:id/process` |
| GET | `/api/v1/exams/report-cards/download/:studentId` |
| POST | `/api/v1/exams/report-cards/generate/:studentId` |
| GET | `/api/v1/exams/report-cards/student/:studentId` |
| PATCH | `/api/v1/exams/seating/:studentId` |
| POST | `/api/v1/exams/seating/generate` |
| GET | `/api/v1/exams/seating/section/:sectionId` |
| GET | `/api/v1/health` |
| POST | `/api/v1/health/incidents` |
| GET | `/api/v1/health/ready` |
| POST | `/api/v1/health/records` |
| GET | `/api/v1/health/records/:studentId` |
| GET | `/api/v1/health/status` |
| POST | `/api/v1/homework` |
| PATCH | `/api/v1/homework/:id` |
| DELETE | `/api/v1/homework/:id` |
| POST | `/api/v1/homework/notify` |
| GET | `/api/v1/homework/section/:sectionId` |
| PATCH | `/api/v1/homework/submission/:id/grade` |
| GET | `/api/v1/homework/submissions/:homeworkId` |
| POST | `/api/v1/homework/submit` |
| GET | `/api/v1/library/books` |
| POST | `/api/v1/library/books` |
| GET | `/api/v1/library/books/export` |
| POST | `/api/v1/library/circulate` |
| GET | `/api/v1/library/circulation` |
| POST | `/api/v1/library/member/register` |
| GET | `/api/v1/marks` |
| POST | `/api/v1/marks/bulk` |
| GET | `/api/v1/marks/class-analysis` |
| POST | `/api/v1/marks/lock` |
| GET | `/api/v1/marks/student/:studentId` |
| POST | `/api/v1/marks/unlock` |
| GET | `/api/v1/platform/system-health-checks` |
| POST | `/api/v1/platform/system-health-checks` |
| POST | `/api/v1/timetable` |
| GET | `/api/v1/timetable/section/:sectionId` |
| GET | `/api/v1/timetable/structure` |
| PATCH | `/api/v1/timetable/structure/:id` |
| GET | `/api/v1/timetable/teacher/:teacherId` |
| GET | `/api/v1/transport/attendance` |
| POST | `/api/v1/transport/attendance` |
| POST | `/api/v1/transport/attendance/bulk` |

</details>

### DRIVER APP - 58 APIs

<details>
<summary>Click to expand driver APIs</summary>

| Method | Endpoint |
|--------|----------|
| GET | `/api/v1/attendance` |
| POST | `/api/v1/attendance/mark` |
| GET | `/api/v1/attendance/stats` |
| POST | `/api/v1/finance/rte-students` |
| GET | `/api/v1/finance/rte-students` |
| PATCH | `/api/v1/finance/rte-students/:id/reimbursement` |
| GET | `/api/v1/students` |
| GET | `/api/v1/students/:id` |
| PATCH | `/api/v1/students/:id` |
| POST | `/api/v1/students/:id/documents` |
| GET | `/api/v1/students/:id/documents` |
| PATCH | `/api/v1/students/:id/graduate` |
| PATCH | `/api/v1/students/:id/guardian-contact` |
| POST | `/api/v1/students/:id/issue-tc` |
| POST | `/api/v1/students/:id/profile-photo` |
| PATCH | `/api/v1/students/:id/promote` |
| PATCH | `/api/v1/students/:id/withdraw` |
| POST | `/api/v1/students/admit` |
| POST | `/api/v1/students/bulk-promote` |
| POST | `/api/v1/students/import` |
| GET | `/api/v1/students/search` |
| POST | `/api/v1/students/sync-siblings` |
| POST | `/api/v1/transport/assign` |
| DELETE | `/api/v1/transport/assign/:id` |
| GET | `/api/v1/transport/attendance` |
| POST | `/api/v1/transport/attendance` |
| POST | `/api/v1/transport/attendance/bulk` |
| GET | `/api/v1/transport/compliance-alerts` |
| GET | `/api/v1/transport/drivers` |
| POST | `/api/v1/transport/drivers` |
| PATCH | `/api/v1/transport/drivers/:id` |
| DELETE | `/api/v1/transport/drivers/:id` |
| POST | `/api/v1/transport/fee-invoices/generate` |
| GET | `/api/v1/transport/fee-slabs` |
| POST | `/api/v1/transport/fee-slabs` |
| PATCH | `/api/v1/transport/fee-slabs/:id` |
| DELETE | `/api/v1/transport/fee-slabs/:id` |
| GET | `/api/v1/transport/fuel-logs` |
| POST | `/api/v1/transport/gps-update/:vehicleId` |
| GET | `/api/v1/transport/live-tracking` |
| GET | `/api/v1/transport/ping` |
| GET | `/api/v1/transport/routes` |
| POST | `/api/v1/transport/routes` |
| PATCH | `/api/v1/transport/routes/:id` |
| DELETE | `/api/v1/transport/routes/:id` |
| POST | `/api/v1/transport/routes/:id/compute-path` |
| POST | `/api/v1/transport/routes/:id/stops` |
| PATCH | `/api/v1/transport/routes/:id/stops/:stopId` |
| DELETE | `/api/v1/transport/routes/:id/stops/:stopId` |
| GET | `/api/v1/transport/stats` |
| GET | `/api/v1/transport/students` |
| GET | `/api/v1/transport/vehicles` |
| POST | `/api/v1/transport/vehicles` |
| PATCH | `/api/v1/transport/vehicles/:id` |
| DELETE | `/api/v1/transport/vehicles/:id` |
| POST | `/api/v1/transport/vehicles/:id/fuel` |
| GET | `/api/v1/transport/vehicles/:id/maintenance` |
| POST | `/api/v1/transport/vehicles/:id/maintenance` |

</details>

---

## 📊 Statistics

### APIs by HTTP Method

- **DELETE:** 34 APIs
- **GET:** 158 APIs
- **PATCH:** 55 APIs
- **POST:** 150 APIs
- **PUT:** 6 APIs

### APIs by Mobile App

- 🟢 **Parent App:** 122 APIs
- 🔵 **Teacher App:** 104 APIs
- 🟡 **Student App:** 77 APIs
- 🟠 **Driver App:** 58 APIs
- 🔴 **Web Only:** 87 APIs

---

## ✅ Documentation Complete

This comprehensive API documentation includes all 403 APIs in the system.
Mobile team can filter by their specific app needs using the tables above.

