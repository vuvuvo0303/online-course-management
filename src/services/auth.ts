import { fetchStudents, fetchInstructors } from './get';
import { Student, Instructor } from '../models';
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./api.ts";
import { toast } from "react-toastify";

export async function login(email: string, password: string): Promise<{ user: Student | Instructor } | { status: string } | null> {
  try {
    const [students, instructors] = await Promise.all([
      fetchStudents(),
      fetchInstructors(),
    ]);

    const student = students.find(student => student.email === email && student.password === password);
    if (student) {
      if (!student.status) {
        return { status: "Account is disabled" };
      }
      return { user: student };
    }

    const instructor = instructors.find(instructor => instructor.email === email && instructor.password === password);
    if (instructor) {
      if (!instructor.status) {
        return { status: "Account is disabled" };
      }
      return { user: instructor };
    }

    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}


type JwtPayload = {
  id: string;
  role: string,
  exp: number,
  iat: number,
}


export async function loginAdmin(email: string, password: string): Promise<{ token: string } | null> {
  try {
    const response = await axiosInstance.post(`/api/auth`, { email, password });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (response.success) {
      const token = response.data.token;
      const decodedToken: JwtPayload = jwtDecode(token);
      if (decodedToken.role !== 'admin') {
        toast.error("You don't have permission");
        return null;
      }
      return { token };
    }

    return null;
  } catch (error) {
    console.error('Error logging in as admin:', error);
    return null;
  }
}



