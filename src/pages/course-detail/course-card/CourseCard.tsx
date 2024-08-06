import React, { useState } from 'react';
import { message, Rate } from 'antd';
import {  useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { addCourseToCart } from '../../../services/cart';
import { paths } from "../../../consts";
import { formatCurrency, formatMinute } from "../../../utils";
import { Course } from "../../../models";
import './card.module.css';

interface CourseCardProps {
    course: Course;
    detailedView?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        if (!user) {
            navigate(paths.LOGIN);
            message.info('Please login before adding items to your cart.');
        } else {
            setLoading(true);
            try {
                await addCourseToCart(course._id);
                navigate(paths.STUDENT_CART);
            } catch (error) {
                // Handle error appropriately
            } finally {
                setLoading(false);
            }
        }
    };

    const handleStudyNowClick = () => {
        if (!user) {
            navigate(paths.LOGIN);
            message.info('Please login to start studying.');
        } else {
            navigate(`/course/${course._id}/lesson`);
        }
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop if fallback also fails
        target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJy_JSAysO8hrX0Qab6AAqOnQ3LwOGojayow&s'; // Fallback image
    };

    const handSaveCourseToLocalStorage = (courseId: string) => {
        // Retrieve the current list from localStorage, or create an empty array if none exists
        const courseInWishList = JSON.parse(localStorage.getItem("courseInWishList") || "[]");
        // Check if the courseId already exists in the list
        if (!courseInWishList.includes(courseId)) {
            // If not, add the courseId to the list
            courseInWishList.push(courseId);
            // Save the updated list back to localStorage
            localStorage.setItem("courseInWishList", JSON.stringify(courseInWishList));
        }
    };
    
    
    

    return (
        <div className="flex flex-col lg:flex-row w-full bg-gray-100 shadow-lg rounded-lg p-5 space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-shrink-0 rounded-lg overflow-hidden">
                <img
                    alt={course.name}
                    src={course.image_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJy_JSAysO8hrX0Qab6AAqOnQ3LwOGojayow&s'}
                    className="w-[25rem] h-[15rem] object-cover rounded-lg"
                    onError={handleImageError}
                />
            </div>
            <div className="flex flex-col text-white flex-grow">
                <h2 className="text-xl lg:text-2xl font-bold">{course.name}</h2>
                <p className="pt-2 pb-2 truncate">
                    {course.description.replace(/^<p>/, '').replace(/<\/p>$/, '').split(' ').slice(0, 10).join(' ')}...
                </p>
                <div className="space-y-2 flex-grow">
                    {course.review_count > 0 && (
                        <div className="flex items-center mb-2">
                            <div className="mt-1">
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={course.average_rating}
                                    className="custom-rate"
                                />
                            </div>
                            <span className="text-base ml-2">
                                {course.review_count === 1
                                    ? `(${course.review_count} review)`
                                    : `(${course.review_count} reviews)`}
                            </span>
                        </div>
                    )}
                    <div><strong>Category:</strong> {course.category_name}</div>
                    <div><strong>Instructor:</strong> {course.instructor_name}</div>
                    <div>
                        <strong>Last update:</strong> {new Date(course.updated_at).toLocaleDateString('en-GB')}
                    </div>
                    {!course.is_purchased && course.price_paid !== 0 && (
                        <>
                            <div className="flex flex-row gap-4 items-center">
                                <div className="text-xl lg:text-3xl">{formatCurrency(course.price_paid)}</div>
                                {course.discount > 0 && (
                                    <div className="text-sm lg:text-xl">
                                        <span className="line-through">{formatCurrency(course.price)}</span>
                                    </div>
                                )}
                            </div>
                            {course.discount > 0 && (
                                <div className="text-xs">{course.discount}% off</div>
                            )}
                        </>
                    )}
                    <div className="flex gap-4 mt-auto">
                        {course.is_purchased || course.price_paid === 0 ? (
                            <div>
                                <button
                                    onClick={handleStudyNowClick}
                                    className="bg-yellow-500 text-gray-800 p-2 rounded-md w-[6rem] hover:bg-yellow-400 text-black-100"
                                >
                                    Study now
                                </button>
                            </div>
                        ) : (
                            <div className='flex flex-row items-center gap-2'>
                                <button onClick={handleAddToCart} className="bg-yellow-500 text-gray-800 p-2 rounded-md hover:bg-yellow-400" disabled={loading}>
                                    <ShoppingCartOutlined className="mr-2" />
                                    {loading ? 'Adding...' : 'Add to Cart'}
                                </button>
                                <button onClick={()=>handSaveCourseToLocalStorage(course._id)} className="bg-yellow-500 text-gray-800 w-[6rem] p-2 rounded-md hover:bg-yellow-400">
                                        Save
                                    </button>
                            </div>
                        )}
                    </div>
                    <div className="text-xs mt-2">30-Day Money-Back Guarantee</div>
                </div>
            </div>
            <div className="flex flex-col justify-between text-white">
                <div className="flex flex-col flex-grow">
                    {/* Other content here */}
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    <ClockCircleOutlined />
                    <span>Full time: {formatMinute(course.full_time)}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
