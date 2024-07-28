import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Tabs } from "antd";
import axiosInstance from "../../services/axiosInstance";
import { Course } from "../../models/Course";
import CourseCard from "./course-card/CourseCard";
import About from "./about/about";
import Content from "./content/content";
import ReviewPage from "./reviews/review";
import Instructor from "./instructor/info";
import { API_CLIENT_GET_COURSE_DETAIL } from "../../consts";

const CourseDetails: React.FC = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTabKey, setActiveTabKey] = useState<string>("1"); // State for active tab
    const { _id } = useParams<{ _id: string }>();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${_id}`);
                const courseData = response.data;

                if (courseData && courseData._id) {
                    setCourse(courseData);
                } else {
                    // Handle case where course data is incomplete or not found
                    // setError('Course data is incomplete.');
                }
            } catch (error) {
                // Handle fetch error
                // console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [_id]);

    const onChange = (key: string) => {
        setActiveTabKey(key); // Update active tab key
    };


    const tabItems = [
        { key: "1", label: "About", children: <About /> },
        { key: "2", label: "Course Content", children: course ? <Content course={course} /> : null },
        { key: "3", label: "Reviews", children: <ReviewPage /> },
        { key: "4", label: "Instructor", children: <Instructor /> }
    ];

    return (
        <div className="p-4">
            {/* Skeleton for CourseCard */}
            <Skeleton loading={loading} active>
                {!loading && course && <CourseCard course={course} />}
            </Skeleton>

            {/* Tabs only visible when not loading */}
            {!loading && course && (
                <div className="course-tabs">
                    <Tabs centered onChange={onChange} activeKey={activeTabKey} items={tabItems} />
                </div>
            )}

            <div className="course-content">
                {loading ? <Skeleton active /> : tabItems.find(item => item.key === activeTabKey)?.children}
            </div>
        </div>
    );
};

export default CourseDetails;
