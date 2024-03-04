import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: 'http://localhost:5050',
    withCredentials: true
})

api.interceptors.request.use(async (config) => {
    const authToken = await AsyncStorage.getItem("token");
  
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
  
    return config;
  }, error => {
    return Promise.reject(error);
  });
  