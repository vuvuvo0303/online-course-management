import { useNavigate } from "react-router-dom";
import { API_DELETE_BLOG, API_CLIENT_GET_BLOGS } from "../consts";
import axiosInstance from "./axiosInstance";
import { message } from "antd";


export const getBlogs = async (
  category_id: string = "",
  is_deleted: boolean = false,
  pageNum: number = 1,
  pageSize: number = 10
  ) => {
  try {
    const response = await axiosInstance.post(API_CLIENT_GET_BLOGS, {
      "searchCondition": {
        "category_id": category_id || "",
        "is_deleted": is_deleted !== undefined ? is_deleted : false,
      },
      "pageInfo": {
        "pageNum": pageNum || 1,
        "pageSize": pageSize || 100
      }
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

export const deleteBlog = async (id: string, title: string, getBlogs: () => Promise<void>) => {
    await axiosInstance.delete(`${API_DELETE_BLOG}/${id}`);
    message.success(`Deleted blog ${title} successfully`);
    await getBlogs();
  };

export const handleGetBlogDetail = (_id: string, navigate: ReturnType<typeof useNavigate>) => {
    navigate(`/blog/${_id}`);
};