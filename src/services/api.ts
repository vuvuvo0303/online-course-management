import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "https://api-ojt-hcm24-react06-group01.vercel.app",
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        // Check if the request needs token
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
)

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
            const { status, data } = error.response;
            if (status === 400) {
                toast.error('Bad Request');
            } else if (status === 401) {
                toast.error('Unauthorized. Please login again');
            } else if (status === 403) {
                toast.error('Forbidden. You do not have permission to log in');
            } else if (status === 404) {
                toast.error('Not Found');
            } else if (status === 500) {
                toast.error('Internal Server Error');
            } else {
                toast.error('Error Occurred');
            }
            return Promise.reject(data);
        } else {
            toast.error('Network error');
            return Promise.reject(error);
        }
    }
)

export default axiosInstance;
