import { useCallback, useEffect, useState } from "react";
import { Input, Spin, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axiosInstance from "../../services/axiosInstance";
import { API_CLIENT_GET_CATEGORIES } from "../../consts";
import { Category as CategoryType } from "../../models/Category";
import CategoryCard from "./category-card/index"; // Adjust the path accordingly


const NameCategory: React.FC = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]); // Use CategoryType for type safety
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(API_CLIENT_GET_CATEGORIES, {
                searchCondition: {
                    status: true,
                    is_deleted: false,
                    keyword: searchText,
                },
                pageInfo: {
                    pageNum: pagination.current,
                    pageSize: pagination.pageSize,
                },
            });

            if (response.data) {
                setCategories(response.data.pageData || []);
                setPagination((prev) => ({
                    ...prev,
                    total: response.data.pageInfo?.totalItems || response.data.length,
                    current: response.data.pageInfo?.pageNum || 1,
                    pageSize: response.data.pageInfo?.pageSize || prev.pageSize,
                }));
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }, [searchText, pagination.current, pagination.pageSize]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleSearch = () => {
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
        fetchCategories();
    };

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize: pageSize || prev.pageSize,
        }));
        fetchCategories();
    };
    const handleSearchText= (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
      };
    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <Input.Search
                    placeholder="Search by Name"
                    value={searchText}
                    onChange={handleSearchText}
                    onSearch={handleSearch}
                    style={{ width: 200 }}
                    enterButton={<SearchOutlined />}
                />
            </div>
            {loading ? (
                <p className="text-center flex justify-center">Loading ...</p>
            ) : (
                <>
                    <Spin spinning={loading}>
                        <div className="flex flex-wrap -m-2">
                            {categories.map((category) => (
                                <CategoryCard key={category._id} category={category} />
                            ))}
                        </div>
                    </Spin>
                    <div className="flex justify-end py-8">
                        <Pagination
                            total={pagination.total}
                            showTotal={(total) => `Total ${total} items`}
                            current={pagination.current}
                            pageSize={pagination.pageSize}
                            onChange={handlePaginationChange}
                            showSizeChanger
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default NameCategory;
