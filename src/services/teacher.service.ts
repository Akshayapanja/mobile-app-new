import api from './api';

export const teacherService = {
  getDashboard: async () => {
    const response = await api.get('/api/v1/dashboard/teacher');
    return response.data;
  },

  getAttendance: async (params?: { classId?: string; sectionId?: string; date?: string }) => {
    const response = await api.get('/api/v1/attendance', { params });
    return response.data;
  },

  markAttendance: async (data: {
    sectionId: string;
    date: string;
    attendance: Array<{ studentId: string; status: 'present' | 'absent' | 'leave' }>;
  }) => {
    const response = await api.post('/api/v1/attendance/mark', data);
    return response.data;
  },

  getHomework: async (sectionId: string) => {
    const response = await api.get(`/api/v1/homework/section/${sectionId}`);
    return response.data;
  },

  createHomework: async (data: {
    title: string;
    subject: string;
    description: string;
    dueDate: string;
    sectionId: string;
    maxMarks?: number;
  }) => {
    const response = await api.post('/api/v1/homework', data);
    return response.data;
  },

  updateHomework: async (id: string, data: object) => {
    const response = await api.patch(`/api/v1/homework/${id}`, data);
    return response.data;
  },

  deleteHomework: async (id: string) => {
    const response = await api.delete(`/api/v1/homework/${id}`);
    return response.data;
  },

  getSubmissions: async (homeworkId: string) => {
    const response = await api.get(`/api/v1/homework/submissions/${homeworkId}`);
    return response.data;
  },

  gradeSubmission: async (submissionId: string, grade: string) => {
    const response = await api.patch(`/api/v1/homework/submission/${submissionId}/grade`, {
      grade,
    });
    return response.data;
  },

  getStudents: async (params?: { classId?: string; sectionId?: string }) => {
    const response = await api.get('/api/v1/students', { params });
    return response.data;
  },

  getMarks: async (params?: { classId?: string; sectionId?: string; examId?: string }) => {
    const response = await api.get('/api/v1/marks', { params });
    return response.data;
  },

  submitMarks: async (data: {
    examId: string;
    sectionId: string;
    marks: Array<{ studentId: string; marks: number; subject: string }>;
  }) => {
    const response = await api.post('/api/v1/marks/bulk', data);
    return response.data;
  },

  lockMarks: async (data: { examId: string; sectionId: string }) => {
    const response = await api.post('/api/v1/marks/lock', data);
    return response.data;
  },

  getTimetable: async (teacherId: string) => {
    const response = await api.get(`/api/v1/timetable/teacher/${teacherId}`);
    return response.data;
  },

  getAnnouncements: async () => {
    const response = await api.get('/api/v1/communication/announcements');
    return response.data;
  },

  createAnnouncement: async (data: {
    title: string;
    content: string;
    audience: string;
    priority?: string;
  }) => {
    const response = await api.post('/api/v1/communication/announcements', data);
    return response.data;
  },

  getConversations: async () => {
    const response = await api.get('/api/v1/communication/conversations');
    return response.data;
  },

  sendMessage: async (conversationId: string, content: string) => {
    const response = await api.post(`/api/v1/communication/conversations/${conversationId}/messages`, {
      content,
    });
    return response.data;
  },

  getNotifications: async () => {
    const response = await api.get('/api/v1/communication/notifications/inbox');
    return response.data;
  },

  applyLeave: async (data: { type: string; fromDate: string; toDate: string; reason: string }) => {
    const response = await api.post('/api/v1/leaves/apply', data);
    return response.data;
  },

  getLeaves: async () => {
    const response = await api.get('/api/v1/leaves/applications');
    return response.data;
  },

  getPayslips: async () => {
    const response = await api.get('/api/v1/payroll/payslips');
    return response.data;
  },

  getCalendar: async () => {
    const response = await api.get('/api/v1/academics/calendar');
    return response.data;
  },

  askAI: async (question: string) => {
    const response = await api.post('/api/v1/ai-chat/ask', { question });
    return response.data;
  },

  broadcastMessage: async (data: { title: string; content: string; audience: string }) => {
    const response = await api.post('/api/v1/communication/announcements', data);
    return response.data;
  },

  getClassAnalysis: async (params?: { classId?: string; examId?: string }) => {
    const response = await api.get('/api/v1/marks/class-analysis', { params });
    return response.data;
  },
};
