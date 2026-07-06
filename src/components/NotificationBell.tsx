import { Bell } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function NotificationBell({
  hasUnseen,
  onPress,
}: {
  hasUnseen: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={8} className="relative">
      <Bell color="#895100" size={24} strokeWidth={1.75} />
      {hasUnseen && (
        <View className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
      )}
    </Pressable>
  );
}