import ResponseData from "../models/ResponseData.ts";
import {
  API_CHANGE_PASSWORD,
  API_CHANGE_ROLE,
  API_CHANGE_STATUS,
  API_DELETE_USER,
  API_GET_USER_DETAIL,
  API_GET_USERS, API_REVIEW_PROFILE_INSTRUCTOR,
} from "../consts";
import { message } from "antd";
import { getUserFromLocalStorage, axiosInstance } from "./index.ts";
import { UserRole } from "../models/User.ts";

interface ValuesChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const user = getUserFromLocalStorage();

export const getUsers = async (
  keyword: string = "",
  role: string = "all",
  status: boolean = true,
  is_verified: boolean = true,
  is_deleted: boolean = false,
  pageNum: number = 1,
  pageSize: number = 10
) => {
  try {
    const response = await axiosInstance.post(API_GET_USERS, {
      searchCondition: {
        keyword: keyword || "",
        role: role || "all",
        status: status !== undefined ? status : true,
        is_verified: is_verified !== undefined ? is_verified : true,
        is_deleted: is_deleted !== undefined ? is_deleted : false,
      },
      pageInfo: {
        pageNum: pageNum || 1,
        pageSize: pageSize || 10,
      },
    });
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

export const getUserDetail = async (_id: string) => {
  const response = await axiosInstance.get(`${API_GET_USER_DETAIL}/${_id}`);
  return response;
};

export const changePassword = async (values: ValuesChangePassword) => {
  const response: ResponseData = await axiosInstance.put(API_CHANGE_PASSWORD, {
    user_id: user._id,
    old_password: values.oldPassword,
    new_password: values.newPassword,
  });
  if (response.success) {
    message.success("Change password successfully");
  }
};

export const deleteUser = async (_id: string, email: string, fetchUsers: () => Promise<void>) => {
  await axiosInstance.delete(`${API_DELETE_USER}/${_id}`);
  message.success(`Deleted user ${email} successfully`);
  await fetchUsers();
};

export const changeStatusUser = async (
  checked: boolean,
  userId: string,
  updateUserData: (userId: string, status: boolean) => void
) => {
  await axiosInstance.put(API_CHANGE_STATUS, {
    user_id: userId,
    status: checked,
  });
  updateUserData(userId, checked);
  message.success(`User status updated successfully`);
};

export const changeUserRole = async (userId: string, role: UserRole) => {
  await axiosInstance.put(API_CHANGE_ROLE, {
    user_id: userId,
    role,
  });
  message.success(`Role changed successfully`);
};

//USER-06 Get Instructor Detail
export const getInstructorDetailPublic = async (instructor_id: string) => {
  try {
    const response = await axiosInstance.get(`${API_GET_USER_DETAIL}/${instructor_id}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    return;
  }
};

export const reviewProfileInstructor = async (user_id: string = "", status: string = "", comment = "") => {
 try {
   const response = await axiosInstance.put(API_REVIEW_PROFILE_INSTRUCTOR, {
     user_id: user_id,
     status: status,
     comment: comment,
   });
   return response;
 }catch(error){
  return ;
 }
}