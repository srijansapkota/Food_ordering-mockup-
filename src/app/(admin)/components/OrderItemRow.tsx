import { getMenuImageUrl } from "@/lib/cloudinary";
import { OrderItem } from "@/types/types.order";
import { View,Image,Text,ActivityIndicator, Pressable } from "react-native";

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

export default function OrderItemRow({
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
    <View className="mb-3 p-4 bg-white rounded-xl border border-gray-200 flex-row items-center">
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
          <View className="gap-4">
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