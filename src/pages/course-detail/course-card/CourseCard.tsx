import React from "react";
import { Typography } from "antd";
import { Course } from "../../../models/Course"; // Ensure the Course model is imported

const { Title, Paragraph } = Typography;

interface CourseCardProps {
    course: Course;
    detailedView?: boolean; // New prop to indicate detailed view
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="flex flex-row w-full p-2 bg-white-transparent shadow-md">
            <img
                alt={course.name}
                src={course.image_url}
                className="w-[15rem] h-[10rem]"
            />
            <div className="pl-4 flex flex-col">
                <Title level={4} className="text-lg">{course.name}</Title>
                <Paragraph><strong>Price:</strong> ${course.price}</Paragraph>
                <Paragraph><strong>Discount:</strong> ${course.discount}</Paragraph>
                <Paragraph><strong>Category:</strong> {course.category_name}</Paragraph>
                {/* <Paragraph><strong>Instructor:</strong> {course.instructor_name}</Paragraph> */}
                <Paragraph><strong>Rating:</strong> {course.average_rating}</Paragraph>
                <Paragraph><strong>Updated At:</strong> {new Date(course.updated_at).toLocaleDateString()}</Paragraph>
            </div>
        </div>
    );
};

export default CourseCard;
