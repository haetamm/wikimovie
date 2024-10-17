import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: `${apiBaseUrl}`,
});

axiosInstance.interceptors.request.use((config) => {
    const token = import.meta.env.VITE_TOKEN_AUTH;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosInstance;