import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import * as UserService from '../../services/UserService';
import { useRouter } from 'expo-router';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [navigateToLogin, setNavigateToLogin] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      showMessage({
        message: "Mật khẩu không khớp",
        type: "danger",
      });
      return;
    }

    const data = { email, password, confirmPassword };
    const res = await UserService.newUser(data);
    if (res && res.message && res.status !== 'ERROR') {
      showMessage({
        message: "Đăng ký thành công! Bạn có thể đăng nhập ngay.",
        type: "success",
        duration: 2000, 
        style: { backgroundColor: 'green' }, 
      });
      setTimeout(() => {
        router.navigate('/sign-in');
      }, 2000); 
    } else {
      showMessage({
        message: res.message || "Đăng ký thất bại. Vui lòng thử lại.",
        type: "danger",
      });
    }

  };

  return (
    <View className="flex-1 bg-black/50 justify-center items-center">
      <View className="flex-row bg-white rounded-md w-[90%] h-auto max-h-[445px]">
        <View className="flex-1 p-5">
          <Text className="text-2xl font-bold mb-2">Xin Chào,</Text>
          <Text className="text-lg mb-5">Đăng Ký Tài Khoản Tại Đây</Text>

          <TextInput
            className="h-12 border border-gray-300 rounded-md px-2 mb-2"
            placeholder="xyz@gmail.com"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            className="h-12 border border-gray-300 rounded-md px-2 mb-2"
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

          <TextInput
            className="h-12 border border-gray-300 rounded-md px-2 mb-2"
            placeholder="Confirm password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            className="bg-red-500 rounded-md h-12 justify-center items-center my-2"
            disabled={!email || !password || !confirmPassword}
            onPress={handleSignUp}
          >
            <Text className="text-white text-lg">Đăng Ký</Text>
          </TouchableOpacity>

          <Text className="text-blue-600 text-sm mb-2">Quên Mật Khẩu?</Text>
          <Text className="text-sm">
            Bạn đã có tài khoản?{' '}
            <Text className="text-blue-600 font-bold" onPress={() => router.navigate('/sign-in')}>Đăng nhập ngay</Text>
          </Text>
        </View>
      </View>
      <FlashMessage position="center" />
    </View>
  );
};

export default SignUpPage;
