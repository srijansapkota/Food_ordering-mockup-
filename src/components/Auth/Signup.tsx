import useAuthStore from '@/store/useAuthStore';
import { ArrowRight, Eye, Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export const Signup = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const { signup, isLoading } = useAuthStore();

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const clientSignUp = async () => {
    if (!data.email || !data.password) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    try {
      await signup(data.email, data.password);
      ToastAndroid.show('Account created!', ToastAndroid.SHORT);
      router.replace('/(tabs)');
    } catch (error: any) {
      const message = error.code === 'auth/email-already-in-use'
        ? 'Email already in use'
        : error.message || 'Signup failed. Please try again.';
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#FFFBF5]">
      <View className="flex-row items-center justify-between px-5 pt-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={require('../../../assets/images/Icon.webp')}
            className="w-8 h-8"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-[#7C4A12] tracking-tight">QuickBites</Text>
        </View>
        <View className="w-9 h-9 rounded-full bg-[#FBE8D3] items-center justify-center">
          <User size={18} color="#C17A2E" />
        </View>
      </View>

      <View className="px-5 pt-7 pb-1">
        <Text className="text-[26px] font-bold text-gray-900 tracking-tight">Join us!</Text>
        <Text className="text-[15px] text-gray-500 mt-2 leading-[22px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>

      <View className="px-5 pt-6 gap-5">
        <View>
          <Text className="text-sm font-semibold text-gray-800 mb-2">Email Address</Text>
          <View
            className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-16"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
              height: 52,
            }}
          >
            <Mail size={18} color="#C17A2E" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-900"
              placeholder="hello@example.com"
              placeholderTextColor="#B5ADA3"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={data.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>
        </View>

        <View>
          <Text className="text-sm font-semibold text-gray-800 mb-2">Password</Text>
          <View
            className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
              height: 52,
            }}
          >
            <Lock size={18} color="#C17A2E" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-900"
              placeholder="••••••••"
              placeholderTextColor="#B5ADA3"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={data.password}
              onChangeText={(text) => handleChange('password', text)}
            />
            <TouchableOpacity hitSlop={8} onPress={() => setShowPassword(!showPassword)}>
              <Eye size={18} color="#B5ADA3" />
            </TouchableOpacity>
          </View>
        </View>
      </View>


      <View className="px-5 pt-7">
        <Pressable
          className={`flex-row items-center justify-center bg-[#EF8A1F] rounded-full h-14 gap-2 ${
            isLoading ? 'opacity-70' : ''
          }`}
          style={{
            shadowColor: '#EF8A1F',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
          }}
          onPress={clientSignUp}
          disabled={isLoading}
        >
          <Text className="text-white text-base font-bold tracking-wide">
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Text>
          <ArrowRight size={18} color="#FFFFFF" />
        </Pressable>
      </View>

      <View className="flex-row justify-center pt-8 pb-4">
        <Text className="text-lg text-gray-500">Already part of the family? </Text>
        <Pressable onPress={() => router.push('/(auth)/login')}>
          <Text className="text-lg font-bold text-[#D97B2B]">Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};