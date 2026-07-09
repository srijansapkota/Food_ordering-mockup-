import "../../global.css";
import { Text, View, FlatList, Pressable, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import useItemsStore from "@/store/useItemsStore";
import { useIndexMenu } from "@/hooks/useIndexMenu";
import { IndexListHeader } from "@/components/ListHeader/IndexListHeader";
import { showToast } from "@/components/General/Toast";
import { getMenuImageUrl } from "@/lib/cloudinary";

export default function App() {
  const { addItem } = useItemsStore();
  const { filteredMenu, loading, selectedId, setSelectedId, filterOptions } = useIndexMenu();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  if (loading) {
    return (
      <SafeAreaView className="flex justify-center h-screen">
        <ActivityIndicator size="small" color="00ff00" />
      </SafeAreaView>
)};
return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <IndexListHeader
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            filterOptions={filterOptions}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        }
        renderItem={({ item }) => {
          const handleAddition = () => {
            addItem({
              id: item.id,
              price: item.price,
              title: item.title,
              category: item.category_id,
              image: item.image
            });
            showToast("Item added to Cart")
          };
          return (
            <View className="mx-5 mb-4 p-4  rounded-2xl border border-[#895100] flex-row items-center">
              {loading && <ActivityIndicator />}
              <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center overflow-hidden">
                <Image
                  source={{ uri: getMenuImageUrl(item.image) }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-sm font-bold text-gray-900">{item.title}</Text>
              </View>
              <View className="items-end gap-2">
                <Text className="text-sm font-bold text-[#895100]">{item.price}</Text>
                <Pressable
                  className="bg-[#895100] w-8 h-8 rounded-full items-center justify-center"
                  onPress={handleAddition}
                >
                  <Text className="text-white text-lg font-bold">+</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}