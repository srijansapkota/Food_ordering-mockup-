import { LogOut, User } from "lucide-react-native";
import { FlatList, Image, Pressable, Text, View, Modal } from "react-native";
import useAuthStore from "@/store/useAuthStore";
import { seedData } from "@/lib/seed";

export const IndexListHeader = ({
  selectedId,
  setSelectedId,
  filterOptions,
  isDropdownOpen,
  setIsDropdownOpen,
}: any) => {
  const { signout } = useAuthStore();
  const dropdownOptions = [{ id: 1, icon: <LogOut />, label: "Logout" }];
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <>
      <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
        <View className="flex-row items-center gap-2">
          <Image
            source={require("../../../assets/images/Icon.webp")}
            className="w-10 h-10 rounded-xl"
            resizeMode="cover"
          />
          <Text className="text-2xl font-bold text-[#895100] tracking-tight">
            QuickBites
          </Text>
        </View>
        <Pressable
          className="w-12 h-12 p-4 rounded-full bg-[#FBE8D3] items-center justify-center"
          onPress={toggleDropdown}
        >
          <User size={24} color="#C17A2E" />
        </Pressable>
      </View>


      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={closeDropdown}
        >
          <View className="absolute top-28 right-5 bg-white rounded-xl shadow-lg overflow-hidden min-w-[140px] border border-gray-100">
            <FlatList
              data={dropdownOptions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  className="flex-row items-center gap-2 px-4 py-3 active:bg-gray-50"
                  onPress={() => {
                    signout();
                    closeDropdown();
                  }}
                >
                  {item.icon}
                  <Text className="text-sm font-medium text-gray-800">{item.label}</Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>

      <View className="p-4">
        <Text className="text-xs font-semibold text-[#895100] tracking-widest uppercase mb-1">
          Fresh & Tasty
        </Text>
        <Text className="text-2xl font-bold text-gray-900 leading-tight">
          What would you like to eat today?
        </Text>
        <Pressable className="p-2 mt-2 bg-[#895100] rounded-full w-[20%]" onPress={() => seedData().catch(e => console.error('seed error:', e))}>
          <Text className="text-center">Seed</Text>
        </Pressable>
      </View>

      <View>
        <FlatList
          data={filterOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedId(item.id)}
              className={`px-5 py-2 rounded-full border ${
                selectedId === item.id ? "bg-[#895100] border-[#895100]" : "bg-[#00a369] text-[#006A62] border-gray-200"
              }`}
            >
              <Text className={`text-sm font-semibold ${selectedId === item.id ? "text-white" : "text-gray-100"}`}>
                {item.title}
              </Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-5 gap-3 mb-4"
        />
      </View>
    </>
  );
};