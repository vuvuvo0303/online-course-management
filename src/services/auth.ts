import axiosInstance from "./api.ts";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { paths } from "../consts";

type JwtPayload = {
  id: string;
  role: string,
  exp: number,
  iat: number,
}

export async function login(email: string, password: string): Promise<{ token: string } | null> {


  try {
    const response = await axiosInstance.post(`/api/auth`, { email, password });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (response.success) {
      const token = response.data.token;
      const decodedToken: JwtPayload = jwtDecode(token);
      localStorage.setItem("exp-token", `${decodedToken.exp}`);
      if (decodedToken.role === 'admin' || decodedToken.role === 'student' || decodedToken.role === 'instructor') {
        if (window.location.pathname.includes('/admin')) {
          if (decodedToken.role !== 'admin') {
            toast.error("You don't have permission to access this page");
            return null;
          }
        }
        return { token };
      } else {
        toast.error("Invalid user role");
        return null;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}


export const checkTokenExpiration = (navigate: ReturnType<typeof useNavigate>) => {
  const expToken = localStorage.getItem("exp-token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (expToken) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > Number(expToken)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("exp-token");
      if (user.role === 'admin') {
        navigate('admin/login')
      }
      else {
        navigate(paths.LOGIN);
      }
      return true;
    }
  }
  return false;
};