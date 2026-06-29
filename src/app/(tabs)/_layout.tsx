import { Tabs } from 'expo-router';
import { House, ClipboardList, ShoppingCart } from 'lucide-react-native';
import useItemsStore from "@/store/useItemsStore";
import { Text, View } from 'react-native';

export default function TabsLayout() {
  const { items } = useItemsStore();
  const totalItems = items.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  return (
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
        name="orders"
        options={{
          headerShown: false,
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <ClipboardList color={color} size={24} strokeWidth={focused ? 2.5 : 1.5} />
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
              {totalItems > 0 && (
                <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">{totalItems}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}