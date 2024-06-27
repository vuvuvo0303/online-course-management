import { fetchStudents, fetchInstructors } from './get';
import { Student, Instructor } from '../models';
import {host_main} from "../consts";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

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

export async function loginAdmin(email: string, password: string): Promise<{ token: string, userId: string } | { status: string } | null> {
  try {
    const response = await axios.post(`${host_main}/api/auth`, { email, password });
    if (response.data.success) {
      const token = response.data.data.token;
      const decodedToken: JwtPayload = jwtDecode(token);
      console.log(decodedToken)
      if(decodedToken.role !== "admin"){
        return { status: "Account not authorization" };
      }
      const userId = decodedToken.id;
      return { token, userId };
    }

    return { status: "Login failed" };
  } catch (error) {
    console.error('Error logging in as admin:', error);
    return null;
  }
}



