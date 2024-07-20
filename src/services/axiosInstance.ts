import axios from "axios";
import config from "../secret/config.ts";
import {paths, roles} from "../consts";
import { message } from "antd";

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
                if(error.response.status === 403){
                    message.error(data.message)
                     const userString = localStorage.getItem("user");
                     const user = userString ? JSON.parse(userString) : null;
                     
                     if(user.role === roles.ADMIN){
                        window.location.href = paths.ADMIN_LOGIN;
                     }
                     else{
                        window.location.href = paths.LOGIN;
                     }
                     localStorage.clear();
                }
                 else if(error.response.status === 404){
                    message.error(data.message);
                    window.location.href = paths.NOTFOUND;
                }
                else if(error.response.status === 500){
                    message.error(data.message);
                    window.location.href = paths.INTERNAL_SERVER_ERROR;
                }
                else {
                    message.error(data.message);
                }
            } else {
                data.errors.forEach((error: {field: string, message: string}) => {
                    message.error(error.field + ": " + error.message);
                })
            }
            return Promise.reject(error.response.data);
        } else {
            message.error('Network error');
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
