import axiosInstance from "./axiosInstance.ts";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_CURRENT_LOGIN_USER, API_LOGIN, API_LOGIN_WITH_GOOGLE, API_REGISTER_WITH_GOOGLE, paths, roles} from "../consts";
import {User} from "models/User.ts";
import { message } from "antd";

type JwtPayload = {
  id: string;
  role: string,
  exp: number,
  iat: number,
}

export function getUserFromLocalStorage(){
  const userString = localStorage.getItem("user");
  const user: User = userString ? JSON.parse(userString) : "";
  return user
}

export async function login(email: string, password: string){

    const response = await axiosInstance.post(API_LOGIN, { email, password });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (response.success) {
      const token = response.data.token;
      const decodedToken: JwtPayload = jwtDecode(token);
      if (decodedToken.role === roles.ADMIN || decodedToken.role === roles.STUDENT || decodedToken.role === roles.INSTRUCTOR) {
        if (window.location.pathname.includes('/admin')) {
          if (decodedToken.role !== roles.ADMIN) {
            message.error("You don't have permission to access this page");
            return null;
          }
        }
        else{
          if (decodedToken.role === roles.ADMIN) {
            message.error(`You login wrong path. Navigate in 2s`);
           setTimeout(() => {
             window.location.href = paths.ADMIN_LOGIN;
           }, 2000)
            return null;
          }
        }
        return { token };
      } else {
        message.error("Invalid user role");
      }
    }
}

export const loginWithGoogle = async (googleId: string, navigate: ReturnType<typeof useNavigate>, setIsModalVisible: (visible: boolean) => void) => {
  try {
    const responseLogin = await axiosInstance.post(API_LOGIN_WITH_GOOGLE, {
      google_id: googleId,
    });
    localStorage.setItem("token", responseLogin.data.token);
    const currentUser = await axiosInstance.get(API_CURRENT_LOGIN_USER);
    localStorage.setItem("user", JSON.stringify(currentUser.data));
    message.success("Login successfully");
    navigate(paths.HOME);
  } catch (error) {
    setIsModalVisible(true);
  }
};

export const registerWithGoogle = async (
  googleId: string,
  role: string,
  additionalFields: {
    description: string;
    phone_number: string;
    video: string;
  },
  navigate: ReturnType<typeof useNavigate>
) => {
  await axiosInstance.post(API_REGISTER_WITH_GOOGLE, {
    google_id: googleId,
    role: role,
    ...additionalFields,
  });
  const responseLogin = await axiosInstance.post(API_LOGIN_WITH_GOOGLE, {
    google_id: googleId,
  });
  localStorage.setItem("token", responseLogin.data.token);
  const currentUser = await axiosInstance.get(API_CURRENT_LOGIN_USER);
  localStorage.setItem("user", JSON.stringify(currentUser.data));
  message.success("Registered and logged in successfully");
  navigate(paths.HOME);
};


export const handleNavigateRole = async (token: string, navigate: ReturnType<typeof useNavigate>) => {
    const response = await axiosInstance.get(API_LOGIN);
    const user = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    switch (user.role) {
      case roles.STUDENT:
        navigate(paths.HOME);
        break;
      case roles.INSTRUCTOR:
        navigate(paths.INSTRUCTOR_HOME);
        break;
      case roles.ADMIN:
        navigate(paths.ADMIN_HOME);
        break;
      default:
        navigate(paths.HOME);
        break;
    }
    message.success("Login successfully");
};

export const getCurrentLoginUser = async (token: string) => {
  const response = await axiosInstance.get(API_CURRENT_LOGIN_USER);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(response.data));
};

export const logout = ( navigate: ReturnType<typeof useNavigate>) => {
  const user: User = getUserFromLocalStorage();
  if (user.role === roles.ADMIN) {
    navigate(paths.ADMIN_LOGIN);
  }
  else {
    navigate(paths.HOME);
  }
  message.info("You logout from the system");
  localStorage.clear();
};
