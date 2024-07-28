import { API_DELETE_BLOG } from "../consts";
import axiosInstance from "./axiosInstance";
import { message } from "antd";

export const deleteBlog = async (id: string, title: string, getBlogs: () => Promise<void>) => {
    await axiosInstance.delete(`${API_DELETE_BLOG}/${id}`);
    message.success(`Deleted blog ${title} successfully`);
    await getBlogs();
  };