import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as ProductService from '../../services/ProductService';
import CardComponent from '../../components/CardComponents/CardComponents'; // Đảm bảo đường dẫn đúng

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

const SearchPage = () => {
    const { query } = useLocalSearchParams();
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSearchResults = async () => {
        if (!query) return;
        setLoading(true);
        const res = await ProductService.searchByName(query);
        if (res.status === 'SUCCESS' && res.products) {
            setSearchResults(res.products);
        } else {
            setSearchResults([]);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchSearchResults();
    }, [query]);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {/* Hiển thị tiêu đề tìm kiếm */}
            {query && (
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    Kết quả tìm kiếm của: <Text style={{ color: '#3498db' }}>{query}</Text>
                </Text>
            )}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : searchResults.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có sản phẩm nào phù hợp với tìm kiếm của bạn.</Text>
            ) : (
                <CardComponent products={searchResults} />
            )}
        </View>
    );
};

export default SearchPage;
