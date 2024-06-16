import axios from 'axios';
import { Admin, Instructor, Student, Comment, Course, Enrollment, Lecture, Payment, Review, Blog } from "../models";
import { API_ADMIN_URL, API_BLOGS_URL, API_COURSES_URL, API_ENROLLMENT_URL, API_INSTRUCTOR_URL, API_LECTURE_URL, API_PAYMENT_URL, API_REVIEW_URL, API_STUDENT_URL } from '../consts/index';

// Hàm post tổng quát
export async function postData<T>(url: string, data: T): Promise<T | null>{
    try{
        const response = await axios.post<T>(url, data);
        return response.data;
    }catch(error){
        console.log(`Error posting data to ${url}`);
        return null;
    }
}

// Sử dụng hàm post tổng quát cho từng loại dữ liệu
export const postStudent = (student: Student) => postData<Student>(API_STUDENT_URL, student);
export const postInstructor = (instructor: Instructor) => postData<Instructor>(API_INSTRUCTOR_URL, instructor);
export const postAdmin = (admin: Admin) => postData<Admin>(API_ADMIN_URL, admin);
export const postComment = (comment: Comment) => postData<Comment>(API_COURSES_URL, comment);
export const postReview = (review: Review) => postData<Review>(API_REVIEW_URL, review);
export const postEnrollment = (enrollment: Enrollment) => postData<Enrollment>(API_ENROLLMENT_URL, enrollment);
export const postLecture = (lecture: Lecture) => postData<Lecture>(API_LECTURE_URL, lecture);
export const postPayment = (payment: Payment) => postData<Payment>(API_PAYMENT_URL, payment);
export const postCourse = (course: Course) => postData<Course>(API_COURSES_URL, course);
export const postBlog = (blog: Blog) => postData<Blog>(API_BLOGS_URL, blog);