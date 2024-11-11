import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as UserService from '../../services/UserService';
import * as ProductService from '../../services/ProductService';
import { router, useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import styles from './style'; // Import style từ file riêng biệt

const HeaderComponent = () => {
  const insets = useSafeAreaInsets();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

  const orderItems = useSelector((state: any) => state.order.orderItems);
  const uniqueProductCount = orderItems.length;

  const getTokenAndID = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const id = await AsyncStorage.getItem('userId');
    setAccessToken(token);
    setUserId(id);
  };

  const fetchUserDetails = async () => {
    if (userId && accessToken) {
      const res = await UserService.getDetailUser(userId, accessToken);
      setUserDetails(res.data);
      if (res && res.data.avatar) {
        setAvatarUrl(res.data.avatar);
      }
    }
  };

  useEffect(() => {
    getTokenAndID();
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [userId, accessToken]);

  const handleSearchPress = async () => {
    if (searchQuery.trim() !== '') {
      const res = await ProductService.searchByName(searchQuery);
      router.push(`/search/search?query=${searchQuery}`);
    } else {
      console.log('Không có từ khóa tìm kiếm');
    }
  };

  const handleSubmitEditing = () => {
    handleSearchPress();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.logo} onPress={() => router.navigate('/')}>
        NTL
      </Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSubmitEditing} // Gọi hàm khi nhấn "Enter"
        />
        <TouchableOpacity onPress={handleSearchPress} style={styles.searchIconContainer}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => router.navigate('/payment/cart')}
      >
        <AntDesign name="shoppingcart" size={26} color="black" />
        {uniqueProductCount > 0 && (
          <View style={styles.cartItemCount}>
            <Text style={styles.itemCountText}>{uniqueProductCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
