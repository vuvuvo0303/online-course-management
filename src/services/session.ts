


import { message } from "antd";
import { API_CREATE_SESSION, API_DELETE_SESSION, API_GET_SESSION, API_GET_SESSIONS, API_UPDATE_COURSE } from "../consts";
import axiosInstance from "./axiosInstance";

// SESSION-01 Create Session (Instructor)
export const createSession =
    async (name: string, course_id: string, description: string, position_order: number) => {
        try {
            const response = await axiosInstance.post(API_CREATE_SESSION, {
                "name": name,
                "course_id": course_id,
                "description": description,
                "position_order": position_order
            }
            )
            if (response) {
                message.success("Create Session Successfully!")
                return response.data;

            }
        } catch (error) {
            return {};
        }
    }

// SESSION-02 Get Sessions (Admin, Instructor)
export const getSessions =
    async (keyword: string, course_id: string, pageNum: number, pageSize: number) => {
        try {
            const response = await axiosInstance.post(API_GET_SESSIONS, {
                "searchCondition": {
                    "keyword": keyword,
                    "course_id": course_id,
                    "is_position_order": true,
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

// SESSION-03 Get Session (Instructor)
export const getSession = async (sessionId: string) => {
    try {
        const response = await axiosInstance.get(`${API_GET_SESSION}/${sessionId}`)
        if (response) {
            return response.data;
        }
    } catch (error) {
        return {};
    }
}

// SESSION-04 Update Session (Instructor)
export const updateSession =
    async (sessionId: string, name: string, course_id: string, description: string,
        position_order: number) => {
        try {
            const response = await axiosInstance.put(`${API_UPDATE_COURSE}/${sessionId}`, {
                "name": name,
                "course_id": course_id,
                "description": description,
                "position_order": position_order
            }
            )
            if (response) {
                message.success("Update Session Successfully!")
                return response.data;

            }
        } catch (error) {
            return {};
        }
    }

// SESSION-05 Delete Session (Instructor)
export const deleteSession = async (sessionId: string) => {
    try {
        const response = await axiosInstance.delete(`${API_DELETE_SESSION}/${sessionId}`)
            message.success("Delete Session Successfully!")
            return response;
    } catch (error) {
        return {};
    }
}
