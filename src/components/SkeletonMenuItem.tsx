import { View } from "react-native";
import { SkeletonBox } from "./SkeletonBox";

export const SkeletonMenuItem = () => (
  <View className="mx-5 mb-4 p-4 bg-gray-50 rounded-2xl border border-[#895100] flex-row items-center">
    <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center" />
    <View className="flex-1 ml-3">
      <SkeletonBox className="h-4 w-28" />
    </View>
    <View className="items-end gap-2">
      <SkeletonBox className="h-4 w-14" />
      <SkeletonBox className="w-8 h-8 rounded-full" />
    </View>
  </View>
);