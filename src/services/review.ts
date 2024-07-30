import { message } from "antd";
import { API_DELETE_REVIEW, API_GET_REVIEW, API_GET_REVIEWS } from "../consts";
import axiosInstance from "./axiosInstance";

export const deleteReview = async (_id: string, reviewer_name: string, course_name: string, getReviews: () => Promise<void>) => {
  await axiosInstance.delete(`${API_DELETE_REVIEW}/${_id}`);
  message.success(`Review of ${reviewer_name} for course ${course_name} deleted successfully.`);
  await getReviews();
}

//REVIEW-02 Get Reviews (All)
export const getAllReviews = async (course_id: string, rating: number, pageNum: number, pageSize: number) => {
  try {
    const response = await axiosInstance.post(API_GET_REVIEWS, {
      "searchCondition": {
        "course_id": course_id,
        "rating": rating,
        "is_instructor": false,
        "is_rating_order": false,
        "is_deleted": false
      },
      "pageInfo": {
        "pageNum": pageNum,
        "pageSize": pageSize
      }
    })
      return response.data.pageData;
  } catch (error) {
    return error;
  }
}

//REVIEW-03 Get Review (Instructor)
export const getReviewByInstructor = async (review_id: string) => {
  try {
    const response = await axiosInstance.get(`${API_GET_REVIEW}/${review_id}`)
      return response;
  } catch (error) {
    return {};
  }
}