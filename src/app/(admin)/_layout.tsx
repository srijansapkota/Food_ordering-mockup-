import useAuthStore from '@/store/useAuthStore';
import { Redirect, Tabs } from 'expo-router';
import { History, Home } from 'lucide-react-native';

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  if (user?.role !== 'admin') {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#895100' }}>
      <Tabs.Screen name='index' options={{
        headerShown: false,
        title: 'Home',
        tabBarIcon: ({ color, focused }) => (
          <Home color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
        )
      }}
      />
      <Tabs.Screen name='history' options={{
        headerShown: false,
        title: 'History',
        tabBarIcon: ({ color, focused }) => (
          <History color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
        )
      }}
      />
    </Tabs>
  );
}