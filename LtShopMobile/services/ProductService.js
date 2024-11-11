import axios from "axios"
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL

export const getAllProduct = async (search) => {
    const res = await axios.get(`${API_URL}product/getAll`);
    return res.data;

};


export const getDetailProduct = async (id) => {
    const res = await axios.get(`${API_URL}product/get-details/${id}`)
    return res.data
}


export const getAllTypeProduct = async () => {
    const res = await axios.get(`${API_URL}product/getAll-type`)
    return res.data
}

export const searchByName = async (searchQuery) => {
    const res = await axios.get(`${API_URL}product/search?search=${searchQuery}`);
    return res.data;
};





// export const getProductType = async (type, page, limit) => {
//     if (type) {
//         const res = await axios.get(`${process.env.API_URL}product/getAll?filter=type&filter=${type}&limit=${limit}&page=${page}`)
//         return res.data
//     }
// }



// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_KEY}/product/create`, data)

//     return res.data
// }


// export const getDetailProduct = async (id) => {
//     const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/get-details/${id}`)
//     return res.data
// }



// export const updateProduct = async (id, access_token, data) => {
//     const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/product/update/${id}`, data, {
//         headers: {
//             token: `Bearer ${access_token}`
//         }
//     })
//     return res.data
// }

// export const deleteProduct = async (id, access_token) => {
//     const res = await axiosJWT.delete(`${process.env.REACT_APP_API_KEY}/product/delete/${id}`, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }

// export const deleteManyProduct = async (ids, access_token) => {
//     const res = await axiosJWT.post(`${process.env.REACT_APP_API_KEY}/product/delete-many`, ids, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     console.log('res.data', ids)
//     return res.data
// }
