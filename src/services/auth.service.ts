import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  sendOTP: async (phone: string) => {
    const response = await api.post('/api/v1/auth/send-otp', { phone });
    return response.data;
  },

  verifyOTP: async (phone: string, otp: string) => {
    const response = await api.post('/api/v1/auth/verify-otp', { phone, otp });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { token, refreshToken, user } = (response.data as any) ?? {};

    if (token) await AsyncStorage.setItem('intants_token', token);
    if (refreshToken) await AsyncStorage.setItem('intants_refresh_token', refreshToken);
    if (user !== undefined) await AsyncStorage.setItem('intants_user', JSON.stringify(user));

    return response.data;
  },

  selectSchool: async (schoolId: string) => {
    const response = await api.post('/api/v1/auth/school/select', { schoolId });
    await AsyncStorage.setItem('intants_school_id', schoolId);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/api/v1/auth/me');
    return response.data;
  },

  getPermissions: async () => {
    const response = await api.get('/api/v1/auth/me/permissions');
    return response.data;
  },

  switchRole: async (role: string) => {
    const response = await api.post('/api/v1/auth/switch-role', { role });
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/api/v1/auth/logout');
    } catch (error) {
      // TODO: handle error
    } finally {
      await AsyncStorage.multiRemove([
        'intants_token',
        'intants_refresh_token',
        'intants_user',
        'intants_school_id',
        'intants_school_selected',
        'login_phone',
        'sentHomework',
      ]);
    }
  },

  refreshToken: async () => {
    const refreshToken = await AsyncStorage.getItem('intants_refresh_token');
    const response = await api.post('/api/v1/auth/token/refresh', { refreshToken });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { token } = (response.data as any) ?? {};
    if (token) await AsyncStorage.setItem('intants_token', token);
    return token;
  },

  // NOTE: `all_api.md` doesn't list a `GET /api/v1/schools` route explicitly.
  // Keeping this as-is because the login flow typically needs a schools list.
  getSchools: async () => {
    const response = await api.get('/api/v1/schools');
    return response.data;
  },
};
