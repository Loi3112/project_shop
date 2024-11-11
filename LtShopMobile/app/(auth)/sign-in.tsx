import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as UserService from '../../services/UserService';
import { router } from 'expo-router';

interface CustomJwtPayload {
    id: string;
}

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignIn = async () => {
        const response = await UserService.userLogin({ email, password });
        console.log('ádsa', response)
        if (response?.status !== 'ERROR') {
            const accessToken = response?.access_token;
            const refreshToken = response?.refresh_token;
            await AsyncStorage.setItem('access_token', accessToken);
            await AsyncStorage.setItem('refresh_token', refreshToken);

            const decoded = jwtDecode<CustomJwtPayload>(accessToken);

            if (decoded?.id) {
                await AsyncStorage.setItem('userId', decoded.id);
            }
            Toast.show({
                text1: "Đăng nhập thành công!",
                type: "success"
            });

            setTimeout(() => {
                router.navigate('/');
            }, 700);
        } else {

            Toast.show({
                text1: "Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.",
                type: "error",
                visibilityTime: 3000,
            });
        }
    };

    return (
        <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="flex-row bg-white rounded-md w-[90%] h-auto max-h-[445px]">
                <View className="flex-1 p-5">
                    <Text className="text-2xl font-bold mb-2">Chào Mừng Trở Lại,</Text>
                    <Text className="text-lg mb-5">Đăng Nhập Tài Khoản Của Bạn</Text>

                    <TextInput
                        className="h-12 border border-gray-300 rounded-md px-2 mb-2"
                        placeholder="xyz@gmail.com"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        className="h-12 border border-gray-300 rounded-md px-2 mb-2"
                        placeholder="Mật khẩu"
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        className="bg-red-500 rounded-md h-12 justify-center items-center my-2"
                        disabled={!email || !password}
                        onPress={handleSignIn}
                    >
                        <Text className="text-white text-lg">Đăng Nhập</Text>
                    </TouchableOpacity>

                    <Text className="text-blue-600 text-sm mb-2">Quên Mật Khẩu?</Text>
                    <Text className="text-sm">
                        Bạn chưa có tài khoản?{' '}
                        <Text className="text-blue-600 font-bold" onPress={() => router.navigate('/sign-up')}>Đăng ký ngay</Text>
                    </Text>
                </View>
            </View>
            <Toast />
        </View>
    );
};

export default SignInPage;
