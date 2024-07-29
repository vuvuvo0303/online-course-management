// AllCourses.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Input, Skeleton, Pagination, Select, Button } from "antd";
import axiosInstance from "../../../services/axiosInstance";
import { API_CLIENT_GET_COURSES } from "../../../consts";
import CourseCard from "./course-card/CourseCard";
import { Course } from "../../../models/Course";
import CategoriesDropdown from "./dropdown/CategoriesDropdown";
import RatingOption from "./dropdown/RatingOption"; // Import the RatingOption component

const { Option } = Select;

const AllCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>(undefined);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(API_CLIENT_GET_COURSES, {
                searchCondition: {
                    role: "all",
                    status: true,
                    is_deleted: false,
                    keyword: searchText,
                    category: category,
                    rating: rating,
                    price: price,
                },
                pageInfo: {
                    pageNum: pagination.current,
                    pageSize: pagination.pageSize,
                },
            });

            if (response.data) {
                setCourses(response.data.pageData || []);
                setPagination((prev) => ({
                    ...prev,
                    total: response.data.pageInfo?.totalItems || response.data.length,
                    current: response.data.pageInfo?.pageNum || 1,
                    pageSize: response.data.pageInfo?.pageSize || prev.pageSize,
                }));
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
    }, [searchText, category, rating, price, pagination.current, pagination.pageSize]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleSearch = () => {
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
        fetchCourses();
    };

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize: pageSize || prev.pageSize,
        }));
        fetchCourses();
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-slate-700 p-10 rounded-md">
                <Input
                    placeholder="Search courses"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full md:w-2/6"
                />
                <CategoriesDropdown onSelect={(value) => setCategory(value)} />
                <Select
                    placeholder="Rating"
                    className="w-full md:w-1/6"
                    onChange={(value) => setRating(value)}
                >
                    <Option value={2}>
                        <RatingOption value={2} label="3.5 Stars" />
                    </Option>
                    <Option value={3}>
                        <RatingOption value={3} label="4 Stars" />
                    </Option>
                    <Option value={4}>
                        <RatingOption value={4} label="4.5 Stars" />
                    </Option>
                    <Option value={5}>
                        <RatingOption value={5} label="5 Stars" />
                    </Option>
                </Select>
                <Select
                    placeholder="Price"
                    className="w-full md:w-1/6"
                    onChange={(value) => setPrice(value)}
                >
                    <Option value="low">Up to 100,000</Option>
                    <Option value="medium">100,000 - 1,000,000</Option>
                    <Option value="high">1,000,000+</Option>
                </Select>
                <Button
                    onClick={handleSearch}
                    className="bg-orange-500 text-white py-2 px-4 rounded-md w-full md:w-1/6"
                >
                    Search
                </Button>
            </div>
            <div className="flex flex-wrap -m-2 px-[10rem] mt-10">
                {loading && initialLoad ? (
                    Array.from({ length: pagination.pageSize }).map((_, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2">
                            <Skeleton active />
                        </div>
                    ))
                ) : (
                    courses.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))
                )}
            </div>
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
        </div>
    );
};

export default AllCourses;
