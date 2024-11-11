import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Căn giữa với khoảng cách đều
        padding: 10,
    },
    card: {
        width: '48%', // Giảm chiều rộng để có khoảng cách giữa các card
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 0,
        alignItems: 'stretch',
        elevation: 3,
        marginBottom: 10, // Khoảng cách giữa các hàng
        marginHorizontal: '1%', // Khoảng cách giữa các cột
    },
    placeholderCard: {
        backgroundColor: '#d3d3d3', // Màu xám cho sản phẩm giả
        height: 225, // Chiều cao giống sản phẩm thật
        borderRadius: 12,
    },
    imageContainer: {
        width: '100%',
        height: 225,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        alignItems: 'flex-start',
        margin: 0,
        padding: 0,
    },
    productName: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16,
        color: 'rgb(56, 56, 61)',
        height: 30,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        paddingLeft: 6,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 10,
        color: 'rgb(128, 128, 137)',
        paddingLeft: 6,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 6,
    },
    price: {
        color: 'rgb(255, 66, 78)',
        fontSize: 16,
        fontWeight: '600',
    },
    discount: {
        color: 'rgb(255, 66, 78)',
        fontSize: 12,
        fontWeight: '600',
    },
    placeholder: {
        backgroundColor: '#F3F4F6', // Màu xám nhạt
        width: '100%',
        height: '100%',
        borderRadius: 0, // Giữ bo góc cho giống card thật
        borderWidth: 0,  // Không có border
        elevation: 0,    // Loại bỏ shadow của placeholder
        shadowColor: 'transparent', // Loại bỏ shadow color của placeholder
    },
    placeholderContent: {
        height: 10,
    },
});

export default styles;
