import { Eye, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type LogInProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onLogin: () => void;
  loading: boolean;
};

export default function LogIn({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  loading,
}: LogInProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={require('../../assets/images/Icon.webp')}
            className="w-7 h-7"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-[#895100] tracking-tight">QuickBites</Text>
        </View>
      </View>

      <View className="px-5 pt-6 pb-1">
        <Text className="text-2xl font-bold text-gray-900">Welcome Back!</Text>
        <Text className="text-sm text-gray-500 mt-2 leading-5">
          Log in to continue your food journey.
        </Text>
      </View>

      <View className="px-5 pt-6 gap-5">
        <View>
          <Text className="text-sm font-semibold text-gray-800 mb-2">Email Address</Text>
          <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-16">
            <Mail size={18} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-gray-900"
              placeholder="hello@example.com"
              placeholderTextColor="#B0B0B0"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View>
          <Text className="text-sm font-semibold text-gray-800 mb-1.5">Password</Text>
          <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-16">
            <Lock size={18} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-gray-900"
              placeholder="••••••••"
              placeholderTextColor="#B0B0B0"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity hitSlop={8} onPress={() => setShowPassword(!showPassword)}>
              <Eye size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="px-5 pt-5">
        <Pressable
          className={`flex-row items-center justify-center bg-[#F5972E] rounded-full h-14 gap-2 ${
            loading ? 'opacity-70' : ''
          }`}
          onPress={onLogin}
          disabled={loading}
        >
          <Text className="text-white text-base font-bold">
            {loading ? 'Logging in...' : 'Log In'}
          </Text>
        </Pressable>
      </View>

      <View className="flex-row justify-center pt-8 pb-4">
        <Text className="text-lg text-gray-500">Don't have an account? </Text>
        <Pressable onPress={() => router.push('/(auth)/signup')}> 
          <Text className="text-lg font-semibold text-[#E8862C]">Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}