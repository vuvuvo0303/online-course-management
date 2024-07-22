import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { Spin } from "antd";
import { Course } from "../../models";
import CourseCard from "./course-card/CourseCard";
import { API_CLIENT_GET_COURSE_DETAIL } from "../../consts";


const CourseDetails: React.FC = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
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
                    // setError('Course data is incomplete.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [_id]);

    if (loading) {
        return <div className="text-center"><Spin spinning={loading} /></div>;
    }

    if (!course) {
        return <div className="text-center">No course details found.</div>;
    }

    return (

        <div className="p-4">
            <Spin spinning={loading}>
                {course ? (
                    <CourseCard course={course} />
                ) : (
                    <p className="text-center">No course details found.</p>
                )}
            </Spin>
        </div>
    );
};

export default CourseDetails;
