import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import store from '../../redux/store';
import CartComponent from "@/components/CartComponents/CartComponents";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

const Cart = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();  

    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('access_token');
        setIsLoggedIn(!!token); 
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('access_token');
        setIsLoggedIn(false); 
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            {isLoggedIn ? (
                <>
                    <Provider store={store}>
                        <CartComponent />
                    </Provider>
                </>
            ) : (


                <View className="flex-col items-center p-5">
                    <View className="flex-row items-center justify-center gap-5">
                        <Text className="text-lg ml-2" style={{ color: '#3498db', fontWeight: '700' }}>NTL</Text>
                        <Text className="text-lg">Bạn chưa đăng nhập/đăng ký!</Text>
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

export default Cart;
