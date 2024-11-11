import axios from "axios"
import Constants from 'expo-constants';
const API_URL = Constants.expoConfig?.extra?.API_URL

export const getConfig = async () => {
  const res = await axios.get(`${API_URL}payment/config`)
  return res.data
}