import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { router } from 'expo-router';
import styles from './style';

interface ImageDetail {
  url: string;
}

interface Product {
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

interface CardComponentProps {
  products: Product[];
}

const handlePress = (id: string) => {
  router.push(`/product/ProductDetail?id=${id}`);
};

const CardComponent: React.FC<CardComponentProps> = ({ products }) => {
  // Nếu số lượng sản phẩm là lẻ, thêm một sản phẩm giả vào
  const productsWithPlaceholder = products.length % 2 === 0
    ? products
    : [
      ...products,
      {
        _id: 'placeholder',
        name: '',
        image: '',
        type: '', // Đảm bảo có type
        price: 0,
        countInStock: 0,
        rating: 0,
        description: '',
        discount: '',
        createdAt: '',
        updatedAt: '',
        selled: 0,
        imageDetail: [],
      },
    ];

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      key={item._id}
      style={[
        styles.card,
        item._id === 'placeholder' && styles.placeholderCard, // Áp dụng style cho sản phẩm giả
      ]}
      onPress={() => item._id !== 'placeholder' && handlePress(item._id)} // Chỉ xử lý nhấn nếu không phải sản phẩm giả
    >
      <View style={styles.imageContainer}>
        {item._id !== 'placeholder' && item.imageDetail.length > 0 && (
          <Image source={{ uri: item.imageDetail[0].url }} style={styles.image} resizeMode="stretch" />
        )}
        {item._id === 'placeholder' && (
          <View style={styles.placeholder} /> // Nếu là sản phẩm giả, render vùng trống
        )}
      </View>
      <View style={styles.content}>
        {item._id !== 'placeholder' ? (
          <>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Text>Còn lại {item.countInStock}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{item.price.toLocaleString()} ₫</Text>
              <Text style={styles.discount}>
                {item.discount ? `(-${item.discount}%)` : ''}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.placeholderContent} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={productsWithPlaceholder}
      renderItem={renderItem}
      keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
      contentContainerStyle={styles.container}
      numColumns={2}
    />
  );
};

export default CardComponent;
