import {
    API_INSTRUCTOR_OR_STUDENT_SUBSCRIPTIONS,
    API_INSTRUCTOR_OR_STUDENT_GET_SUBSCRIBER
} from "../consts";
import axiosInstance from "./axiosInstance";


// SUBSCRIPTION-01 Create Or Update Item
export const handleSubscriptionByInstructorOrStudent = async (instructor_id: string) => {
    try {
        const response = await axiosInstance.post(API_INSTRUCTOR_OR_STUDENT_SUBSCRIPTIONS, {
            "instructor_id": instructor_id
        }
        )
        if (response) {
            return response;
        }
    } catch (error) {
        return [];
    }
}

// SUBSCRIPTION-02 Get Items by Subcriber
export const getItemsBySubscriber = async (keyword: string, pageNum: number, pageSize: number) => {
    try {
        const response = await axiosInstance.post(API_INSTRUCTOR_OR_STUDENT_GET_SUBSCRIBER,
            {
                "searchCondition": {
                    "keyword": keyword,
                    "is_delete": false
                },
                "pageInfo": {
                    "pageNum": pageNum,
                    "pageSize": pageSize
                }
            }
        )
        if (response) {
            return response.data.pageData;
        }
    } catch (error) {
        return [];
    }
}