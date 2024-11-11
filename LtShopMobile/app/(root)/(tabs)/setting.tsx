import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

const Setting = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('access_token');
        setIsLoggedIn(!!token); 
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('userId');
        router.replace('/sign-in');

    };

    return (
        <View className="justify-center items-center p-5">
            {isLoggedIn ? ( // Kiểm tra trạng thái đăng nhập
                <>
                    <TouchableOpacity
                        className="p-4 bg-gray-200 rounded-lg mb-3 w-full items-center"
                        onPress={() => router.navigate('/profile')}
                    >
                        <Text className="text-lg">Thông tin cá nhân</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="p-4 bg-gray-200 rounded-lg mb-3 w-full items-center"
                        onPress={handleLogout}
                    >
                        <Text className="text-lg">Đăng xuất</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View className="flex-col items-center p-5">
                    <View className="flex-row items-center justify-center gap-5">
                        <Text className="text-lg ml-2" style={{ color: '#3498db', fontWeight: '700' }}>NTL</Text>
                        <Text className="text-lg">Chào mừng bạn đến với ứng dụng!</Text>
                    </View>

                    <View className="flex-row justify-center align-center gap-4 mt-5">
                        <TouchableOpacity
                            className="bg-blue-500 p-2 rounded"
                            onPress={() => router.navigate('/sign-in')}
                        >
                            <Text className="text-white">Đăng nhập</Text>
                        </TouchableOpacity>
                        <View className="p-2">
                            <Text>Hoặc</Text>
                        </View>

                        <TouchableOpacity
                            className="bg-blue-500 p-2 rounded"
                            onPress={() => router.navigate('/sign-up')}
                        >
                            <Text className="text-white">Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            )}
        </View>
    );
};

export default Setting;
