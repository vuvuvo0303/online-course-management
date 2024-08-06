import { API_CLIENT_GET_COURSE_DETAIL, API_CLIENT_GET_COURSES } from "../consts"
import axiosInstance from "./axiosInstance"

// fetch course by client
export const fetchCoursesByClient = async (keyword: string = "", category_id: string = "", is_deleted: boolean = false, pageNum: number = 1, pageSize: number = 100) => {
  try {
    const response = await axiosInstance.post(API_CLIENT_GET_COURSES, {
      "searchCondition": {
        "keyword": keyword,
        "category_id": category_id,
        "is_deleted": is_deleted
      },
      "pageInfo": {
        "pageNum": pageNum,
        "pageSize": pageSize
      }
    })
    if (response) {
      return response.data.pageData;
    }
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

// CLIENT-02 (Public) Get Course Detail

export const getCourseDetailByStudent = async (courseId: string) => {
  try {
    const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${courseId}`)
    if (response) {
      return response.data;
    }
  } catch (error) {
    return console.log("error - getCourseDetailByStudent: ", error);
  }
};