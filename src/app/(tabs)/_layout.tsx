import { Tabs, useFocusEffect } from 'expo-router';
import { House, ClipboardList, ShoppingCart, User2 } from 'lucide-react-native';
import useItemsStore from "@/store/useItemsStore";
import { Text, View } from 'react-native';
import { useCallback, useMemo } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function TabsLayout() {
  const items = useItemsStore((state) => state.items);
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity ?? 0), 0),
    [items]
  );

  const onFocusPrune = useCallback(() => {
    const id = setTimeout(() => {
      useItemsStore.getState().pruneExpired();
    }, 0);
    return () => clearTimeout(id);
  }, []);
  useFocusEffect(onFocusPrune);

  return (
        <KeyboardProvider>
    <Tabs screenOptions={{ tabBarActiveTintColor: '#895100' }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <House color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <ShoppingCart color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
             
                <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">{totalItems}</Text>
                </View>
             
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <ClipboardList color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
          ),
        }}
      />
      <Tabs.Screen name="profile" options={{
        headerShown: false,
        title: 'Profile',
        tabBarIcon: ({ color, focused }) => (
          <User2 color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
        ),
      }}
       />
      </Tabs>
        </KeyboardProvider>
  );
}