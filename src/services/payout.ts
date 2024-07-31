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
        } else {
            message.error("Please select at least 1 purchase to create payout!");
        }
    } catch (error) {
        return;
    }
}
//Payout02 Get Payouts (Admin, Instructor)
export const getPayouts = async (payout_no: string, instructor_id: string, status: string, pageNum: number, pageSize: number,) => {
    try {
        const response = await axiosInstance.post(API_GET_PAYOUTS, {
            "searchCondition": {
                "payout_no": payout_no,
                "instructor_id": instructor_id,
                "status": status,
                "is_instructor": false,
                "is_delete": false
            },
            "pageInfo": {
                "pageNum": pageNum,
                "pageSize": pageSize
            }
        })
        if (response) {
            return response.data.pageData;
        }
        message.error("Create Payout Failed!");
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
        return;
    }
}
