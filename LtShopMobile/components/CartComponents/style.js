import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        gap: 5
    },
    itemImage: {
        width: 80,
        height: 90,
        marginRight: 8,
        borderRadius: 8
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 0,
        marginTop: 16,
    },
    originalPrice: {
        fontSize: 10,
        color: '#888',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    itemPrice: {
        fontSize: 13,
        color: 'red',
        fontWeight: 'bold',
        paddingLeft: 0,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'flex-start',
        marginVertical: 8,
        paddingLeft: 0,
        margin: 0,
    },
    amountButton: {
        backgroundColor: '#007BFF',
        width: 25,
        height: 25,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    amountButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    amountText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        minWidth: 30,
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        height: 25,
        lineHeight: 25,
    },
    deleteButton: {
        color: 'red',
        fontWeight: 'bold',
        marginRight: 8,
    },
    summary: {
        marginTop: 16,
        padding: 8,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    summaryText: {
        fontSize: 16,
        fontWeight: '600',
    },
    discountText: {
        fontSize: 10,
        color: 'red',
        marginLeft: 5,
    },
    priceContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Căn trái
    },
    button: {
        backgroundColor: '#007bff', // Màu nền của nút
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // Màu chữ của nút
        fontSize: 16,
    }, summaryDetails: {
        marginBottom: 10, // Khoảng cách giữa các thông tin
    },

    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    totalText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    },


    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff', // Màu nền trắng
        borderRadius: 10,
        padding: 20,
        alignItems: 'stretch',
        position: 'relative', // Để sử dụng position absolute cho nút đóng
        // Căn chỉnh các phần tử bên trong chiếm toàn bộ chiều rộng
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: 300, // Chiếm toàn bộ chiều rộng của modal
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 0, // Đặt top = 0 để nằm ở góc trên
        right: 0, // Đặt right = 0 để nằm ở góc bên phải
        zIndex: 1,
        padding: 10, // Thêm padding để nút không bị chạm vào cạnh
    },
});

export default styles;
