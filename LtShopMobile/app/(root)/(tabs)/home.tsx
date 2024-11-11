import React, { useEffect, useState } from "react";
import CardComponent from "../../../components/CardComponents/CardComponents";
import { View } from "react-native";
import * as ProductService from '../../../services/ProductService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// interface Tokens {
//   accessToken: string | null;
//   refreshToken: string | null;
// }


const Home = () => {


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchProducts = async () => {
    const res = await ProductService.getAllProduct();
    setProducts(res.data);

  };


  const getAccessToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const id = await AsyncStorage.getItem('userId');

    setAccessToken(token);
    setUserId(id);

  };





  useEffect(() => {
    getAccessToken();
    fetchProducts();
  }, []);

  return (
    <View >
      <CardComponent products={products} />

    </View>
  );
};

export default Home;
