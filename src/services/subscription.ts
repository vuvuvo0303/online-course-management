import {
    API_INSTRUCTOR_OR_STUDENT_SUBSCRIPTIONS,
    API_INSTRUCTOR_OR_STUDENT_GET_SUBSCRIBER
} from "../consts";
import axiosInstance from "./axiosInstance";


// SUBSCRIPTION-01 Create Or Update Item
export const subscriptionByInstructorOrStudent = async (instructor_id?: string) => {
    if(!instructor_id){
        throw new Error("Instructor ID is required")
    }
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
                    "is_deleted": false
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