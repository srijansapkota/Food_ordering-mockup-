import useAuthStore from '@/store/useAuthStore';
import { Redirect, Stack } from 'expo-router';

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);

  // Defense in depth: the root layout already redirects non-admins out of
  // this group, but this guard keeps the group safe even if it's ever
  // reached directly (e.g. deep link) before the root redirect runs.
  if (user?.role !== 'admin') {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}