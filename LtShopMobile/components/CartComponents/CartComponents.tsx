import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Button, ImageStyle, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../redux/store';
import { removeOrderProduct, increaseAmount, decreaseAmount } from '../../redux/slides/orderSlide';
import { Checkbox } from 'react-native-paper';
import styles from './style';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as UserService from '../../services/UserService';
import Modal from "react-native-modal"; // Sửa đổi ở đây
import { Icon } from "native-base";
import Toast from "react-native-toast-message";

interface OrderItem {
    product: string;
    name: string;
    amount: number;
    price: number;
    image: string;
    discount: number;
}

const CartContent = () => {
    const orderItems = useSelector((state: RootState) => state.order.orderItems) as OrderItem[];
    const dispatch = useDispatch();
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');





    const handleDeleteOrder = (idProduct: string) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleChangeCount = (type: 'increase' | 'decrease', idProduct: string, limited: boolean) => {
        if (type === 'increase' && !limited) {
            dispatch(increaseAmount({ idProduct }));
        } else if (type === 'decrease' && !limited) {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleCheckboxChange = (productId: string) => {
        setCheckedItems(prev =>
            prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        );
    };

    const getTokenAndID = async () => {
        const token = await AsyncStorage.getItem('access_token');
        const id = await AsyncStorage.getItem('userId');
        setAccessToken(token);
        setUserId(id);
    };

    const fetchUser = async () => {
        if (userId && accessToken) {
            const res = await UserService.getDetailUser(userId, accessToken);
            setUserInfo(res);
        }
    };

    useEffect(() => {
        getTokenAndID();
    }, []);

    useEffect(() => {
        fetchUser();
    }, [userId, accessToken]);

    // Tính tổng giá trị đơn hàng đã chọn
    const totalPrice = orderItems.reduce((acc, item) => {
        if (checkedItems.includes(item.product)) {
            return acc + (item.price * item.amount);
        }
        return acc;
    }, 0);

    // Tính tổng số tiền giảm giá
    const totalDiscount = orderItems.reduce((acc, item) => {
        if (checkedItems.includes(item.product)) {
            const discountAmount = item.price * (item.discount / 100);
            return acc + (discountAmount * item.amount);
        }
        return acc;
    }, 0);

    // Tính phí giao hàng
    const calculateDeliveryFee = (total: number) => {
        if (total < 200000) return 20000;
        if (total >= 200000 && total < 500000) return 10000;
        return 0;
    };

    const deliveryFee = calculateDeliveryFee(totalPrice);
    const finalTotalPrice = totalPrice - totalDiscount + deliveryFee;

    const handleCheckout = async () => {
        if (!userId || !accessToken) {
            setModalOpen(true);
            return;
        }

        const res = await UserService.getDetailUser(userId, accessToken);
        if (!res.data.name || !res.data.address || !res.data.city || !res.data.phone) {
            setModalOpen(true);
            return;
        }

        const selectedItems = orderItems.filter(item => checkedItems.includes(item.product));

        if (selectedItems.length === 0) {
            alert('Vui lòng chọn sản phẩm để thanh toán!!!')
            return;
        }

        const selectedItemIds = selectedItems.map(item => item.product);
        router.push({
            pathname: '/payment/payment',
            params: { selectedItemIds }
        });
    };


    const onClose = () => {
        setModalOpen(false);
    };

    const handleUpdate = async () => {
        if (!name || !phone || !address || !city) {
            Toast.show({ type: 'error', text1: 'Vui lòng điền đầy đủ thông tin!' });
            return;
        }
        await UserService.updateUser(userId, {
            name,
            phone,
            address,
            city,
        }, accessToken);
        Toast.show({ type: 'success', text1: 'Cập nhật thành công!' });
        setTimeout(() => {
            onClose();
        }, 1000);

    };





    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng</Text>
            {orderItems.length > 0 ? (
                <>
                    <FlatList
                        data={orderItems}
                        keyExtractor={(item) => item.product}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Checkbox
                                    status={checkedItems.includes(item.product) ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange(item.product)}
                                />
                                <Image source={{ uri: item.image }} style={styles.itemImage as ImageStyle} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.itemPrice}>{item.price.toLocaleString('vi-VN')} ₫</Text>
                                        <Text style={styles.discountText}> - {(item.price * (item.discount / 100)).toLocaleString('vi-VN')} ₫</Text>
                                    </View>
                                    <View style={styles.amountContainer}>
                                        <TouchableOpacity
                                            style={styles.amountButton}
                                            onPress={() => handleChangeCount('decrease', item.product, item.amount <= 1)}
                                        >
                                            <Text style={styles.amountButtonText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.amountText}>{item.amount}</Text>
                                        <TouchableOpacity
                                            style={styles.amountButton}
                                            onPress={() => handleChangeCount('increase', item.product, false)}
                                        >
                                            <Text style={styles.amountButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => handleDeleteOrder(item.product)}>
                                    <AntDesign name="delete" size={22} color="black" style={styles.deleteButton} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <View style={styles.summary}>
                        <View style={styles.summaryDetails}>
                            <Text style={styles.summaryText}>Tạm tính: {totalPrice.toLocaleString('vi-VN')} ₫</Text>
                            <Text style={styles.summaryText}>Giảm giá: {totalDiscount.toLocaleString('vi-VN')} ₫</Text>
                            <Text style={styles.summaryText}>Phí giao hàng: {deliveryFee.toLocaleString('vi-VN')} ₫</Text>
                        </View>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Tổng cộng: {finalTotalPrice.toLocaleString('vi-VN')} ₫</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleCheckout}
                            >
                                <Text style={styles.buttonText}>Đặt hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        isVisible={isModalOpen}
                        onBackdropPress={onClose} // Đóng modal khi bấm ra ngoài
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                {/* Biểu tượng dấu "X" để đóng modal */}
                                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                    <AntDesign name="close" size={24} color="black" />
                                </TouchableOpacity>

                                <Text style={styles.modalTitle}>Thông báo</Text>
                                <Text style={styles.modalMessage}>
                                    Vui lòng cung cấp đầy đủ thông tin người dùng trước khi đặt hàng.
                                </Text>

                                <Text style={styles.label}>Tên:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập tên..."
                                    placeholderTextColor="#999"
                                    onChangeText={setName}
                                    value={name}

                                />

                                <Text style={styles.label}>Thành phố:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập thành phố..."
                                    placeholderTextColor="#999"
                                    onChangeText={setCity}
                                    value={city}

                                />

                                <Text style={styles.label}>Địa chỉ:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập địa chỉ..."
                                    placeholderTextColor="#999"
                                    onChangeText={setAddress}
                                    value={address}

                                />

                                <Text style={styles.label}>Số điện thoại:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập số điện thoại..."
                                    placeholderTextColor="#999"
                                    onChangeText={setPhone}
                                    value={phone}
                                />

                                <Button title="Đóng" onPress={handleUpdate} />
                            </View>
                        </View>
                        <Toast />
                    </Modal>

                </>
            ) : (
                <Text>Giỏ hàng trống</Text>
            )}

        </View>
    );
};

export default CartContent;
