import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import api from './api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {
  registerForPushNotifications: async (): Promise<string | null> => {
    try {
      if (!Device.isDevice) {
        return null;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return null;
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      await AsyncStorage.setItem('push_token', token.data);

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#4A90D9',
        });
      }

      try {
        await api.patch('/api/v1/auth/me', { pushToken: token.data });
      } catch (err) {
        // TODO: handle error
      }

      return token.data;
    } catch (err) {
      // TODO: handle error
      return null;
    }
  },

  scheduleLocalNotification: async (title: string, body: string, data?: Record<string, unknown>) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: true,
      },
      trigger: null,
    });
  },

  cancelAllNotifications: async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  getBadgeCount: async () => {
    return await Notifications.getBadgeCountAsync();
  },

  setBadgeCount: async (count: number) => {
    await Notifications.setBadgeCountAsync(count);
  },

  clearBadge: async () => {
    await Notifications.setBadgeCountAsync(0);
  },
};

export const useNotificationListeners = (onNotification: (data: Record<string, unknown>) => void) => {
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    onNotification(notification.request.content.data as Record<string, unknown>);
  });

  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    onNotification(response.notification.request.content.data as Record<string, unknown>);
  });

  return () => {
    notificationListener.remove();
    responseListener.remove();
  };
};

