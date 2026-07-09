import { router } from 'expo-router';
import { Modal, Pressable, Text, View } from 'react-native';

export function ProfileRequiredModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const goToProfile = () => {
    onClose();
    router.push('/profile');
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black/40 items-center justify-center px-5">
        <View className="w-full bg-white rounded-2xl border border-[#895100] p-5">
          <Text className="text-lg font-bold text-gray-900 mb-2">Profile info required</Text>
          <Text className="text-sm text-gray-600 mb-5">
            Address and personal info is required to place an order. Please update your profile to continue.
          </Text>
          <View className="flex-row gap-3">
            <Pressable
              className="flex-1 items-center justify-center rounded-full py-3 bg-gray-100"
              onPress={onClose}
            >
              <Text className="text-gray-700 text-sm font-bold">Cancel</Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center justify-center rounded-full py-3 bg-[#895100]"
              onPress={goToProfile}
            >
              <Text className="text-white text-sm font-bold">Go to Profile Page</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}