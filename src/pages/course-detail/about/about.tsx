import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import axiosInstance from '../../../services/axiosInstance'; // Adjust the path if needed
import { Course } from '../../../models/Course'; // Import the Course type
import { API_CLIENT_GET_COURSE_DETAIL } from "../../../consts";
import parse from 'html-react-parser';

interface AboutProps {
    courseId: string; // Add courseId to fetch data
}

const About: React.FC<AboutProps> = ({ courseId }) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${courseId}`);
                setCourse(response.data);
            } catch (err) {
                // setError('Error fetching course details');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (loading) {
        return <Skeleton active />;
    }
    if (!course) {
        return <p>No course data available</p>;
    }

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <p className="text-gray-700">{parse(course.content)}</p>
        </div>
    );
};

export default About;
