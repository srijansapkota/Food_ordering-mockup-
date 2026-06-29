import useItemsStore from "@/store/useItemsStore";
import { Item } from "@/types/types.storage";
import { FlatList, Image, Pressable, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { items, reduceItem, addItem } = useItemsStore()
  const totalItems = items.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  const handleSubstraction = (id: number) => {
    reduceItem(id)
    ToastAndroid.show('Item removed from cart', ToastAndroid.BOTTOM)
  }

  const handleAddition = (item: Item) => {
    addItem({
      id: item.id,
      price: item.price,
      title: item.title,
      category: item.category,
    })
  }

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="flex-1"
        ListHeaderComponent={
          <View>
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
            <View className="px-5 pt-1 pb-4">
              <Text className="text-2xl font-medium text-gray-900 leading-tight">
                Your Cart
              </Text>
              <Text className="text-lg mt-1">
                Track and manage your cart here.
              </Text>
            </View>
            <View className="px-5 pt-1 pb-4 flex flex-row justify-between items-center">
              <Text className="text-2xl font-medium text-gray-900 leading-tight">
                Cart details
              </Text>
              <Text className="text-lg mt-1 text-[#895100]">View all</Text>
            </View>
          </View>
        }
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mx-5 mb-4 p-4 bg-gray-50 rounded-2xl border border-[#895100] flex-row items-center">
            <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center" />
            <View className="flex-1 ml-3 p-4">
              <Text className="text-sm font-bold text-gray-900">{item.title}</Text>
              <Text className="text-sm font-bold text-[#895100]">
                {item.price} {(item?.quantity ?? 1) > 1 ? `x ${item.quantity}` : ""}
              </Text>
            </View>
            <View className="items-center gap-2">
              <Pressable
                className="items-center justify-center rounded-full w-8 h-8 bg-[#895100]"
                onPress={() => handleAddition(item)}
              >
                <Text className="text-white text-xl leading-none" style={{ includeFontPadding: false }}>+</Text>
              </Pressable>
              <Text className="text-sm font-bold text-[#895100] text-center">{item.quantity}</Text>
              <Pressable
                className="items-center justify-center rounded-full w-8 h-8 bg-[#895100]"
                onPress={() => handleSubstraction(item.id)}
              >
                <Text className="text-white text-xl leading-none" style={{ includeFontPadding: false }}>-</Text>
              </Pressable>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {totalItems > 0 && (
        <View className="px-5 py-4">
          <Pressable
            className="items-center justify-center rounded-full py-4 px-8 bg-[#FF9F1C]"
            onPress={() => {}}
          >
            <Text className="text-white text-base font-bold">Checkout</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}