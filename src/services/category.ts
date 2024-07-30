import { API_GET_CATEGORIES } from "../consts/index"
import axiosInstance from "./axiosInstance"

export const getCategories = async () => {
    try {
        const response = await axiosInstance.post(API_GET_CATEGORIES, 
            {
                "searchCondition": {
                    "keyword": "",
                    "is_delete": false
                },
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 10
                }
            }
        
        )
            return response.data.pageData;
    } catch (error) {
        return [];
    }
}