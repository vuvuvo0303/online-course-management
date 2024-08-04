import React from "react";
import { Rate, Button } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { Course } from "../../../../models";
import { HeartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import defaultImage from "../../../../../public/l1.jpg";
import { getUserFromLocalStorage } from "../../../../services/auth";
import { formatCurrency } from "../../../../utils/formatHelper";
import { paths } from "../../../../consts";
import { addCourseToCart } from "../../../../services/cart";
interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const navigate = useNavigate();
    const imageUrl = course.image_url || defaultImage;
    const user = getUserFromLocalStorage();
    const userRole = user.role;

    const handleGoToCourse = async (course: Course) => {
        if (user.role != "instructor" && user.role != "student") {
            navigate(paths.LOGIN);
        } else {
            try {
                if (user.role === "instructor") {
                    if (course.is_purchased === false && course.is_in_cart === false) {
                        await addCourseToCart(course._id);
                        navigate(paths.INSTRUCTOR_CART)
                    } else if (course.is_in_cart === true && course.is_purchased === false) {
                        navigate(paths.INSTRUCTOR_CART);
                    } else if (course.is_in_cart === true && course.is_purchased === true) {
                        navigate(`${paths.INSTRUCTOR_STUDY_COURSE}/${course._id}`);
                    }
                } else if (user.role === "student") {
                    if (course.is_purchased === false && course.is_in_cart === false) {
                        await addCourseToCart(course._id);
                        navigate(paths.STUDENT_CART)
                    } else if (course.is_in_cart === true && course.is_purchased === false) {
                        navigate(paths.STUDENT_CART);
                    } else if (course.is_in_cart === true && course.is_purchased === true) {
                        navigate(`${paths.STUDENT_STUDY_COURSE}/${course._id}`);
                    }
                }
            } catch (error) {
                console.error("Failed to handle course action:", error);
            }
        }
    };

    return (
        <div className="w-full flex p-2 h-[15rem]">
            <div className="flex flex-col md:flex-row w-full items-center bg-white shadow-md rounded-lg overflow-hidden">
                <img alt={course.name} src={imageUrl} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
                <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                    <div>
                        <Link to={`/course/${course._id}`}>
                            <h2 className="text-xl font-semibold">{course.name}</h2>
                        </Link>
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
                            {userRole === "instructor" ?
                                <Button onClick={() => handleGoToCourse(course)} type="primary" className="w-32 h-10"><ArrowRightOutlined />
                                
                                    {course.is_purchased === false && course.is_in_cart === false && "Add to cart"}
                                    {course.is_in_cart === true && course.is_purchased === false && "Go to cart"}
                                    {course.is_purchased === true && course.is_in_cart === true && "Learn now"}
                                </Button> :
                                <Link to={`/course/${course._id}`}>
                                    <Button type="primary" className="w-32 h-10"><ArrowRightOutlined />Go to course</Button>
                                </Link>
                            }
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
