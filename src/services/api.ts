import axios from "axios";
import { toast } from "react-toastify";
import config from "../secret/config.ts";
import { useNavigate } from "react-router-dom";
import { paths } from "../consts";

const axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 300000,
    timeoutErrorMessage: `Connection is timeout exceeded`
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
            console.log(error.response)
            const navigate = useNavigate();

            if (data && data.message) {
                switch (error.response.status) {
                    case 403:
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        toast.error(data.message);
                        break;
                    case 404:
                        toast.error(data.message);
                        navigate(paths.NOTFOUND);
                        break;
                    case 500:
                        toast.error(data.message);
                        navigate(paths.INTERNAL_SERVER_ERROR);
                        break;
                    default:
                        if (data.message.includes("Your email")) {
                            return Promise.reject(data);
                        }
                        toast.error(data.message);
                        break;
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
