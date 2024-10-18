import axios from 'axios';
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: `${apiBaseUrl}`,
});

axiosInstance.interceptors.request.use((config) => {
    const token = import.meta.env.VITE_TOKEN_AUTH;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response && response.status === 401) {
                Cookies.remove("session_id");
            }
        } catch (e) {
            console.error(e);
        }
        throw error;
    }
);

export default axiosInstance;