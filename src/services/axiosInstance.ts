import axios from "axios";
import { toast } from "react-toastify";
import config from "../secret/config.ts";
import {paths} from "../consts";

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
        console.log(response)
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
            if (data && data.message) {
                if (data.message.includes("Your email")) {
                    return Promise.reject(data);
                }
                // else if(error.response.status === 403){
                //     localStorage.removeItem("token");
                //     localStorage.removeItem("user");
                //     toast.error(data.message)
                // }
                else if(error.response.status === 404){
                    toast.error(data.message);
                    window.location.href = paths.NOTFOUND;
                }
                else if(error.response.status === 500){
                    toast.error(data.message);
                    window.location.href = paths.INTERNAL_SERVER_ERROR;
                }
                else {
                    toast.error(data.message);
                }
            } else {
                data.errors.forEach((error: {field: string, message: string}) => {
                    toast.error(error.field + ": " + error.message);
                })
            }
            return Promise.reject(error.response.data);
        } else {
            toast.error('Network error');
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
