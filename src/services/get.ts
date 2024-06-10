import axios from 'axios';
// Import các model và URL API
import { Admin, Instructor, Student, Comment, Course, Enrollment, Lecture, Payment, Review } from "../models";
import { API_ADMIN_URL, API_COURSES_URL, API_ENROLLMENT_URL, API_INSTRUCTOR_URL, API_LECTURE_URL, API_PAYMENT_URL, API_REVIEW_URL, API_STUDENT_URL } from '../consts/index';

// Hàm fetch tổng quát
export async function fetchData<T>(url: string): Promise<T[]> {
  try {
    const response = await axios.get<T[]>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
}


// Sử dụng hàm fetch tổng quát cho từng loại dữ liệu
export const fetchStudents = () => fetchData<Student>(API_STUDENT_URL);
export const fetchInstructors = () => fetchData<Instructor>(API_INSTRUCTOR_URL);
export const fetchAdmins = () => fetchData<Admin>(API_ADMIN_URL);
export const fetchComments = () => fetchData<Comment>(API_COURSES_URL);
export const fetchReviews = () => fetchData<Review>(API_REVIEW_URL);
export const fetchEnrollments = () => fetchData<Enrollment>(API_ENROLLMENT_URL);
export const fetchLectures = () => fetchData<Lecture>(API_LECTURE_URL);
export const fetchPayments = () => fetchData<Payment>(API_PAYMENT_URL);
export const fetchCourses = () => fetchData<Course>(API_COURSES_URL);
