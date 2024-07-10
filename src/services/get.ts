import axios from 'axios';
import { Enrollment, Payment, Review, Blog } from "../models";
import { API_BLOGS_URL, API_ENROLLMENT_URL, API_PAYMENT_URL, API_REVIEW_URL } from '../consts';

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
export const fetchReviews = () => fetchData<Review>(API_REVIEW_URL);
export const fetchEnrollments = () => fetchData<Enrollment>(API_ENROLLMENT_URL);
export const fetchPayments = () => fetchData<Payment>(API_PAYMENT_URL);
export const fetchBlogs = () => fetchData<Blog>(API_BLOGS_URL);

