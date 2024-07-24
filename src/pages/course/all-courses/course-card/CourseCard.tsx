import React from "react";
import { Card, Rate } from "antd";
import { Link } from 'react-router-dom';
import { Course } from "../../../../models/Course";
import defaultImage from "../../../../../public/l1.jpg";

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const imageUrl = course.image_url || defaultImage;

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <Link to={`/course/all-courses/course/${course._id}`}>
                <Card
                    hoverable
                    cover={<img alt={course.name} src={imageUrl} className="w-full h-48 object-cover" />}
                    className="rounded-lg shadow-lg h-full flex flex-col p-2"
                >
                    <Card.Meta
                        title={<h2 className="text-xl font-semibold">{course.name}</h2>}
                        description={
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <p className="text-gray-600 mb-2 truncate">{course.description}</p>
                                    <div className="flex items-center mb-2">
                                        <Rate disabled allowHalf defaultValue={course.average_rating} />
                                        <span className="ml-2 text-gray-600">{course.average_rating}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700 mb-1">Lessons: {course.lesson_count}</p>
                                    <p className="text-sm text-gray-700 mb-1">Instructor: {course.instructor_name}</p>
                                    <p className="text-sm text-gray-700 mb-1">Price: ${course.price.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</p>
                                </div>
                            </div>
                        }
                    />
                </Card>
            </Link>
        </div>
    );
};

export default CourseCard;
