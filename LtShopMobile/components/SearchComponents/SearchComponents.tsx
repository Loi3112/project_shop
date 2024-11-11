import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchComponents = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (value: string) => {
        setQuery(value);
        onSearch(value);
    };

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.input}
                placeholder="Tìm kiếm sản phẩm..."
                value={query}
                onChangeText={handleSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
});

export default SearchComponents;
