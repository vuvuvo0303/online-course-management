import { API_INSTRUCTOR_OR_STUDENT_SUBSCRIPTIONS } from "../consts";
import axiosInstance from "./axiosInstance";


// SUBSCRIPTION-01 Create Or Update Item
export const handleSubscriptionByInstructorOrStudent = async (instructor_id:string) => {
    try {
        const response = await axiosInstance.post(API_INSTRUCTOR_OR_STUDENT_SUBSCRIPTIONS, {
            "instructor_id": instructor_id
        }
        )
        if (response) {  
            console.log("res: ", response)       
            return response;
        }
    } catch (error) {
        console.log("handleSubscriptionByInstructorOrStudent - Error occurred: ", error)
        return [];
    }
}