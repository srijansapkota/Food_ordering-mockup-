import useAuthStore from '@/store/useAuthStore';
import { Redirect, Stack, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Toast, { toastRef } from '@/components/Toast';
import '../global.css';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const { isLoggedIn, isLoading } = useAuthStore();
  const segments = useSegments();
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);
 
  if (!isLoading) {
    const inAuthGroup = segments[0] === '(auth)';
    if (!isLoggedIn && !inAuthGroup) {
      return <Redirect href="/(auth)/login"  />;
    }
    if (isLoggedIn && inAuthGroup) {
      return <Redirect href="/(tabs)" />;
    }
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <Toast ref={toastRef} />
    </>
  );
}