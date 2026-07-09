import LogIn from '@/components/Auth/LogIn';
import { showToast } from '@/components/General/Toast';
import useAuthStore from '@/store/useAuthStore';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Please fill in all fields');
      return;
    }
    try {
      await signin(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      const message = error.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : error.code === 'auth/wrong-password'
        ? 'Incorrect password'
        : error.message || 'Login failed. Please try again.' || error;
      showToast(message)
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <LogIn
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
        loading={isLoading}
      />
    </SafeAreaView>
  );
}