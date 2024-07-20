import { API_CLIENT_GET_COURSES } from "../consts"
import axiosInstance from "./axiosInstance"

// fetch course by client
export const fetchCoursesByClient = async () => {
    try {
        const response = await axiosInstance.post(API_CLIENT_GET_COURSES, {
            "searchCondition": {
                "keyword": "",
                "category_id": "",
                "is_deleted": false
            },
            "pageInfo": {
                "pageNum": 1,
                "pageSize": 100
            }
        })
        if (response) {
            return response.data.pageData;
        }
    } catch (error) {
        console.log("Error occurred: ", error)
        return [];
    }
}