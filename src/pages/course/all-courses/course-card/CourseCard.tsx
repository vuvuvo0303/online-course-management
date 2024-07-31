import React from "react";
import { Rate, Button } from "antd";
import { Link } from 'react-router-dom';
import { Course } from "../../../../models/Course";
import { HeartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import defaultImage from "../../../../../public/l1.jpg";
import { formatCurrency } from "../../../../utils";

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const imageUrl = course.image_url || defaultImage;

    return (
        <div className="w-full flex p-2 h-[15rem]">
            <div className="flex flex-col md:flex-row w-full items-center bg-white shadow-md rounded-lg overflow-hidden">
                <img alt={course.name} src={imageUrl} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
                <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">{course.name}</h2>
                        <p className="text-gray-600 mb-2 truncate">{course.description}</p>
                        <div className="flex items-center mb-2">
                            <Rate disabled allowHalf defaultValue={course.average_rating} />
                            <span className="ml-2 text-gray-600">{course.average_rating}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-700">Lessons: {course.lesson_count}</p>
                            <p className="text-sm text-gray-700">Instructor: {course.instructor_name}</p>
                            <p className="text-sm text-gray-700">Price: {formatCurrency(course.price)}</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <Link to={`/course/all-courses/course/${course._id}`}>
                                <Button type="primary" className="w-32 h-10"><ArrowRightOutlined />Go to course</Button>
                            </Link>
                            <Button href="/enrollment" className="w-32 h-10">
                                <HeartOutlined className="mr-2" />
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
