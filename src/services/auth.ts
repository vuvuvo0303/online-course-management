import axiosInstance from "./api.ts";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

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
    console.error('Error logging in:', error);
    return null;
  }
}
