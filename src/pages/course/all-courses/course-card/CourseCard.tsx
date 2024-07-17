import React from "react";
import { Card, Rate } from "antd";
import { Course } from "../../../../models/Course";
import defaultImage from "../../../../../public/l1.jpg";

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const imageUrl = course.image_url || defaultImage;

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
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
                                <p className="text-gray-600 mb-2 truncate max-h-12">{course.description}</p>
                                <div className="flex items-center mb-2">
                                    <span>{course.average_rating}</span>
                                    <Rate disabled allowHalf defaultValue={course.average_rating} className="ml-2" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Lessons: {course.lesson_count}</p>
                                <p className="text-sm text-gray-700 mb-1">Instructor: {course.user_name}</p>
                                <p className="text-sm text-gray-700 mb-1">Price: ${course.price}</p>
                            </div>
                        </div>
                    }
                />
            </Card>
        </div>
    );
};

export default CourseCard;
