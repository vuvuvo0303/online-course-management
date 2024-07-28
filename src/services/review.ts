import { message } from "antd";
import { API_DELETE_REVIEW } from "../consts";
import axiosInstance from "./axiosInstance";

export const deleteReview = async (_id: string, reviewer_name: string, course_name: string, getReviews: () => Promise<void>) => {
    await axiosInstance.delete(`${API_DELETE_REVIEW}/${_id}`);
    message.success(`Review of ${reviewer_name} for course ${course_name} deleted successfully.`);
    await getReviews();
  }