import { message } from "antd";
import { API_CREATE_PAYOUT, API_GET_PAYOUTS, API_UPDATE_STATUS_PAYOUT } from "../consts";
import axiosInstance from "./axiosInstance";
import { TransactionsPurchase } from "../models";
//PAYOUT-01 Create Payout (Admin, Instructor)

export const createPayout = async (instructor_id: string, transactions: TransactionsPurchase[]) => {
    try {
        const response = await axiosInstance.post(API_CREATE_PAYOUT, {
            "instructor_id": instructor_id,
            "transactions": transactions
        })
        if (transactions.length > 0) {
            message.success("Create Payout Successfully!")
            return response.data;
        }
    } catch (error) {
        return;
    }
}
//Payout02 Get Payouts (Admin, Instructor)
export const getPayouts = async (payout_no: string = "",
    instructor_id: string = "",
    status: string = "",
    is_instructor: boolean = false,
    is_deleted: boolean = false,
    pageNum: number = 1,
    pageSize: number = 10) => {
    try {
        const response = await axiosInstance.post(API_GET_PAYOUTS, {
            "searchCondition": {
                "payout_no": payout_no || "",
                "instructor_id": instructor_id || "",
                "status": status || "",
                "is_instructor": is_instructor !== undefined ? is_deleted : false,
                "is_deleted": is_deleted !== undefined ? is_deleted : false,
            },
            "pageInfo": {
                "pageNum": pageNum,
                "pageSize": pageSize
            }
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
    };

//PAYOUT-03 Update Status Payout (Admin, Instructor)
export const updateStatusPayout = async (payout_id: string, status: string, comment: string) => {
    try {
        const response = await axiosInstance.put(`${API_UPDATE_STATUS_PAYOUT}/${payout_id}`, {
            "status": status,
            "comment": comment
        })
        return response
    } catch (error) {
        return [];
    }
}
