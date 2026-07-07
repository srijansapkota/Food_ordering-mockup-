import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, User } from 'lucide-react-native';
import  useAdminOrders  from './hooks/useAdminOrders';
import { useUnseenCount } from '@/hooks/useUnseenCount';
import { NotificationBell } from '@/components/NotificationBell';
import useAuthStore from '@/store/useAuthStore';  
import OrderCard from './components/OrderCard';



export default function AdminOrdersScreen() {
  const { orders, loading, updatingKey, markDelivered, cancelItem } = useAdminOrders();
  const liveOrders = orders.filter((order)=>order.items.some((item)=>item.status === 'pending'))
  const { hasUnseen, acknowledge } = useUnseenCount('admin-orders-seen', orders.length);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#895100" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-5 pt-4 pb-2 gap-3">
        <Image
          source={require("../../../assets/images/Icon.webp")}
          className="w-10 h-10 rounded-xl"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-[#895100] tracking-tight">
          QuickBites
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2 mb-4 ">
        <Text className="text-2xl font-bold text-[#895100] tracking-tight">Orders</Text>
        <View>
        <Pressable onPress={() => useAuthStore.getState().signout()}>
          <LogOut size={24} color="#895100" />
        </Pressable>
          <NotificationBell hasUnseen={hasUnseen} onPress={acknowledge} />
        </View>
      </View>
      <FlatList
        data={liveOrders}
        keyExtractor={(order) => order.id}
        renderItem={({ item: order }) => (
          <OrderCard
            order={order}
            updatingKey={updatingKey}
            onDeliver={(menuId) => markDelivered(order.id, menuId)}
            onCancel={(menuId) => cancelItem(order.id, menuId)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">No orders yet</Text>
        }
      />
    </SafeAreaView>
  );
}