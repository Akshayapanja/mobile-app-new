import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.API_BASE_URL || 'https://api.intants.com';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type RetryRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('intants_token');
      const schoolId = await AsyncStorage.getItem('intants_school_id');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (schoolId) {
        config.headers['x-school-id'] = schoolId;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Request interceptor error:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('intants_refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/api/v1/auth/token/refresh`, {
            refreshToken,
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { token } = (response.data as any) ?? {};
          if (token) {
            await AsyncStorage.setItem('intants_token', token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        }
      } catch {
        await AsyncStorage.multiRemove([
          'intants_token',
          'intants_refresh_token',
          'intants_user',
          'intants_school_id',
        ]);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
