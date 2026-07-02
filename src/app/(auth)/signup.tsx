import { Signup } from '@/components/Signup';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <Signup />
    </SafeAreaView>
  );
}