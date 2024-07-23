import { message } from "antd";
import { API_CREATE_CART, API_DELETE_CART, API_GET_CARTS, API_UPDATE_STATUS_CART } from "../consts"
import axiosInstance from "./axiosInstance"


// display cart
export const getCarts = async (status: string) => {
    try {
        const response = await axiosInstance.post(API_GET_CARTS, {
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
        return [];
    }
}

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
        return [];
    }
}

// delete cart
export const deleteCart = async (cart_id: string) => {

    try {
        const response = await axiosInstance.delete(`${API_DELETE_CART}/${cart_id}`)
        if (response) {
            message.success("Delete Cart Successfully!")
            return response;
        }
    } catch (error) {
        return [];
    }
}

// update status cart
export const updateStatusCart = async (status: string, cart_id: string, cart_no: string) => {
    try {
        const response = await axiosInstance.put(`${API_UPDATE_STATUS_CART}`,
            {
                "status": status,
                "items": [
                    {
                        "_id": cart_id,
                        "cart_no": cart_no
                    }
                ]
            })
        if (response) {
            return response;
        }
    } catch (error) {
        return [];
    }
}