import { message } from "antd";
import { API_CREATE_CART, API_DELETE_CART, API_GET_CARTS, API_UPDATE_STATUS_CART } from "../consts"
import axiosInstance from "./axiosInstance"


// get carts (All)
export const getCarts = async (status: string = "", is_deleted: boolean = false, pageNum: number = 1, pageSize: number = 100) => {
    try {
        const response = await axiosInstance.post(API_GET_CARTS, {
            "searchCondition": {
                "status": status || "",
                "is_deleted": is_deleted || false
            },
            "pageInfo": {
                "pageNum": pageNum || 1,
                "pageSize": pageSize || 100
            }
        })
            return response.data.pageData;
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

//CART-01 - Create Cart (All)
export const addCourseToCart = async (course_id: string) => {
        const response = await axiosInstance.post(API_CREATE_CART, {
            "course_id": course_id
        })
            message.success("Add To Cart Successfully!")
            return response.data.pageData
}

// CART-03 update status cart (All)
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
            return response;
    } catch (error) {
        return;
    }
}

// CART-04 Delete Cart (All)
export const deleteCart = async (cart_id: string) => {
    try {
        const response = await axiosInstance.delete(`${API_DELETE_CART}/${cart_id}`)
            message.success("Delete Cart Successfully!")
            return response;
    } catch (error) {
        return;
    }
}
