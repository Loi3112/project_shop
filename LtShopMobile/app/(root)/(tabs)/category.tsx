import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ProductService from '../../../services/ProductService';
import CardComponent from '@/components/CardComponents/CardComponents';

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


interface CategoryItem {
    id: string;
    name: string;
    image?: string;
}

const Category = () => {
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');

    const fetchCategory = async () => {
        const res = await ProductService.getAllTypeProduct();
        const productsRes = await ProductService.getAllProduct();
        setProducts(productsRes.data);

        const formattedData = res.data.map((item: string, index: number) => {
            console.log('ádasrawrasrasd')

            const validProducts = productsRes.data.filter((product: Product) => product.type === item && product.imageDetail.length > 0);
            const randomProduct = validProducts.length > 0 ? validProducts[Math.floor(Math.random() * validProducts.length)] : null;
            const imageUrl = randomProduct ? randomProduct.imageDetail[0].url : 'https://salt.tikicdn.com/cache/750x750/ts/product/3b/c3/d4/50d058cf65aae7000ad02cf4febbb076.jpg.webp';

            return {
                id: index.toString(),
                name: item,
                image: imageUrl,
            };
        });

        setCategories(formattedData);
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setSelectedProducts([]);
            setSelectedCategoryName('');
        }, [])
    );

    const handlePress = (name: string) => {
        const filteredProducts = products.filter((product) => product.type === name);
        setSelectedProducts(filteredProducts);
        setSelectedCategoryName(name);
    };

    const renderCategory = ({ item }: { item: CategoryItem }) => (
        <TouchableOpacity className="flex-1 m-2 bg-white rounded-lg shadow overflow-hidden" onPress={() => handlePress(item.name)}>
            <Image source={{ uri: item.image }} className="w-full h-24" />
            <Text className="text-center text-lg font-bold p-2">{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-100 p-4">
            {selectedProducts.length === 0 ? (
                <>
                    <Text className="text-2xl font-bold mb-4">Danh Sách Thể Loại</Text>
                    <FlatList
                        data={categories}
                        renderItem={renderCategory}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            ) : (
                <View>
                    <Text className="text-2xl font-bold mb-4">{selectedCategoryName}</Text>
                    <CardComponent products={selectedProducts} />
                </View>
            )}
        </View>
    );
};

export default Category;
