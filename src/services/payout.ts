import { message } from "antd";
import { API_CREATE_PAYOUT, API_GET_PAYOUTS } from "../consts";
import axiosInstance from "./axiosInstance";
//PAYOUT-01 Create Payout (Admin, Instructor)
export const createPayout = async (instructor_id: string, purchase_id: string) => {
    try {
        const response = await axiosInstance.post(API_CREATE_PAYOUT, {
            "instructor_id": instructor_id,
            "transactions": [
                {
                    "purchase_id": purchase_id
                }
            ]
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