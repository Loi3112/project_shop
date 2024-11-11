import { ScrollView } from 'native-base';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import styles from './style';
import { addOrderProduct } from '../../redux/slides/orderSlide'; // Đảm bảo import đúng
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';

// Định nghĩa các interface cho dữ liệu
export interface ImageDetail {
    url: string;
    _id: string;
}

export interface Product {
    _id: string;
    name: string;
    image: string;
    type: string;
    price: number;
    countInStock: number;
    rating: number;
    description: string;
    discount: string;
    createdAt: string;
    updatedAt: string;
    selled: number;
    imageDetail: ImageDetail[];
}

interface ProductDetailComponentsProps {
    product: Product;
}

const ProductDetailComponents: React.FC<ProductDetailComponentsProps> = ({ product }) => {
    const [quantity, setQuantity] = React.useState<number>(1);
    const dispatch = useDispatch();

    // Hàm tăng số lượng
    const increaseQuantity = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, product.countInStock));
    };

    // Hàm giảm số lượng
    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };



    const handleAddToCart = () => {
        dispatch(addOrderProduct({
            userId: 'userId', // Thay thế bằng userId thực tế
            orderItem: {
                name: product.name,
                amount: quantity,
                image: product.imageDetail[0]?.url, // Đảm bảo có hình ảnh
                price: product.price,
                product: product._id,
                discount: product.discount,
            },
        }));
        setQuantity(1);

    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={5}
                >
                    {product.imageDetail.map(image => (
                        <View key={image._id} style={styles.slide}>
                            <Image
                                source={{ uri: image.url }}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>
                    ))}
                </Swiper>

                <View style={styles.detailsContainer}>
                    <Text style={styles.productTitle}>{product.name}</Text>
                    <Text style={styles.soldCount}>Còn lại: {product.countInStock || 0} sản phẩm</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>
                            {product.price
                                ? (product.price * (1 - Number(product.discount) / 100)).toLocaleString() + '₫' // Giá đã giảm
                                : 'Giá chưa có'}
                        </Text>
                        <Text style={styles.discountPercentage}>{product.discount ? `(-${product.discount}%)` : ''}</Text>
                        <Text style={styles.originalPrice}>{product.price.toLocaleString() + '₫'}</Text>
                    </View>

                    <View style={styles.quantityContainer}>
                        <View style={styles.quantityInputContainer}>
                            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                                <AntDesign name="minus" size={24} color="black" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.quantityInput}
                                value={String(quantity)}
                                keyboardType="numeric"
                                onChangeText={text => {
                                    const newQuantity = Number(text);
                                    if (newQuantity > 0 && newQuantity <= product.countInStock) {
                                        setQuantity(newQuantity);
                                    }
                                }}
                            />
                            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                                <AntDesign name="plus" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                            <Text style={styles.buttonText}>Thêm vào giỏ</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </ScrollView>
        </View>
    );
};



export default ProductDetailComponents;
