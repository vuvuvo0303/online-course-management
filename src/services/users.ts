import ResponseData from "../models/ResponseData.ts";
import axiosInstance from "../services/axiosInstance.ts";
import {API_CHANGE_PASSWORD, API_DELETE_USER, API_GET_USER_DETAIL} from "../consts/index.ts";
import {message} from "antd";
import { getUserFromLocalStorrage } from "./auth.ts";

interface ValuesChangePassword {
    oldPassword: string,
    newPassword: string
}

const user = getUserFromLocalStorrage();

export const changePassword = async (values: ValuesChangePassword) => {
    const response: ResponseData = await axiosInstance.put(API_CHANGE_PASSWORD, {
            user_id: user._id,
            old_password: values.oldPassword,
            new_password: values.newPassword
    })
    if (response.success) {
        message.success("Change password successfully");
    }
}

export const deleteUser = async (_id: string, email: string, fetchUsers: () => Promise<void>) => {
    await axiosInstance.delete(`${API_DELETE_USER}/${_id}`);
    message.success(`Deleted user ${email} successfully`);
    await fetchUsers();
};

//USER-06 Get Instructor Detail
export const getInstructorDetailPublic = async (instructor_id: string) => {
    try {
        const response = await axiosInstance.get(`${API_GET_USER_DETAIL}/${instructor_id}`
        )
        if (response) {         
            return response.data;
        }
    } catch (error) {
        return [];
    }
}
