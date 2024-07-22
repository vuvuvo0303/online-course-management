import { useCallback, useEffect, useState } from "react";
import { Input, Spin, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axiosInstance from "../../../services/axiosInstance";
import { API_CLIENT_GET_COURSES } from "../../../consts";
import CourseCard from "./course-card/CourseCard";
import { Course } from "../../../models/Course"; // Import Course model here

const AllCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]); // Use Course[] for type safety
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState(false);
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
                    keyword: searchText,
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
            pageSize: pageSize || prev.pageSize, // Use previous pageSize if pageSize is undefined
        }));
        fetchCourses();
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <Input.Search
                    placeholder="Search by Name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
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
                            {courses.map((course) => (
                                <CourseCard key={course._id} course={course} />
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

export default AllCourses;
