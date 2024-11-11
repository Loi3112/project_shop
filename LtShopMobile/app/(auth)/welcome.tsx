import { router } from "expo-router";
import { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import Swiper from 'react-native-swiper'
const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null)

    return (

        <View className="flex h-full items-center justify-between">

           <View>
             <TouchableOpacity onPress={() => {
                router.replace("/(auth)/sign-up")
            }}
                className="w-full flex justify-end items-end p-5"

            >
                <Text className="text-black text-md font-JakartaBold">
                    Đăng Ký
                </Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                router.replace("/(auth)/sign-in")
            }}
                className="w-full flex justify-start items-end p-5"

            >
                <Text className="text-black text-md font-JakartaBold">
                    Đăng Nhập
                </Text>

            </TouchableOpacity>

           </View>

        </View>

    );
};

export default Onboarding;
