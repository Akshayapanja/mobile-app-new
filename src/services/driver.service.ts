import api from './api';

export const driverService = {
  getProfile: async () => {
    const response = await api.get('/api/v1/auth/me');
    return response.data;
  },

  getMyRoute: async () => {
    const response = await api.get('/api/v1/transport/routes');
    return response.data;
  },

  getMyVehicle: async () => {
    const response = await api.get('/api/v1/transport/vehicles');
    return response.data;
  },

  getStudentsOnRoute: async () => {
    const response = await api.get('/api/v1/transport/students');
    return response.data;
  },

  getTransportAttendance: async (params?: { date?: string }) => {
    const response = await api.get('/api/v1/transport/attendance', { params });
    return response.data;
  },

  markTransportAttendance: async (data: {
    studentId: string;
    date: string;
    pickupStatus: 'picked' | 'not_available' | 'absent';
    vehicleId: string;
    routeId: string;
  }) => {
    const response = await api.post('/api/v1/transport/attendance', data);
    return response.data;
  },

  markBulkAttendance: async (data: {
    date: string;
    vehicleId: string;
    routeId: string;
    attendance: Array<{ studentId: string; pickupStatus: string }>;
  }) => {
    const response = await api.post('/api/v1/transport/attendance/bulk', data);
    return response.data;
  },

  updateGPSLocation: async (
    vehicleId: string,
    data: { latitude: number; longitude: number; speed?: number }
  ) => {
    const response = await api.post(`/api/v1/transport/gps-update/${vehicleId}`, data);
    return response.data;
  },

  getLiveTracking: async () => {
    const response = await api.get('/api/v1/transport/live-tracking');
    return response.data;
  },

  getTransportStats: async () => {
    const response = await api.get('/api/v1/transport/stats');
    return response.data;
  },

  getComplianceAlerts: async () => {
    const response = await api.get('/api/v1/transport/compliance-alerts');
    return response.data;
  },

  pingTransport: async () => {
    const response = await api.get('/api/v1/transport/ping');
    return response.data;
  },

  getNotifications: async () => {
    const response = await api.get('/api/v1/communication/notifications/inbox');
    return response.data;
  },

  getAttendanceStats: async () => {
    const response = await api.get('/api/v1/attendance/stats');
    return response.data;
  },
};
