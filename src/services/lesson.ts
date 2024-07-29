


import { message } from "antd";
import { API_CREATE_LESSON, API_DELETE_LESSON, API_GET_LESSON, API_GET_LESSONS, API_UPDATE_LESSON } from "../consts";
import axiosInstance from "./axiosInstance";

// LESSON-01 Create Lesson (Instructor)
export const createLesson =
    async (name: string, course_id: string, session_id: string, lesson_type: string,
        description: string, video_url: string, image_url: string, full_time: number, position_order: number) => {
        try {
            const response = await axiosInstance.post(API_CREATE_LESSON, {
                "name": name,
                "course_id": course_id,
                "session_id": session_id,
                "lesson_type": lesson_type,
                "description": description,
                "video_url": video_url,
                "image_url": image_url,
                "full_time": full_time,
                "position_order": position_order
            }
            )
            if (response) {
                message.success("Create Lesson Successfully!")
                return response.data;

            }
        } catch (error) {
            console.log("createLesson - Error occurred: ", error)
            return error;
        }
    }

// LESSON-02 Get Lesson (Admin, Instructor)
export const getLessons =
    async (keyword: string, course_id: string, session_id: string, lesson_type: string,
        pageNum: number, pageSize: number) => {
        try {
            const response = await axiosInstance.post(API_GET_LESSONS, {
                "searchCondition": {
                    "keyword": keyword,
                    "course_id": course_id,
                    "session_id": session_id,
                    "lesson_type": lesson_type,
                    "is_position_order": false,
                    "is_deleted": false
                },
                "pageInfo": {
                    "pageNum": pageNum,
                    "pageSize": pageSize
                }
            }
            )
            if (response) {
                return response.data.pageData;
            }
        } catch (error) {
            console.log("getLessons - Error occurred: ", error)
            return error;
        }
    }

// LESSON-03 Get Lesson (All)
export const getLesson = async (lessonId: string) => {
    try {
        const response = await axiosInstance.get(`${API_GET_LESSON}/${lessonId}`)
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log("getLesson - Error occurred: ", error)
        return error;
    }
}

// LESSON-04 Update Lesson (Instructor)
export const updateLesson =
    async (lessonId:string, name: string, course_id: string, session_id: string, lesson_type: string,
        description: string, video_url: string, image_url: string, full_time: number, position_order: number) => {
        try {
            const response = await axiosInstance.post(`${API_UPDATE_LESSON}/${lessonId}`, {
                "name": name,
                "course_id": course_id,
                "session_id": session_id,
                "lesson_type": lesson_type,
                "description": description,
                "video_url": video_url,
                "image_url": image_url,
                "full_time": full_time,
                "position_order": position_order
            }
            )
            if (response) {
                message.success("Update Lesson Successfully!")
                return response.data;

            }
        } catch (error) {
            console.log("updateLesson - Error occurred: ", error)
            return error;
        }
    }


// COURSE-05 Delete Lesson (Instructor)
export const deleteLesson = async (lessonId: string) => {
    try {
        const response = await axiosInstance.delete(`${API_DELETE_LESSON}/${lessonId}`)
        if (response) {
            message.success("Delete Lesson Successfully!")
            return response;
        }
    } catch (error) {
        console.log("deleteLesson - Error occurred: ", error)
        return error;
    }
}
