import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, Image, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as OrderService from '../../../services/OrderService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

type OrderItem = {
    _id: string;
    image: string;
    name: string;
    price: number;
    amount: number;
    discount: number;
};

type Order = {
    _id: string;
    totalPrice: number;
    status: number;
    orderItems: OrderItem[];
};

interface TabButtonProps {
    label: string;
    onPress: () => void;
    isSelected: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ label, onPress, isSelected }) => (
    <TouchableOpacity onPress={onPress} className="py-2 px-4">
        <Text className={`text-lg ${isSelected ? 'text-black font-bold' : 'text-gray-500'}`}>{label}</Text>
    </TouchableOpacity>
);

const SimpleAnimatedTabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const handleTabPress = (index: number) => {
        setSelectedTab(index);
    };

    const getTokenAndID = async () => {
        const token = await AsyncStorage.getItem('access_token');
        const id = await AsyncStorage.getItem('userId');
        setAccessToken(token);
        setUserId(id);
    };

    const fetchOrders = async () => {
        if (userId && accessToken) {
            try {
                setLoading(true);
                const res = await OrderService.getOrderByUserId(userId, accessToken);
                setOrders(res.data);
            } catch (error) {
                console.error('Lỗi khi tải đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getTokenAndID();
    }, []);

    useEffect(() => {
        if (userId && accessToken) {
            fetchOrders();
        }
    }, [userId, accessToken]);

    useEffect(() => {
        console.log('1')
        fetchOrders();
    }, []);

    const getFilteredOrders = (status: number) => {
        return orders.filter(order => order.status === status);
    };

    const handleCancelOrder = async (orderId: string, orderItems: OrderItem[]) => {
        const result = await OrderService.cancelOrder(orderId, accessToken, orderItems, userId);
        Toast.show({ type: 'success', text1: 'Hủy đơn hàng thành công!!' });
        fetchOrders();

    };

    const handleViewDetails = (orderId: string) => {
        router.push(`/payment/orderdetail?orderId=${orderId}`);
    };

    return (
        <View className="flex-1">
            <View className="flex-row justify-around bg-gray-200 py-2">
                <TabButton label="Chờ xác nhận" onPress={() => handleTabPress(0)} isSelected={selectedTab === 0} />
                <TabButton label="Đang giao" onPress={() => handleTabPress(1)} isSelected={selectedTab === 1} />
                <TabButton label="Đã giao" onPress={() => handleTabPress(2)} isSelected={selectedTab === 2} />
            </View>

            <Animatable.View
                animation={selectedTab === 0 ? 'fadeInLeft' : selectedTab === 1 ? 'fadeInRight' : 'fadeInUp'}
                duration={500}
                className="flex-1 justify-center items-center"
            >
                {loading ? (
                    <Text>Đang tải...</Text>
                ) : (
                    <FlatList
                        data={selectedTab === 0 ? getFilteredOrders(0) : selectedTab === 1 ? getFilteredOrders(1) : getFilteredOrders(2)}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <View className="bg-white rounded-lg shadow-sm w-11/18 mx-auto my-4 p-5 border border-gray-300">
                                <Text className="text-sm font-semibold text-gray-900">Đơn hàng ID: {item._id}</Text>
                                <View className="border-b border-gray-300 mb-2" />
                                {item.orderItems.map(orderItem => (
                                    <View key={orderItem._id} className="flex-row items-center bg-gray-50 rounded-lg p-2 my-1">
                                        <Image source={{ uri: orderItem.image }} className="w-14 h-14 rounded-md border border-gray-300" />
                                        <View className="ml-2 flex-1 flex-col justify-center">
                                            <Text className="font-semibold text-gray-800 text-sm">{orderItem.name}</Text>
                                            {orderItem.discount > 0 ? (
                                                <View className="flex-row items-center gap-1">
                                                    <Text className="text-xs text-gray-600 font-bold">
                                                        {(orderItem.price * (1 - orderItem.discount / 100)).toLocaleString()} đ
                                                    </Text>
                                                    <Text className="text-xs text-gray-600 line-through mr-2">
                                                        {orderItem.price.toLocaleString()} đ
                                                    </Text>
                                                </View>
                                            ) : (
                                                <Text className="text-xs text-gray-600 font-bold">
                                                    {orderItem.price.toLocaleString()} đ
                                                </Text>
                                            )}
                                        </View>
                                        <Text className="text-xs text-gray-600 ml-2">x{orderItem.amount}</Text>
                                    </View>
                                ))}
                                <View className="border-b border-gray-300 mb-2" />
                                <View className="flex-row justify-between items-center mb-3">
                                    <Text className="text-sm text-gray-800">
                                        Tổng giá: <Text className="font-bold text-red-600">{item.totalPrice.toLocaleString()} đ</Text>
                                    </Text>
                                    <Text
                                        className={`text-xs font-medium ${item.status === 0 ? 'text-yellow-600' : item.status === 1 ? 'text-blue-600' : 'text-green-600'}`}
                                    >
                                        {item.status === 0 ? 'Chờ xác nhận' : item.status === 1 ? 'Đang giao' : 'Đã giao'}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ borderRadius: 4, overflow: 'hidden' }}>
                                        <Button
                                            title="Hủy Đơn Hàng"
                                            onPress={() => handleCancelOrder(item._id, item.orderItems)} // Truyền orderItems vào đây
                                            color="#f44336" // Red button color
                                        />
                                    </View>
                                    <View style={{ borderRadius: 4, overflow: 'hidden' }}>
                                        <Button
                                            title="Xem Chi Tiết"
                                            onPress={() => handleViewDetails(item._id)}
                                            color="#2196F3" // Blue button color
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                )}
            </Animatable.View>
            <Toast />

        </View>
    );
};

export default SimpleAnimatedTabs;
