import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigationContainerRef } from '@react-navigation/native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore, useSchoolStore } from './src/stores';
import { OfflineBanner } from './src/components/common';
import { notificationService, useNotificationListeners } from './src/services/notification.service';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default function App() {
  const navigationRef = useNavigationContainerRef<any>();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const loadFromStorage = useAuthStore(state => state.loadFromStorage);
  const loadSchool = useSchoolStore(state => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
    loadSchool();
  }, [loadFromStorage, loadSchool]);

  useEffect(() => {
    notificationService.registerForPushNotifications();
  }, []);

  useEffect(() => {
    const cleanup = useNotificationListeners(data => {
      console.log('Notification received:', data);
      if (data?.screen && navigationRef.isReady()) {
        navigationRef.navigate(data.screen as never);
      }
    });
    return cleanup;
  }, [navigationRef]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A90D9" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <OfflineBanner />
        <StatusBar style="auto" />
        <AppNavigator navigationRef={navigationRef} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
