import { API_GET_PURCHASE_BY_STUDENT } from "../consts";
import axiosInstance from "./axiosInstance";

// PURCHASE-03 Get Items by Student
export const getItemsByStudent = async (purchase_no: string, cart_no: string, course_id:string, status: string) => {
    try {
        const response = await axiosInstance.post(API_GET_PURCHASE_BY_STUDENT, {
            "searchCondition": {
                "purchase_no": purchase_no,
                "cart_no": cart_no,
                "course_id": course_id,
                "status": status,
                "is_delete": false
            },
            "pageInfo": {
                "pageNum": 1,
                "pageSize": 100
            }
        }
        )
        if (response) {         
            return response.data.pageData;
        }
    } catch (error) {
        console.log("Error occurred: ", error)
        return [];
    }
}