import axiosInstance from "./axiosInstance.ts";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_LOGIN, paths, roles} from "../consts";
import {User} from "models/User.ts";
import { message } from "antd";

type JwtPayload = {
  id: string;
  role: string,
  exp: number,
  iat: number,
}


export async function login(email: string, password: string){

  try {
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

  } catch (error) {
    //
  }
}


export const handleNavigateRole = async (token: string, navigate: ReturnType<typeof useNavigate>) => {
  try {
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
  }
  catch (error) {
    //
  }
};

export const logout = ( navigate: ReturnType<typeof useNavigate>) => {
  const userString = localStorage.getItem("user");
  const user: User = userString ? JSON.parse(userString) : null;
  if (user.role === roles.ADMIN) {
    navigate(paths.ADMIN_LOGIN);
  }
  else {
    navigate(paths.HOME);
  }
  localStorage.clear();
};