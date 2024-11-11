import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    soldCount: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        color: 'red',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 20
    },
    quantityLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    quantityInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2', 
        borderRadius: 18, 
        paddingVertical: 10,
        paddingHorizontal: 15, 
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    quantityButton: {
        marginHorizontal: 5,
    },
    addToCartButton: {
        backgroundColor: '#f44b42',
        padding: 18,
        borderRadius: 5,
        width: '60%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    priceContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 10
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#777',
    },
    discountPercentage: {
        color: '#f44b42',
        fontSize: 16,
        fontWeight: 'bold',
    },
    wrapper: {
        height: 300, 
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
  
});
export default styles;
