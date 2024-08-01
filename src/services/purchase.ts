import { API_GET_PURCHASE_BY_ADMIN, API_GET_PURCHASE_BY_INSTRUCTOR, API_GET_PURCHASE_BY_STUDENT } from "../consts";
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
                "is_deleted": false
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

// PURCHASE-02 Get Items by Instructor (Instructor)
export const getItemsByInstructor = async (purchase_no: string, cart_no: string, course_id:string, status: string, pageNum: number, pageSize: number) => {
    try {
        const response = await axiosInstance.post(API_GET_PURCHASE_BY_INSTRUCTOR, {
            "searchCondition": {
                "purchase_no": purchase_no,
                "cart_no": cart_no,
                "course_id": course_id,
                "status": status,
                "is_deleted": false
            },
            "pageInfo": {
                "pageNum": pageNum,
                "pageSize": pageSize
            }
        }
        )
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
  
export const getPurchaseForAdmin = async (
  purchase_no: string = "",
  cart_no: string = "",
  course_id: string = "",
  status: string = "",
  is_deleted: boolean = false,
  pageNum: number = 1,
  pageSize: number = 100
) => {
  try {
    const response = await axiosInstance.post(API_GET_PURCHASE_BY_ADMIN, {
      searchCondition: {
        purchase_no: purchase_no,
        cart_no: cart_no,
        course_id: course_id,
        status: status,
        is_delete: is_deleted,
      },
      pageInfo: {
        pageNum: pageNum,
        pageSize: pageSize,
      },
    })
    return response;
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
  }