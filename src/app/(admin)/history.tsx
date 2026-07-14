import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAdminOrders from "../../admin/hooks/useAdminOrders";
import OrderCard from "../../admin/components/OrderCard";

const OrderHistory = () => {
  const { orders, updatingKey, markDelivered, cancelItem } = useAdminOrders();
  const pastOrders = orders.filter((order) =>
    order.items.every((item) => item.status !== "pending")
  );

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

      <View className="flex-row items-center justify-between px-5 pt-4 pb-2 mb-4">
        <Text className="text-2xl font-bold text-[#895100] tracking-tight">
          History
        </Text>
      </View>

      <FlatList
        data={pastOrders}
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
          <Text className="text-center text-gray-400 mt-10">
            No past orders
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default OrderHistory;