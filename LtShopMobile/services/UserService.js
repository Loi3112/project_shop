import axios from 'axios';
export const axiosJWT = axios.create()

import Constants from 'expo-constants';



const API_URL = Constants.expoConfig?.extra?.API_URL

export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}user/getAll`);
    return response.data;
};


export const userLogin = async (data) => {
    const res = await axios.post(`${API_URL}user/sign-in`, data)
    return res.data
}
export const newUser = async (data) => {
    const res = await axios.post(`${API_URL}user/sign-up`, data)

    return res.data;
};

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${API_URL}user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })

    return res.data
}


export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${API_URL}user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;

}

export const refreshToken = async () => {
    const res = await axios.post(`${API_URL}user/refresh-token`, {
        withCrendentials: true

    })

    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${API_URL}user/logout`)

    return res.data
}





export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${REACT_APP_API_KEY}/user/delete-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)
    return res.data
}


export const deleteManyUser = async (ids, access_token) => {
    const res = await axiosJWT.post(`${REACT_APP_API_KEY}/user/delete-many`, ids, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}




