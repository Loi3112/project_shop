import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    item: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        height: 130,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#555',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
        marginRight: 10,
    },
    selectorContainer: {
        marginTop: 20,
    },
    selectorLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    picker: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
    totalContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 30,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    discountText: {
        fontSize: 16,
        color: '#f00',
    },
    deliveryFeeText: {
        fontSize: 16,
        color: '#333',
    },
    finalTotalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default styles;
