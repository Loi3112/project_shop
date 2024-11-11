import React from 'react';
import Toast from 'react-native-toast-message';

// Hàm hiển thị thông báo thành công
const success = (message: string = 'Success') => {
    Toast.show({
        type: 'success',
        text1: message,
        position: 'top',
    });
};

// Hàm hiển thị thông báo lỗi
const error = (message: string = 'Error') => {
    Toast.show({
        type: 'error',
        text1: message,
        position: 'top',
    });
};

// Hàm hiển thị thông báo cảnh báo
const warning = (message: string = 'Warning') => {
    Toast.show({
        type: 'info',
        text1: message,
        position: 'top',
    });
};

// Xuất các hàm thông báo
export { success, error, warning };
