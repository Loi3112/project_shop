import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import * as OrderService from '../../services/OrderService';
import * as UserService from '../../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { removeAllOrderProduct, removeOrderProduct } from '../../redux/slides/orderSlide';
import { useDispatch } from 'react-redux';

interface OrderItem {
    product: string;
    name: string;
    price: number;
    amount: number;
    discount: number;
    image: string;
    status: string;
    message: string;
}

const Payment = () => {
    const dispatch = useDispatch();

    const { selectedItemIds } = useLocalSearchParams();
    const orderItems = useSelector((state: RootState) => state.order.orderItems) as OrderItem[];
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userDetails, setUserDetails] = useState({
        id: '',
        email: '',
        name: '',
        address: '',
        phone: '',
        city: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('later_money');
    const [shippingMethod, setShippingMethod] = useState('Standard');
    const [loading, setLoading] = useState(false);




    const selectedItemsIdsArray = selectedItemIds ? (selectedItemIds as string).split(',') : [];
    const checkedItems = selectedItemsIdsArray.filter(id => orderItems.some(item => item.product === id));

    useEffect(() => {
        const fetchUserData = async () => {
            const token = await AsyncStorage.getItem('access_token');
            const id = await AsyncStorage.getItem('userId');
            if (token && id) {
                setAccessToken(token);
                const userData = await UserService.getDetailUser(id, token);
                console.log('userData', userData.data.name)
                setUserDetails({
                    id: userData.data._id,
                    email: userData.data.email,
                    name: userData.data.name,
                    address: userData.data.address,
                    phone: userData.data.phone,
                    city: userData.data.city
                });
            }
        };
        fetchUserData();
    }, []);

    const totalPrice = orderItems.reduce((acc, item) => {
        if (checkedItems.includes(item.product)) {
            return acc + (item.price * item.amount);
        }
        return acc;
    }, 0);

    const totalDiscount = orderItems.reduce((acc, item) => {
        if (checkedItems.includes(item.product)) {
            const discountAmount = item.price * (item.discount / 100);
            return acc + (discountAmount * item.amount);
        }
        return acc;
    }, 0);

    const calculateDeliveryFee = (total: number) => {
        if (total < 200000) return 20000;
        if (total >= 200000 && total < 500000) return 10000;
        return 0;
    };

    const deliveryFee = calculateDeliveryFee(totalPrice);
    const finalTotalPrice = totalPrice - totalDiscount + deliveryFee;

    const handleAddOrder = async () => {
        setLoading(true);
        const orderData = {
            orderItems: checkedItems.map(id => {
                const item = orderItems.find(o => o.product === id);
                return item ? {
                    name: item.name,
                    amount: item.amount,
                    image: item.image,
                    price: item.price,
                    discount: item.discount,
                    product: item.product
                } : null;
            }).filter(Boolean),
            fullName: userDetails.name,
            address: userDetails.address,
            phone: userDetails.phone,
            city: userDetails.city,
            paymentMethod,
            itemsPrice: totalPrice,
            shippingPrice: deliveryFee,
            totalPrice: finalTotalPrice,
            user: userDetails.id,
            email: userDetails.email
        };

        try {
            const res = await OrderService.createOrder(orderData, accessToken);
            const orderId = res._id;
            Toast.show({ type: 'success', text1: 'Đặt hàng thành công!' });
            dispatch(removeAllOrderProduct({ listChecked: checkedItems }));
            setTimeout(() => {
                router.push(`/payment/succes?orderId=${orderId}`);
            }, 1000);

        } catch (error) {
            console.error('Error creating order:', error);
            Toast.show({ type: 'error', text1: 'Đặt hàng thất bại', text2: 'Vui lòng thử lại sau' });
        } finally {
            setLoading(false);
        }
    };




    return (
        <View style={styles.container}>
            <Text style={styles.title}>Xác Nhận Thanh Toán</Text>
            {checkedItems.length > 0 ? (
                <FlatList
                    data={checkedItems}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                        const orderItem = orderItems.find(o => o.product === item);
                        return orderItem ? (
                            <View style={styles.item}>
                                <Image source={{ uri: orderItem.image }} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName} numberOfLines={1}>{orderItem.name}</Text>
                                    <Text style={styles.itemQuantity}>{`Số lượng: ${orderItem.amount}`}</Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.itemPrice}>{`${(orderItem.price * (1 - orderItem.discount / 100)).toLocaleString('vi-VN')} ₫`}</Text>
                                        <Text style={styles.discountText}> - {(orderItem.price * (orderItem.discount / 100)).toLocaleString('vi-VN')} ₫</Text>
                                    </View>
                                </View>
                            </View>
                        ) : null;
                    }}
                />
            ) : (
                <Text style={styles.emptyMessage}>Không có sản phẩm nào để thanh toán.</Text>
            )}

            <View style={styles.selectorContainer}>
                <Text style={styles.selectorLabel}>Phương thức thanh toán:</Text>
                <Picker
                    selectedValue={paymentMethod}
                    style={styles.picker}
                    onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                >
                    <Picker.Item label="Thanh toán khi nhận hàng" value="later_money" />
                    <Picker.Item label="Thanh toán paypal" value="paypal" />
                </Picker>
            </View>

            <View style={styles.selectorContainer}>
                <Text style={styles.selectorLabel}>Phương thức vận chuyển:</Text>
                <Picker
                    selectedValue={shippingMethod}
                    style={styles.picker}
                    onValueChange={(itemValue) => setShippingMethod(itemValue)}
                >
                    <Picker.Item label="Giao hàng tiêu chuẩn" value="Standard" />
                    <Picker.Item label="Giao hàng nhanh" value="Express" />
                </Picker>
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tổng cộng: {totalPrice.toLocaleString('vi-VN')} ₫</Text>
                <Text style={styles.discountText}>Giảm giá: {totalDiscount.toLocaleString('vi-VN')} ₫</Text>
                <Text style={styles.deliveryFeeText}>Phí giao hàng: {deliveryFee.toLocaleString('vi-VN')} ₫</Text>
                <Text style={styles.finalTotalText}>Tổng thanh toán: {finalTotalPrice.toLocaleString('vi-VN')} ₫</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : (

                <Button title="Xác Nhận Thanh Toán" color="#4CAF50" onPress={handleAddOrder} />


            )}

            <Toast />

        </View>
    );
};

export default Payment;
