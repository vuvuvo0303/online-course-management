import React, { useCallback, useEffect, useState } from "react";
import { Input, Skeleton, Pagination, Button } from "antd";
import axiosInstance from "../../../services/axiosInstance";
import { API_CLIENT_GET_COURSES } from "../../../consts";
import CourseCard from "./course-card/CourseCard";
import { Course } from "../../../models/Course";




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



    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(API_CLIENT_GET_COURSES, {
                searchCondition: {
                    role: "all",
                    status: true,
                    is_deleted: false,
                    keyword: searchText
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
    }, [searchText, pagination.current, pagination.pageSize]);

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
    const handleSearchText= (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
      };
    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-slate-700 p-6 md:p-10 rounded-md">
                <Input
                    placeholder="Search courses"
                    value={searchText}
                    onChange={handleSearchText}
                    className="w-full md:w-2/5 lg:w-3/4"
                />
                <Button
                    onClick={handleSearch}
                    className="bg-orange-500 text-white py-2 px-4 rounded-md w-full md:w-1/4"
                >
                    Search
                </Button>
            </div>
            <div className="flex flex-wrap gap-4 px-4 mt-10 md:px-8 lg:px-16">
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
            <div className="flex justify-center py-8">
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
