import { message } from "antd";
import { API_DELETE_REVIEW, API_GET_REVIEW, API_GET_REVIEWS } from "../consts";
import axiosInstance from "./axiosInstance";

export const deleteReview = async (_id: string, reviewer_name: string, course_name: string, getReviews: () => Promise<void>) => {
  await axiosInstance.delete(`${API_DELETE_REVIEW}/${_id}`);
  message.success(`Review of ${reviewer_name} for course ${course_name} deleted successfully.`);
  await getReviews();
}

//REVIEW-02 Get Reviews (All)
export const getAllReviews = async (
  course_id: string = "",
  rating: number = 0,
  is_instructor: boolean = false,
  is_rating_order: boolean = false,
  is_deleted: boolean = false,
  pageNum: number = 1,
  pageSize: number = 100
) => {
  try {
    const response = await axiosInstance.post(API_GET_REVIEWS, {
      "searchCondition": {
        "course_id": course_id || "",
        "rating": rating || 0,
        "is_instructor": is_instructor !== undefined ? is_instructor : false,
        "is_rating_order": is_rating_order !== undefined ? is_rating_order : false,
        "is_deleted": is_deleted !== undefined ? is_deleted : false
      },
      "pageInfo": {
        "pageNum": pageNum || 1,
        "pageSize": pageSize || 100
      }
    })
      return response;
    } catch (error) {
      return {
        data: {
          pageInfo: {
            totalItems: 0,
            pageNum,
            pageSize
          },
          pageData: []
        }
      };
    }
  };

//REVIEW-03 Get Review (Instructor)
export const getReviewByInstructor = async (review_id: string) => {
  try {
    const response = await axiosInstance.get(`${API_GET_REVIEW}/${review_id}`)
      return response;
  } catch (error) {
    return {};
  }
}