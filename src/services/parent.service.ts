import api from './api';

export const parentService = {
  getDashboard: async () => {
    const response = await api.get('/api/v1/dashboard/parent');
    return response.data;
  },

  getChildren: async () => {
    const response = await api.get('/api/v1/students');
    return response.data;
  },

  getChildById: async (id: string) => {
    const response = await api.get(`/api/v1/students/${id}`);
    return response.data;
  },

  getAttendance: async (params?: { studentId?: string; month?: number; year?: number }) => {
    const response = await api.get('/api/v1/attendance', { params });
    return response.data;
  },

  getAttendanceStats: async (params?: { studentId?: string }) => {
    const response = await api.get('/api/v1/attendance/stats', { params });
    return response.data;
  },

  getTimetable: async (sectionId: string) => {
    const response = await api.get(`/api/v1/academics/timetable/section/${sectionId}`);
    return response.data;
  },

  getHomework: async (sectionId: string) => {
    const response = await api.get(`/api/v1/homework/section/${sectionId}`);
    return response.data;
  },

  submitHomework: async (data: { homeworkId: string; content?: string }) => {
    const response = await api.post('/api/v1/homework/submit', data);
    return response.data;
  },

  getResults: async (studentId: string) => {
    const response = await api.get(`/api/v1/marks/student/${studentId}`);
    return response.data;
  },

  getExams: async () => {
    const response = await api.get('/api/v1/exams');
    return response.data;
  },

  getFeeInvoices: async (studentId: string) => {
    const response = await api.get(`/api/v1/fee-invoices/student/${studentId}`);
    return response.data;
  },

  getFeePayments: async () => {
    const response = await api.get('/api/v1/fee-payments');
    return response.data;
  },

  applyLeave: async (data: {
    studentId: string;
    type: string;
    fromDate: string;
    toDate: string;
    reason: string;
  }) => {
    const response = await api.post('/api/v1/leaves/apply', data);
    return response.data;
  },

  getAnnouncements: async () => {
    const response = await api.get('/api/v1/communication/announcements');
    return response.data;
  },

  getConversations: async () => {
    const response = await api.get('/api/v1/communication/conversations');
    return response.data;
  },

  createConversation: async (data: { participantId: string; message: string }) => {
    const response = await api.post('/api/v1/communication/conversations', data);
    return response.data;
  },

  getMessages: async (conversationId: string) => {
    const response = await api.get(
      `/api/v1/communication/conversations/${conversationId}/messages`
    );
    return response.data;
  },

  sendMessage: async (conversationId: string, content: string) => {
    const response = await api.post(
      `/api/v1/communication/conversations/${conversationId}/messages`,
      { content }
    );
    return response.data;
  },

  getNotifications: async () => {
    const response = await api.get('/api/v1/communication/notifications/inbox');
    return response.data;
  },

  getCalendar: async () => {
    const response = await api.get('/api/v1/academics/calendar');
    return response.data;
  },

  getLiveTracking: async () => {
    const response = await api.get('/api/v1/transport/live-tracking');
    return response.data;
  },

  getReportCard: async (studentId: string) => {
    const response = await api.get(`/api/v1/exams/report-cards/student/${studentId}`);
    return response.data;
  },

  requestCertificate: async (data: { studentId: string; type: string }) => {
    const response = await api.post('/api/v1/certificates/request', data);
    return response.data;
  },

  getHallTicket: async (studentId: string) => {
    const response = await api.get(`/api/v1/exams/hall-tickets/student/${studentId}`);
    return response.data;
  },
};
