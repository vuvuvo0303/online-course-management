// CategoriesDropdown.tsx
import React, { useCallback, useState, useEffect } from "react";
import { Select } from "antd";
import axiosInstance from "../../../../services/axiosInstance";
import { API_CLIENT_GET_CATEGORIES } from "../../../../consts";
import { Category as CategoryType } from "../../../../models/Category";

const { Option } = Select;

const CategoriesDropdown: React.FC<{ onSelect: (value: string) => void }> = ({ onSelect }) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(API_CLIENT_GET_CATEGORIES, {
                searchCondition: {
                    status: true,
                    is_deleted: false,
                },
                pageInfo: {
                    pageNum: 1, // Only fetch the first page
                    pageSize: 100, // Adjust as needed
                },
            });

            if (response.data) {
                setCategories(response.data.pageData || []);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <Select
            placeholder="Category"
            className="w-full md:w-1/6"
            onChange={onSelect}
            loading={loading}
        >
            {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                    {category.name}
                </Option>
            ))}
        </Select>
    );
};

export default CategoriesDropdown;
