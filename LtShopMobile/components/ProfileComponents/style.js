import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 10,
    },
    placeholderAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        fontWeight: '500'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
    },
    updateButton: {
        backgroundColor: '#f44b42',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});


export default styles;
