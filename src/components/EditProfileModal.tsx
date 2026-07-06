import { Modal, Pressable, Text, TextInput, View } from 'react-native';

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

export function EditProfileModal({
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
}: EditProfileModalProps) {
  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black/40 items-center justify-center px-5">
        <View className="w-full bg-white rounded-2xl border border-[#895100] p-5">
          <Text className="text-lg font-bold text-gray-900 mb-4">Edit personal info</Text>

          <View className="gap-4">
            <View>
              <Text className="text-xs text-gray-500 mb-1">Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900"
              />
              {errors.name && <Text className="text-xs text-red-600 mt-1">{errors.name}</Text>}
            </View>

            <View>
              <Text className="text-xs text-gray-500 mb-1">Address</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Your address"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900"
              />
              {errors.address && <Text className="text-xs text-red-600 mt-1">{errors.address}</Text>}
            </View>

            <View>
              <Text className="text-xs text-gray-500 mb-1">Phone no.</Text>
              <TextInput
                value={phoneno}
                onChangeText={setPhoneno}
                placeholder="10-digit phone number"
                keyboardType="number-pad"
                maxLength={10}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900"
              />
              {errors.phoneno && <Text className="text-xs text-red-600 mt-1">{errors.phoneno}</Text>}
            </View>
          </View>

          <View className="flex-row gap-3 mt-6">
            <Pressable
              className="flex-1 items-center justify-center rounded-full py-3 bg-gray-100"
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text className="text-gray-700 text-sm font-bold">Cancel</Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center justify-center rounded-full py-3 bg-[#895100]"
              style={{ opacity: isSubmitting ? 0.6 : 1 }}
              onPress={onSubmit}
              disabled={isSubmitting}
            >
              <Text className="text-white text-sm font-bold">
                {isSubmitting ? 'Saving...' : 'Save'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}