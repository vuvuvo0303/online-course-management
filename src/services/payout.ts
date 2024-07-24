import { message } from "antd";
import { API_CREATE_PAYOUT, API_GET_PAYOUTS, API_UPDATE_STATUS_PAYOUT } from "../consts";
import axiosInstance from "./axiosInstance";
import { TransactionsPurchase } from "models/Purchase";
//PAYOUT-01 Create Payout (Admin, Instructor)

export const createPayout = async (instructor_id: string, transactions: TransactionsPurchase[]) => {
    try {
        console.log("transactions: ", transactions)
        const response = await axiosInstance.post(API_CREATE_PAYOUT, {
            "instructor_id": instructor_id,
            "transactions": transactions
        })
        if (response) {
            message.success("Create Payout Successfully!")
            return response.data;
        }
        message.error("Create Payout Failed!");
    } catch (error) {
        console.log("Error occurred: ", error)
        return [];
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
        console.log("Error occurred: ", error)
        return [];
    }
}

//PAYOUT-03 Update Status Payout (Admin, Instructor)
export const updateStatusPayout = async (payout_id: string, status: string, comment?: string) => {
    try {
        const response = await axiosInstance.put(`${API_UPDATE_STATUS_PAYOUT}/${payout_id}`, {
            "status": status,
            "comment": comment
        })
        if (response) {
            message.success("Send Request Payout To Admin Successfully!")
            console.log("res: ", response)
            return response;
        }
        message.error("Send Request Payout To Admin Failed!");
    } catch (error) {
        console.log("updateStatusPayout - Error occurred: ", error)
        return [];
    }
}