import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  schoolId: string | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  setSchoolId: (id: string) => void;
  clearAuth: () => void;
  loadFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  schoolId: null,
  isAuthenticated: false,

  setUser: user =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setToken: token => set({ token }),

  setSchoolId: schoolId => set({ schoolId }),

  clearAuth: () =>
    set({
      user: null,
      token: null,
      schoolId: null,
      isAuthenticated: false,
    }),

  loadFromStorage: async () => {
    try {
      const [userStr, token, schoolId] = await AsyncStorage.multiGet([
        'intants_user',
        'intants_token',
        'intants_school_id',
      ]);

      const user = userStr[1] ? JSON.parse(userStr[1]) : null;

      set({
        user,
        token: token[1],
        schoolId: schoolId[1],
        isAuthenticated: !!user,
      });
    } catch (err) {
      // TODO: handle error properly
    }
  },
}));

