import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "https://api-ojt-hcm24-react06-group01.vercel.app",
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Check if the request needs a token
        if (!config.headers.skipAuth) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        console.log(config);
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
                console.log(response);
                return response.data;
            }
        }
        console.log(response);
        return response;
    },
    (error) => {
        if (error.response) {
            const { data } = error.response;
            console.log(error.response)
            if (data && data.message) {
                toast.error(data.message);
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
