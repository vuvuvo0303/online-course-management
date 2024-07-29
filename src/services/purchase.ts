import { API_GET_PURCHASE_BY_INSTRUCTOR, API_GET_PURCHASE_BY_STUDENT } from "../consts";
import axiosInstance from "./axiosInstance";

// PURCHASE-03 Get Items by Student (Instructor, Student)
export const getItemsByStudent = async (purchase_no: string, cart_no: string, course_id:string, status: string,  pageNum: number, pageSize: number) => {
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
                "pageNum":pageNum,
                "pageSize": pageSize
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

// PURCHASE-02 Get Items by Instructor (Instructor)
export const getItemsByInstructor = async (purchase_no: string, cart_no: string, course_id:string, status: string, pageNum: number, pageSize: number) => {
    try {
        const response = await axiosInstance.post(API_GET_PURCHASE_BY_INSTRUCTOR, {
            "searchCondition": {
                "purchase_no": purchase_no,
                "cart_no": cart_no,
                "course_id": course_id,
                "status": status,
                "is_delete": false
            },
            "pageInfo": {
                "pageNum": pageNum,
                "pageSize": pageSize
            }
        }
        )
        if (response) {    
            console.log("response api: ", response)     
            return response.data.pageData;
         
        }
    } catch (error) {
        console.log("Error occurred: ", error)
        return [];
    }
}