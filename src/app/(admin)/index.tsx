import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import { useAdminOrders } from './hooks/useAdminOrders';
import { getMenuImageUrl } from '@/lib/cloudinary';
import { AdminOrder } from '@/services/adminOrders';
import { OrderItem } from '@/types/types.order';
import { useUnseenCount } from '@/hooks/useUnseenCount';
import { NotificationBell } from '@/components/NotificationBell';

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-amber-50 text-[#895100]',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-600',
};

function OrderItemRow({
  item,
  orderId,
  updatingKey,
  onDeliver,
  onCancel,
}: {
  item: OrderItem;
  orderId: string;
  updatingKey: string | null;
  onDeliver: () => void;
  onCancel: () => void;
}) {
  const isUpdating = updatingKey === `${orderId}:${item.menu_id}`;

  return (
    <View className="mb-3 p-3 bg-white rounded-xl border border-gray-200 flex-row items-center">
      <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center overflow-hidden">
        <Image source={{ uri: getMenuImageUrl(item.image) }} className="w-full h-full" resizeMode="cover" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-sm font-bold text-gray-900">{item.title}</Text>
        <Text className="text-xs text-gray-500">Qty: {item.quantity}</Text>
      </View>
      {item.status === 'pending' ? (
        isUpdating ? (
          <ActivityIndicator size="small" color="#895100" />
        ) : (
          <View className="gap-2">
            <Pressable className="px-3 py-2 rounded-full bg-[#895100]" onPress={onDeliver}>
              <Text className="text-white text-xs font-bold">Mark as delivered</Text>
            </Pressable>
            <Pressable className="px-3 py-2 rounded-full bg-red-50" onPress={onCancel}>
              <Text className="text-red-600 text-xs font-bold text-center">Cancel</Text>
            </Pressable>
          </View>
        )
      ) : (
        <View className={`px-3 py-1.5 rounded-full ${STATUS_STYLE[item.status]}`}>
          <Text className="text-xs font-bold">{STATUS_LABEL[item.status]}</Text>
        </View>
      )}
    </View>
  );
}

function OrderCard({
  order,
  updatingKey,
  onDeliver,
  onCancel,
}: {
  order: AdminOrder;
  updatingKey: string | null;
  onDeliver: (menuId: number) => void;
  onCancel: (menuId: number) => void;
}) {
  return (
    <View className="mx-5 mb-5 p-4 bg-gray-50 rounded-2xl border border-[#895100]">
      <View className="flex-row items-center gap-3 mb-4">
        <View className="w-10 h-10 rounded-full bg-amber-50 items-center justify-center">
          <User color="#895100" size={20} strokeWidth={1.5} />
        </View>
        <View>
          <Text className="text-sm font-bold text-gray-900">{order.consumer.name ?? 'Unknown'}</Text>
          <Text className="text-xs text-gray-500">{order.consumer.address ?? 'No address on file'}</Text>
        </View>
      </View>
      {order.items.map((item) => (
        <OrderItemRow
          key={item.menu_id}
          item={item}
          orderId={order.id}
          updatingKey={updatingKey}
          onDeliver={() => onDeliver(item.menu_id)}
          onCancel={() => onCancel(item.menu_id)}
        />
      ))}
    </View>
  );
}

export default function AdminOrdersScreen() {
  const { orders, loading, updatingKey, markDelivered, cancelItem } = useAdminOrders();
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
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <Text className="text-2xl font-bold text-[#895100] tracking-tight">Orders</Text>
        <NotificationBell hasUnseen={hasUnseen} onPress={acknowledge} />
      </View>
      <FlatList
        data={orders}
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