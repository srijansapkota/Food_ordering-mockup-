import { useEffect, useState } from "react";
import { FlatList, View, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/store/useAuthStore";
import { subscribeToOrders } from "@/services/order";
import { Order } from "@/types/types.order";
import { OrderListHeader } from "@/components/OrderListHeader";
import { OrderItemComponents } from "@/components/OrderItemComponents";


export default function OrdersScreen() {
  const {OrderItemRow, STATUS_STYLES} = OrderItemComponents()
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) return;

    setLoading(true);
    const unsubscribe = subscribeToOrders(
      uid,
      (data) => {
        setOrders(data);
        setLoading(false);
      },
      () => {
        ToastAndroid.show("Failed to load orders", ToastAndroid.SHORT);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="flex-1"
        ListHeaderComponent=<OrderListHeader />
        data={orders}
        keyExtractor={(order) => order.id}
        renderItem={({ item: order }) => (
          <View className="mx-5 mb-4 p-4 bg-gray-50 rounded-2xl border border-[#895100]">
            {order.items.map((line, idx) => (
              <OrderItemRow key={idx} item={line} />
            ))}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}