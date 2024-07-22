import axios from 'axios';
import { Payment } from "../models";
import {  API_PAYMENT_URL } from '../consts';

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
export const fetchPayments = () => fetchData<Payment>(API_PAYMENT_URL);

