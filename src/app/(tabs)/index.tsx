import "../../global.css";
import { Text, View, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useItemsStore from "@/store/useItemsStore";
import { useMenu } from "@/hooks/useMenu";
import { ListHeader } from "@/components/ListHeader";
import { Loader } from "lucide-react-native";
import { showToast, toastRef } from "@/components/Toast";

export default function App() {
  const { addItem } = useItemsStore();
  const { filteredMenu, loading, selectedId, setSelectedId, filterOptions } = useMenu();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <ListHeader
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              filterOptions={filterOptions}
            />
          }
          renderItem={({ item }) => {
            const handleAddition = () => {
              addItem({
                id: item.id,
                price: item.price,
                title: item.title,
                category: item.category_id,
              });
              showToast("Item added to Cart")
            };
            return (
              <View className="mx-5 mb-4 p-4 bg-gray-50 rounded-2xl border border-[#895100] flex-row items-center">
                <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center" />
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
      </View>
    </SafeAreaView>
  );
}