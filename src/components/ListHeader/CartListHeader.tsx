import { View , Image, Text} from "react-native";

export const CartListHeader = () => {
  return (
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
      <Text className="px-5 py-1 mb-1 text-sm font-bold">
        Cart items would be <Text className="text-red-800">deleted</Text> after <Text className="text-red-800">30 mins.</Text>
      </Text>
    </View>
  );
};