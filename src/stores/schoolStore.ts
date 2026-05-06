import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface School {
  id: string;
  name: string;
  address: string;
  shortName?: string;
  logo?: string;
}

interface SchoolState {
  school: School | null;
  setSchool: (school: School) => void;
  clearSchool: () => void;
  loadFromStorage: () => Promise<void>;
}

export const useSchoolStore = create<SchoolState>(set => ({
  school: null,

  setSchool: async school => {
    set({ school });
    await AsyncStorage.setItem('intants_school', JSON.stringify(school));
  },

  clearSchool: async () => {
    set({ school: null });
    await AsyncStorage.removeItem('intants_school');
  },

  loadFromStorage: async () => {
    try {
      const schoolStr = await AsyncStorage.getItem('intants_school');
      if (schoolStr) {
        set({ school: JSON.parse(schoolStr) });
      }
    } catch (err) {
      console.log('Load school from storage:', err);
    }
  },
}));

