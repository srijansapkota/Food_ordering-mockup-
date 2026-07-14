import { AdminOrder } from "@/admin/services/adminOrders";
import { User } from "lucide-react-native";
import { Text, View } from "react-native";
import OrderItemRow  from "./OrderItemRow";

export default function OrderCard({
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
    <View className="mx-5 mb-5 p-4 bg-gray-50 rounded-2xl border border-[#895100] shadow-lg">
      <View className="flex-row items-center gap-3 mb-4 shadow-lg">
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