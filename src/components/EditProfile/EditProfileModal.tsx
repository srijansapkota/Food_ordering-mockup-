
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

type EditProfileModalProps = {
  isVisible: boolean;
  onClose: () => void;
  name: string;
  setName: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  phoneno: string;
  setPhoneno: (value: string) => void;
  errors: { name?: string; address?: string; phoneno?: string };
  isSubmitting: boolean;
  onSubmit: () => void;
};

export const EditProfileModal = ({
  isVisible,
  onClose,
  name,
  setName,
  address,
  setAddress,
  phoneno,
  setPhoneno,
  errors,
  isSubmitting,
  onSubmit,
}: EditProfileModalProps) => {
  if (!isVisible) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        elevation: 1000,
      }}
      className="bg-black/50 justify-end"
    >
      <Pressable
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        onPress={onClose}
      />
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, marginTop: 100 }}
      >
        <View style={{ width: "100%" }} className="bg-white rounded-t-2xl">
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Edit Profile
            </Text>

            <View className="mb-4">
              <Text className="text-xs text-gray-500 mb-1">Name</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={name}
                onChangeText={setName}
                placeholder="Your name"
              />
              {errors.name ? (
                <Text className="text-red-600 text-xs mt-1">{errors.name}</Text>
              ) : null}
            </View>

            <View className="mb-4">
              <Text className="text-xs text-gray-500 mb-1">Address</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={address}
                onChangeText={setAddress}
                placeholder="Your address"
              />
              {errors.address ? (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.address}
                </Text>
              ) : null}
            </View>

            <View className="mb-6">
              <Text className="text-xs text-gray-500 mb-1">Phone no.</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={phoneno}
                onChangeText={setPhoneno}
                placeholder="10-digit phone number"
                keyboardType="number-pad"
                maxLength={10}
              />
              {errors.phoneno ? (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.phoneno}
                </Text>
              ) : null}
            </View>

            <View className="flex-row gap-3">
              <Pressable
                onPress={onClose}
                disabled={isSubmitting}
                className="flex-1 border border-gray-300 rounded-lg py-3 items-center"
              >
                <Text className="font-semibold text-gray-700">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={onSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-[#895100] rounded-lg py-3 items-center flex-row justify-center gap-2"
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" size="small" />
                ) : null}
                <Text className="text-white font-semibold">
                  {isSubmitting ? "Saving..." : "Save"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
