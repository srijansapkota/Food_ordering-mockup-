import useAuthStore from '@/store/useAuthStore';
import { Redirect, Stack, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Toast, { toastRef } from '@/components/General/Toast';
import '../global.css';
import { KeyboardProvider } from 'react-native-keyboard-controller';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLoggedIn, isLoading, user } = useAuthStore();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (!isLoading) {
    const inAuthGroup = segments[0] === '(auth)';
    const inAdminGroup = segments[0] === '(admin)';
    const isAdmin = user?.role === 'admin';

    if (!isLoggedIn && !inAuthGroup) {
      return <Redirect href="/(auth)/login" />;
    }
    if (isLoggedIn && inAuthGroup) {
      return <Redirect href={isAdmin ? '/(admin)' : '/(tabs)'} />;
    }
    if (isLoggedIn && isAdmin && !inAdminGroup) {
      return <Redirect href="/(admin)" />;
    }
    if (isLoggedIn && !isAdmin && inAdminGroup) {
      return <Redirect href="/(tabs)" />;
    }
  }

  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      </Stack>
      <Toast ref={toastRef} />
    </KeyboardProvider>
  );
}