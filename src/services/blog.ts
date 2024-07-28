import { useNavigate } from "react-router-dom";
import { API_DELETE_BLOG, API_CLIENT_GET_BLOGS } from "../consts";
import axiosInstance from "./axiosInstance";
import { message } from "antd";


export const getBlogs = async () => {
    const response = await axiosInstance.post(API_CLIENT_GET_BLOGS,
        {
            "searchCondition": {
                "category_id": "",
                "is_deleted": false
            },
            "pageInfo": {
                "pageNum": 1,
                "pageSize": 100
            }
        }
    );
    return response;
};

export const deleteBlog = async (id: string, title: string, getBlogs: () => Promise<void>) => {
    await axiosInstance.delete(`${API_DELETE_BLOG}/${id}`);
    message.success(`Deleted blog ${title} successfully`);
    await getBlogs();
  };

export const handleGetBlogDetail = (_id: string, navigate: ReturnType<typeof useNavigate>) => {
    navigate(`/blog/${_id}`);
};