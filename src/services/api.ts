import axios from "axios";
import { toast } from "react-toastify";
import config from "../secret/config.ts";

const axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers.skipAuth) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 200 || response.status === 201) {
            if (response.data.success) {
                return response.data;
            }
        }
        return response;
    },
    (error) => {
        if (error.response) {
            const { data } = error.response;
            if (data && data.message) {
                if (data.message.includes("Your email")) {
                    // Handle specific message or return without showing toast
                    return Promise.reject(data);
                } else {
                    toast.error(data.message);
                }
            } else {
                toast.error('An error occurred');
            }
            return Promise.reject(error.response.data);
        } else {
            toast.error('Network error');
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
