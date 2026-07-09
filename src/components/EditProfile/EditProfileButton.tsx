import { Pencil } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';

export function EditProfileButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-1 px-3 py-1.5 rounded-full border border-[#895100]"
    >
      <Pencil color="#895100" size={14} strokeWidth={2} />
      <Text className="text-xs font-bold text-[#895100]">Edit</Text>
    </Pressable>
  );
}