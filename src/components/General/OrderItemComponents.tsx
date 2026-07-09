import { getMenuImageUrl } from "@/lib/cloudinary";
import { ItemStatus, OrderItem } from "@/types/types.order";
import { View,Image,Text } from "react-native";

export const OrderItemComponents = () => {
  
  const STATUS_STYLES: Record<ItemStatus, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
    delivered: { bg: "bg-green-100", text: "text-green-700", label: "Delivered" },
    cancelled: { bg: "bg-red-100", text: "text-red-700", label: "Cancelled" },
  };
  
  const OrderItemRow = ({ item }: { item: OrderItem }) => {
    const statusStyle = STATUS_STYLES[item.status] ?? STATUS_STYLES.pending;
    return (
      <View className="flex-row items-center py-4">
        <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center overflow-hidden">
          <Image source={{ uri: getMenuImageUrl(item.image) }} className="w-full h-full" resizeMode="cover" />
        </View>
        <View className="flex-1 ml-3 flex-row items-center">
          <View>
          <Text className="text-sm font-bold text-gray-900">{item.title}</Text>
          <Text className="text-xs text-gray-500 mt-0.5 font-bold">
            Qty {item.quantity}
            </Text>
          </View>
        </View>
        <View>
          <View className={`self-start mt-1 px-2 py-0.5 rounded-full ${statusStyle.bg}`}>
            <Text className={`text-[11px] font-semibold ${statusStyle.text}`}>{statusStyle.label}</Text>
          </View>
        </View>
        <Text className="text-sm font-bold text-[#895100] ml-2">{item.price}</Text>
      </View>
    );
  };
  return { OrderItemRow, STATUS_STYLES };
}