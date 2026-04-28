import { USERS, User } from './mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'intants_user';
const SCHOOL_SELECTED_KEY = 'intants_school_selected';
const LOGIN_PHONE_KEY = 'login_phone';

export async function login(phone: string): Promise<User | null> {
  const u = USERS.find(x => x.phone === phone);
  if (u) await AsyncStorage.setItem(KEY, JSON.stringify(u));
  return u || null;
}

export async function getUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) as User : null;
}

export async function logout() {
  await AsyncStorage.removeItem(KEY);
  await AsyncStorage.removeItem(SCHOOL_SELECTED_KEY);
  await AsyncStorage.removeItem(LOGIN_PHONE_KEY);
}

export interface SentHomework {
  id: string;
  subject: string;
  title: string;
  content: string;
  class: string;
  section: string;
  sentBy: string;
  sentAt: string;
  type: 'AI Generated';
  dueDate: string;
}

export async function isLoggedIn(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(KEY);
  return !!raw;
}

export async function setSchoolSelected(): Promise<void> {
  await AsyncStorage.setItem(SCHOOL_SELECTED_KEY, '1');
}

export async function isSchoolSelected(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(SCHOOL_SELECTED_KEY);
  return raw === '1';
}

export async function getSentHomework(): Promise<SentHomework[]> {
  const raw = await AsyncStorage.getItem('sentHomework');
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed as SentHomework[];
    if (parsed && typeof parsed === 'object') return [parsed as SentHomework];
    return [];
  } catch {
    return [];
  }
}

export async function addSentHomework(hw: SentHomework) {
  const list = await getSentHomework();
  list.unshift(hw);
  await AsyncStorage.setItem('sentHomework', JSON.stringify(list));
}
