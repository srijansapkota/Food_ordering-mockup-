  import { useState } from "react";
  import "../../global.css"
  import { Image, Text, View, TextInput, FlatList, Pressable, ToastAndroid } from "react-native";
  import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
import { tempData } from "@/temp/data";
import useItemsStore from "@/store/useItemsStore";

export default function App() {
  const { menuData, filterOptions } = tempData();
    const [selectedId, setSelectedId] = useState(1);
    const selectedCategory = filterOptions.find((f) => f.id === selectedId)?.title;
  const filteredMenu = selectedCategory === "All Menu" ? menuData : menuData.filter((m) => m.category === selectedCategory)
  const {addItem,reduceItem, resetItems } = useItemsStore()

  
    const listHeader = () => (
      <>
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
    <View className="px-5 pt-6 pb-4">
      <Text className="text-xs font-semibold text-[#895100] tracking-widest uppercase mb-1">
        Fresh & Tasty
      </Text>
      <Text className="text-2xl font-bold text-gray-900 leading-tight">
        What would you{"\n"}like to eat today?
      </Text>
    </View>
    {/*<View className="mx-5 mb-6 bg-gray-100 rounded-2xl flex-row items-center px-4 py-3">
      <Text className="text-gray-400 mr-2 text-base">🔍</Text>
      <TextInput
        placeholder="Search dishes..."
        placeholderTextColor="#9ca3af"
        className="flex-1 text-gray-800 text-sm"
      />
    </View>*/}
  
  <View>
  <FlatList data={filterOptions}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) =>
      <Pressable onPress={() => setSelectedId(item.id)} className={`px-5 py-2 rounded-full border ${selectedId === item.id ?"bg-[#895100] border-[#895100]" : "bg-[#00a369] text-[#006A62] border-gray-200"}`}>
        <Text className={`text-sm font-semibold ${selectedId === item.id ? "text-white" : "text-gray-100"}`}>{item.title}</Text>
      </Pressable> }
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="px-5 gap-3 mb-4"
    />
  </View>
      </>  
    )
  
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View>
          <FlatList data={filteredMenu} keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={listHeader}
            renderItem={({ item }) => {
            const handleAddition = () => {
              addItem({
                id: item.id,
                price: item.price,
                title: item.title,
                category: item.category,
              })
              ToastAndroid.show('Item added to cart', ToastAndroid.SHORT);
            }
              return (
                <View className="mx-5 mb-4 p-4 bg-gray-50 rounded-2xl border border-[#895100] flex-row items-center">
                  <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center">
                  </View>
                  <View className="flex-1 ml-3">
                    <Text className="text-sm font-bold text-gray-900">{item.title}</Text>
                  </View>
                  <View className="items-end gap-2">
                    <Text className="text-sm font-bold text-[#895100]">{item.price}</Text>
                    <Pressable className="bg-[#895100] w-8 h-8 rounded-full items-center justify-center" onPress={handleAddition}>
                      <Text className="text-white text-lg font-bold">+</Text>
                    </Pressable>
                </View>
              </View>
            )}}
          />
    </View>
      </SafeAreaView>
    );
  }
