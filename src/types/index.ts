export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'parent' | 'teacher' | 'driver';
  roles?: string[];
  schoolId?: string;
  employeeId?: string;
  designation?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  logo?: string;
  phone?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Child {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  regNo?: string;
  photo?: string;
  attendance?: number;
  rank?: string;
  homework?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'leave' | 'holiday';
  studentId: string;
  markedBy?: string;
}

export interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  percentage: number;
}

export interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  class: string;
  section: string;
  maxMarks?: number;
  submittedAt?: string;
  status: 'pending' | 'submitted' | 'overdue';
  grade?: string;
}

export interface FeeInvoice {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidAt?: string;
  receiptNo?: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  isRead: boolean;
  type?: 'text' | 'image';
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: string;
  participantInitials: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  audience: string;
  priority: 'normal' | 'urgent';
  createdBy?: string;
}

export interface LeaveApplication {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt?: string;
  approvedBy?: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  subject: string;
  class: string;
  section: string;
  room: string;
  startTime: string;
  endTime: string;
  teacherName?: string;
}

export interface ExamResult {
  id: string;
  examName: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  percentage: number;
}

export interface Staff {
  id: string;
  name: string;
  employeeId: string;
  designation: string;
  department: string;
  phone: string;
  email?: string;
  subject?: string;
  classes?: string[];
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  admissionNo: string;
  parentPhone: string;
  status: 'active' | 'inactive';
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNo: string;
  licenseExpiry: string;
  vehicleId: string;
  routeId: string;
  employeeId?: string;
}

export interface Vehicle {
  id: string;
  vehicleNo: string;
  type: string;
  capacity: number;
  routeId?: string;
  driverId?: string;
}

export interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  totalStudents?: number;
  stops?: Stop[];
}

export interface Stop {
  id: string;
  name: string;
  time: string;
  latitude?: number;
  longitude?: number;
  students?: Student[];
}

export interface GPSLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
  vehicleId: string;
  speed?: number;
}

export interface TransportAttendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  pickupStatus: 'picked' | 'not_available' | 'absent';
  dropStatus?: 'dropped' | 'not_dropped';
  vehicleId: string;
  routeId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'exam' | 'event' | 'ptm' | 'meeting';
  description?: string;
}

export interface Payslip {
  id: string;
  month: string;
  year: string;
  basicSalary: number;
  hra: number;
  transportAllowance: number;
  medicalAllowance: number;
  totalEarnings: number;
  pfDeduction: number;
  professionalTax: number;
  totalDeductions: number;
  netPay: number;
}

export interface LeaveBalance {
  casual: number;
  medical: number;
  personal: number;
}
