import useItemsStore from "@/store/useItemsStore";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleCartItems } from "@/hooks/handleCartItems";
import { getMenuImageUrl } from "@/lib/cloudinary";
import { CartListHeader } from "@/components/CartListHeader";
import { ProfileRequiredModal } from "@/components/ProfileRequiredModal";

export default function CartScreen() {
  const items = useItemsStore((state) => state.items);
  const {
    totalItems,
    handleSubstraction,
    handleAddition,
    handleCheckout,
    isSubmitting,
    showProfileRequiredModal,
    closeProfileRequiredModal,
  } = handleCartItems();

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="flex-1"
        extraData={items}
        ListHeaderComponent=<CartListHeader />
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mx-5 mb-4 p-4 bg-gray-50 rounded-2xl border border-[#895100] flex-row items-center">
            <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center">
              <Image source={{uri: getMenuImageUrl(item.image)}} className="w-full h-full" resizeMode="cover" />
            </View>
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
            style={{ opacity: isSubmitting ? 0.6 : 1 }}
            disabled={isSubmitting}
            onPress={handleCheckout}
          >
            <Text className="text-white text-base font-bold">
              {isSubmitting ? "Placing order..." : "Checkout"}
            </Text>
          </Pressable>
        </View>
      )}

      <ProfileRequiredModal
        isVisible={showProfileRequiredModal}
        onClose={closeProfileRequiredModal}
      />
    </SafeAreaView>
  );
}