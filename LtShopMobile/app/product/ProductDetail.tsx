import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import * as ProductService from '../../services/ProductService';
import ProductDetailComponents, { Product } from '@/components/ProductDetailComponents/ProductDetailComponents';
import { Text } from 'react-native';
import store from '../../redux/store'; 
import { Provider } from 'react-redux';

const ProductDetail = () => {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null); 


    const fetchProductDetail = async () => {
        const res = await ProductService.getDetailProduct(id); 
        console.log('ádccc')
        setProduct(res.data);
    };

    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    return (
        <>
            {product ? (
                <Provider store={store}>

                    <ProductDetailComponents product={product} />
                </Provider>
            ) : (
                <Text>Loading...</Text>
            )}
        </>
    );
};

export default ProductDetail;
