import axios from "axios";
import config from "../secret/config.ts";
import { paths, roles } from "../consts";
import { message } from "antd";
import { getUserFromLocalStorrage } from "./auth.ts";

export const axiosInstance = axios.create({
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
    console.log(response);
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
      console.log(error.response);

      switch (error.response.status) {
        case 403: {
          message.error(data.message);
          const user = getUserFromLocalStorrage();
          setTimeout(() => {
            if (user.role === roles.ADMIN) {
              window.location.href = paths.ADMIN_LOGIN;
            } else {
              window.location.href = paths.LOGIN;
            }
            localStorage.clear();
          }, 1300);
          break;
        }

        case 404:
          message.error(data.message);
          window.location.href = paths.NOTFOUND;
          break;

        case 500:
          message.error(data.message);
          window.location.href = paths.INTERNAL_SERVER_ERROR;
          break;

        default:
          message.error(data.message);
          break;
      }

      if (!data.message && data.errors) {
        data.errors.forEach((error: { field: string, message: string }) => {
          message.error(`${error.field}: ${error.message}`);
        });
      }

      return Promise.reject(error.response.data);
    } else {
      message.error('Network error');
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
