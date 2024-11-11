import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as OrderService from '../../services/OrderService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

interface OrderItem {
    _id: string;
    amount: number;
    discount: number;
    image: string;
    name: string;
    price: number; // Giá bằng VND
}

interface OrderDetail {
    orderItems: OrderItem[];
    totalPrice: number; // Tổng tiền bằng VND
}

const SuccessPage = () => {
    const { orderId } = useLocalSearchParams();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

    const navigation = useNavigation(); // Sử dụng useNavigation để điều hướng

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            setAccessToken(token);
        } catch (error) {
            console.error("Lỗi khi lấy token:", error);
        }
    };

    const getOrderDetail = async () => {
        if (!accessToken || !orderId) {
            console.warn("AccessToken hoặc OrderId chưa sẵn sàng.");
            return;
        }

        try {
            const res = await OrderService.getDetailsOrder(orderId, accessToken);
            setOrderDetail(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (accessToken) {
            getOrderDetail();
        }
    }, [accessToken]);

    const orderItems = orderDetail?.orderItems ?? [];

    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Chúc mừng!</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>Đơn hàng của bạn đã được đặt thành công.</Text>
            <Text style={{ fontSize: 16, color: 'gray' }}>Mã đơn hàng: {orderId}</Text>

            {orderDetail && orderItems.length > 0 && (
                <View style={{ marginTop: 20, width: '100%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Chi tiết đơn hàng:</Text>
                    <Text>Tổng tiền: {orderDetail.totalPrice.toLocaleString()} VND</Text>

                    {orderItems.map((item: OrderItem) => (
                        <View key={item._id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, padding: 10, borderRadius: 8, backgroundColor: '#f9f9f9', shadowColor: '#000', shadowOpacity: 0.2, elevation: 2 }}>
                            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 15 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text>Số lượng: {item.amount}</Text>
                                <Text>Giá: {item.price.toLocaleString()} VND</Text>
                                <Text>Giảm giá: {item.discount}%</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            <Button
                title="Quay lại trang chủ"
                onPress={() => router.navigate('/')} 
            />
        </ScrollView>
    );
};

export default SuccessPage;
