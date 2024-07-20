import { message } from "antd";
import { API_CREATE_CART, API_GET_CARTS } from "../consts"
import axiosInstance from "./axiosInstance"

// add course to cart
export const addCourseToCart = async (course_id: string) => {
    try {
        const response = await axiosInstance.post(API_CREATE_CART, {
           "course_id": course_id
        })
        if (response) {
            message.success("Add To Cart Successfully!")
            return response.data.pageData;
        }
    } catch (error) {
        console.log("Error occurred: ", error)
        return [];
    }
}

// display cart
export const displayCart = async (status: string) => {
    try {
        const response = await axiosInstance.post(API_GET_CARTS,{
            "searchCondition": {
                "status": status,
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