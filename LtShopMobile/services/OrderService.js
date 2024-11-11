import { axiosJWT } from "./UserService"
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig?.extra?.API_URL

export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`${API_URL}/order/get-all-order`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}


export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${API_URL}order/create/${data.user}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });

    return res.data;

};

export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${API_URL}order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getOrderByUserId = async (id, access_token) => {
    const res = await axiosJWT.get(`${API_URL}order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const cancelOrder = async (id, access_token, orderItems, userId) => {
    const data = { orderItems, orderId: id }
    const res = await axiosJWT.delete(`${API_URL}order/cancel-order/${userId}`, { data }, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

// export const getAllOrder = async (access_token) => {
//     const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/get-all-order`, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }

// export const updateDeliveryStatus = async (orderId, access_token) => {
//     try {
//         const res = await axiosJWT.post(
//             `${process.env.REACT_APP_API_KEY}/order/update-delivery/${orderId}`,
//             {},
//             {
//                 headers: {
//                     token: `Bearer ${access_token}`,
//                 },
//             }
//         );
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// };