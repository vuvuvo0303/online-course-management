import React, { useEffect, useState } from "react";
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
    const [activeTabKey, setActiveTabKey] = useState<string>("1");
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
                    // console.error('Course data is incomplete or not found.');
                }
            } catch (error) {
                // console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [_id]);

    const tabItems = [
        { key: "1", label: "About", children: course ? <About courseId={course._id} /> : <Skeleton active /> },
        { key: "2", label: "Course Content", children: course ? <Content course={course} /> : <Skeleton active /> },
        { key: "3", label: "Reviews", children: <ReviewPage /> },
        { key: "4", label: "Instructor", children: <Instructor /> }
    ];

    return (
        <div className="p-4">
            <Skeleton loading={loading} active>
                {!loading && course && <CourseCard course={course} />}
            </Skeleton>

            {!loading && course && (
                <Tabs
                    centered
                    activeKey={activeTabKey}
                    onChange={setActiveTabKey}
                    items={tabItems}
                />
            )}
        </div>
    );
};

export default CourseDetails;
