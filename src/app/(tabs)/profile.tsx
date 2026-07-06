import { useState } from "react";
import { Text, View, Pressable, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "lucide-react-native";
import {  router } from "expo-router";
import { useProfileScreen } from "@/hooks/useProfileScreen";
import useAuthStore from "@/store/useAuthStore";
import { useOrderInfo } from "@/hooks/useOrderInfo";


  

const ProfileScreen = () => {
  const user = useAuthStore.getState().user;
  const u_id = user?.uid
  const [notificationsOn, setNotificationsOn] = useState(true);
  const { name, address, phoneno, loading } = useProfileScreen()
  const { completed, pending, cancelled, error } = useOrderInfo(u_id);
   if (loading) return (
     <SafeAreaView>
       <ActivityIndicator size={"large"} />
     </SafeAreaView>
   )
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
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + identity */}
        <View className="items-center pt-8 pb-6">
          <View className="w-24 h-24 rounded-full bg-amber-50 border-2 border-[#895100] items-center justify-center mb-4">
            <User color="#895100" size={40} strokeWidth={1.5} />
          </View>
          <Text className="text-xl font-bold text-gray-900">{name}</Text>
          <Text className="text-sm text-gray-500 mt-1">{user?.email}</Text>
        </View>

        {/* Personal info */}
        <View className="px-5 pt-2 pb-2">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Personal info</Text>
          <View className="bg-gray-50 rounded-2xl border border-[#895100] p-4 gap-4">
            <View className="flex-row justify-between">
              <View className="flex-1 mr-3">
                <Text className="text-xs text-gray-500 mb-1">Name</Text>
                <Text className="text-sm font-medium text-gray-900">{name}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 mb-1">Address</Text>
                <Text className="text-sm font-medium text-gray-900">{address}</Text>
              </View>
            </View>
            <View>
              <Text className="text-xs text-gray-500 mb-1">Phone no.</Text>
              <Text className="text-sm font-medium text-gray-900">{phoneno}</Text>
            </View>
          </View>
        </View>

        {/* My orders */}
        <View className="px-5 pt-6 pb-2">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold text-gray-900">My orders</Text>
            <Pressable onPress={() => router.push('/orders')}>
              <Text className="text-sm font-medium text-[#895100]">View orders</Text>
            </Pressable>
          </View>
          <View className="bg-gray-50 rounded-2xl border border-[#895100] p-4 flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-gray-900">{completed}</Text>
              <Text className="text-xs text-gray-500 mt-1">Total</Text>
            </View>
            <View className="items-center flex-1 border-l border-r border-gray-200">
              <Text className="text-2xl font-bold text-[#895100]">{pending}</Text>
              <Text className="text-xs text-gray-500 mt-1">Pending</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-red-600">{cancelled}</Text>
              <Text className="text-xs text-gray-500 mt-1">Cancelled</Text>
            </View>
          </View>
        </View>

        {/* Notification preference */}
        <View className="px-5 pt-6 pb-2">
          <View className="flex-row justify-between items-center bg-gray-50 rounded-2xl border border-[#895100] px-4 py-4">
            <Text className="text-sm font-medium text-gray-900">Notification preference</Text>
            <View className="flex-row bg-white rounded-full border border-[#895100] overflow-hidden">
              <Pressable
                onPress={() => setNotificationsOn(true)}
                className={`px-4 py-1.5 ${notificationsOn ? "bg-[#895100]" : ""}`}
              >
                <Text className={`text-xs font-bold ${notificationsOn ? "text-white" : "text-[#895100]"}`}>
                  On
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setNotificationsOn(false)}
                className={`px-4 py-1.5 ${!notificationsOn ? "bg-[#895100]" : ""}`}
              >
                <Text className={`text-xs font-bold ${!notificationsOn ? "text-white" : "text-[#895100]"}`}>
                  Off
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Logout */}
        <View className="px-5 pt-8">
          <Pressable className="items-center justify-center rounded-full py-4 bg-[#895100]">
            <Text className="text-white text-base font-bold">Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
 };

export default ProfileScreen;