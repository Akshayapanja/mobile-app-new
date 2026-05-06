import { create } from 'zustand';

interface NotificationState {
  unreadCount: number;
  notifications: any[];
  setUnreadCount: (count: number) => void;
  setNotifications: (items: any[]) => void;
  markAllRead: () => void;
  addNotification: (item: any) => void;
}

export const useNotificationStore = create<NotificationState>(set => ({
  unreadCount: 0,
  notifications: [],

  setUnreadCount: count => set({ unreadCount: count }),

  setNotifications: notifications =>
    set({
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length,
    }),

  markAllRead: () =>
    set(state => ({
      unreadCount: 0,
      notifications: state.notifications.map(n => ({ ...n, isRead: true })),
    })),

  addNotification: item =>
    set(state => ({
      notifications: [item, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
}));

