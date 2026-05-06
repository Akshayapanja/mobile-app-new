import { z } from 'zod';

// Phone number validation
export const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, 'Phone must be 10 digits')
    .max(10, 'Phone must be 10 digits')
    .regex(/^[0-9]+$/, 'Phone must contain only numbers'),
});

// OTP validation
export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^[0-9]+$/, 'OTP must contain only numbers'),
});

// Apply Leave validation (Parent)
export const applyLeaveSchema = z.object({
  leaveType: z.string().min(1, 'Please select leave type'),
  fromDate: z.string().min(1, 'Please select from date'),
  toDate: z.string().min(1, 'Please select to date'),
  reason: z.string().min(10, 'Reason must be at least 10 characters').max(500, 'Reason too long'),
});

// Create Homework validation
export const createHomeworkSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description too long'),
  subject: z.string().min(1, 'Please enter subject'),
  dueDate: z.string().min(1, 'Please select due date'),
  maxMarks: z.string().regex(/^[0-9]+$/, 'Marks must be a number').optional(),
});

// Staff Apply Leave validation
export const staffLeaveSchema = z.object({
  leaveType: z.string().min(1, 'Please select leave type'),
  fromDate: z.string().min(1, 'Please select from date'),
  toDate: z.string().min(1, 'Please select to date'),
  reason: z.string().min(10, 'Reason must be at least 10 characters').max(500, 'Reason too long'),
});

// Message validation
export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long'),
});

// Broadcast message validation
export const broadcastSchema = z.object({
  message: z.string().min(1, 'Please type a message').max(500, 'Message too long'),
  selectedClass: z.string().min(1, 'Please select a class'),
  selectedSection: z.string().min(1, 'Please select a section'),
});

// Marks entry validation
export const marksSchema = z.object({
  marks: z
    .string()
    .regex(/^[0-9]+$/, 'Marks must be a number')
    .refine(val => parseInt(val) <= 100, 'Marks cannot exceed 100'),
});

export type PhoneFormData = z.infer<typeof phoneSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
export type ApplyLeaveFormData = z.infer<typeof applyLeaveSchema>;
export type CreateHomeworkFormData = z.infer<typeof createHomeworkSchema>;
export type StaffLeaveFormData = z.infer<typeof staffLeaveSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type BroadcastFormData = z.infer<typeof broadcastSchema>;

