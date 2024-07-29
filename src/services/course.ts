


import { message } from "antd";
import { API_COURSE_LOGS, API_CREATE_COURSE, API_DELETE_COURSE, API_GET_COURSE, API_GET_COURSES, API_UPDATE_COURSE } from "../consts";
import axiosInstance from "./axiosInstance";

// COURSE-01 Create Course (Instructor)
export const createCourseByInstructor =
    async (name: string, category_id: string, description: string, content: string,
        video_url: string, image_url: string, price: number, discount: number) => {
        try {
            const response = await axiosInstance.post(API_CREATE_COURSE, {
                "name": name,
                "category_id": category_id,
                "description": description,
                "content": content,
                "video_url": video_url,
                "image_url": image_url,
                "price": price,
                "discount": discount
            }
            )
            if (response) {
                message.success("Create Course Successfully!")
                return response.data;

            }
        } catch (error) {
            console.log("createCourseByInstructor - Error occurred: ", error)
            return error;
        }
    }

// COURSE-02 Get Courses (Admin, Instructor)
export const getCourses = async (
    keyword: string = "",
    category_id: string = "",
    status: string = "",
    is_deleted: boolean = false ,
    pageNum: number = 1,
    pageSize: number = 100
    ) => {
        const response = await axiosInstance.post(API_GET_COURSES, {
            "searchCondition": {
                "keyword": keyword || "",
                "category_id": category_id || "",
                "status": status || "",
                "is_deleted": is_deleted || false
            },
            "pageInfo": {
                "pageNum": pageNum || 1,
                "pageSize": pageSize || 10
            }
        }
            )
        return response;
    }
// COURSE-03 Get Course (Instructor)
export const getCourse = async (course_id: string) => {
    try {
        const response = await axiosInstance.get(`${API_GET_COURSE}/${course_id}`)
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log("getCourse - Error occurred: ", error)
        return error;
    }
}

// COURSE-04 Update Course (Instructor)
export const updateCourseByInstructor =
    async (courseId: string, name: string, category_id: string, description: string, content: string,
        video_url: string, image_url: string, price: number, discount: number) => {
        try {
            const response = await axiosInstance.put(`${API_UPDATE_COURSE}/${courseId}`, {
                "name": name,
                "category_id": category_id,
                "description": description,
                "content": content,
                "video_url": video_url,
                "image_url": image_url,
                "price": price,
                "discount": discount
            }
            )
            if (response) {
                message.success("Update Course Successfully!")
                return response.data;

            }
        } catch (error) {
            console.log("updateCourseByInstructor - Error occurred: ", error)
            return error;
        }
    }

// COURSE-05 Delete Course (Instructor)
export const deleteCourse = async (course_id: string) => {
    try {
        const response = await axiosInstance.delete(`${API_DELETE_COURSE}/${course_id}`)
        if (response) {
            message.success("Delete Course Successfully!")
            return response;
        }
    } catch (error) {
        console.log("deleteCourse - Error occurred: ", error)
        return error;
    }
}

// COURSE-06 Change Status (Admin, Instructor)
export const changeStatusCourse = async (course_id: string, new_status: string, comment: string) => {
    try {
        const response = await axiosInstance.put(API_DELETE_COURSE, {
            "course_id": course_id,
            "new_status": new_status,
            "comment": comment
        })
        if (response) {
            message.success("Change Status Course Successfully!")
            return response.data;
        }
    } catch (error) {
        console.log("deleteCourse - Error occurred: ", error)
        return error;
    }
}

// COURSE-07 Get Course Logs (Admin, Instructor)
export const getCourseLogs =
    async (course_id: string, keyword: string, old_status: string, new_status: string, pageNum: number, pageSize: number) => {
        try {
            const response = await axiosInstance.post(API_COURSE_LOGS, {
                "searchCondition": {
                    "course_id": course_id,
                    "keyword": keyword,
                    "old_status": old_status,
                    "new_status": new_status,
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
            console.log("getCourseLogs - Error occurred: ", error)
            return error;
        }
    }