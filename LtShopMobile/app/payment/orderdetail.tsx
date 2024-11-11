import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import * as OrderService from '../../services/OrderService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailPage = () => {
    const { orderId } = useLocalSearchParams(); // Get orderId from URL params
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [orderDetail, setOrderDetail] = useState<any>(null); // Store order details
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    // Get accessToken from AsyncStorage
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            setAccessToken(token);
        } catch (error) {
            console.error("Error fetching token:", error);
        }
    };

    // Fetch order details
    const fetchDetailOrder = async () => {
        if (!accessToken || !orderId) return;
        setLoading(true);
        try {
            const res = await OrderService.getDetailsOrder(orderId, accessToken);
            setOrderDetail(res.data); // Store order details
        } catch (error) {
            console.error("Error fetching order details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getToken(); // Fetch token on component mount
    }, []);

    useEffect(() => {
        if (accessToken && orderId) {
            fetchDetailOrder(); // Fetch order details when both token and orderId are available
        }
    }, [accessToken, orderId]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!orderDetail) {
        return (
            <View className="flex-1 justify-center items-center p-5">
                <Text>No order details found</Text>
            </View>
        );
    }

    return (
        <ScrollView className='bg-gray-100 p-4'>
            <Text className="text-2xl font-bold text-center mb-5">Chi tiết đơn hàng</Text>

            <View className="mb-5">
                <Text className="text-xl font-semibold mb-3">Giỏ hàng</Text>
                <View className="bg-white rounded-lg p-3">
                    {orderDetail.orderItems.map((item: any, index: number) => (
                        <View className="flex-row items-center  rounded-lg p-2 my-1" key={index}>
                            <Image source={{ uri: item.image }} className="w-14 h-14 rounded-md border border-gray-300" />
                            <View className="ml-2 flex-1">
                                <Text className="font-semibold text-gray-800 text-sm">{item.name}</Text>
                                {item.discount > 0 ? (
                                    <View className="flex-row items-center gap-1">
                                        <Text className="text-xs text-gray-600 font-bold">
                                            {(item.price * (1 - item.discount / 100)).toLocaleString()} đ
                                        </Text>
                                        <Text className="text-xs text-gray-600 line-through">
                                            {item.price.toLocaleString()} đ
                                        </Text>
                                    </View>
                                ) : (
                                    <Text className="text-xs text-gray-600 font-bold">
                                        {item.price.toLocaleString()} đ
                                    </Text>
                                )}
                            </View>
                            <Text className="text-xs text-gray-600 ml-2">x{item.amount}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View className="mb-5">
                <Text className="text-xl font-semibold mb-2">Địa chỉ người nhận:</Text>
                <View className='bg-white p-4 rounded'>

                    <Text className="text-lg text-gray-700">Tên: {orderDetail.shippingAddress.fullName}</Text>
                    <Text className="text-lg text-gray-700">Địa chỉ: {orderDetail.shippingAddress.address}, {orderDetail.shippingAddress.city}</Text>
                    <Text className="text-lg text-gray-700">Số điện thoại: {orderDetail.shippingAddress.phone}</Text>
                </View>
            </View>

            <View className="mb-5">
                <Text className="text-xl font-semibold mb-2">Hình thức thanh toán</Text>
                <View className='bg-white p-4 rounded'>
                    <Text className="text-lg text-gray-700">
                        {orderDetail.paymentMethod}
                    </Text>
                </View>
            </View>

            <View className="mb-5">
                <Text className="text-xl font-semibold mb-2">Hình thức vận chuyển</Text>
                <View className='bg-white p-4 rounded'>
                    <Text className="text-lg text-gray-700">
                        GHTK
                    </Text>
                </View>
            </View>

            <View className="mb-5">
                <Text className="text-xl font-semibold mb-2">Total Price:</Text>
                <Text className="text-lg font-bold text-black">{orderDetail.totalPrice.toLocaleString()} VND</Text>
                <Text className="text-lg text-gray-700">Shipping Fee: {orderDetail.shippingPrice.toLocaleString()} VND</Text>
            </View>

            <Text className="text-sm text-gray-600 text-center">Updated At: {new Date(orderDetail.updatedAt).toLocaleString()}</Text>
        </ScrollView>
    );
};

export default OrderDetailPage;
