import { useState, useEffect } from 'react';
import { fetchCoursesByClient } from '../../../services'; // Ensure the import is correct
import { Course } from "../../../models";
import { Spin, Alert, Rate, Button } from 'antd'; // Import Ant Design components
import { Link } from 'react-router-dom'; // Import Link for routing
import { ArrowRightOutlined } from '@ant-design/icons'; // Import Ant Design icons


const MyList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch purchased courses
    const fetchPurchasedCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchCoursesByClient("", ""); // Adjust parameters if needed
            const purchasedCourses = res.filter((course: Course) => course.is_purchased); // Type the course parameter
            setCourses(purchasedCourses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            setError('Failed to load courses. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchasedCourses();
    }, []);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJy_JSAysO8hrX0Qab6AAqOnQ3LwOGojayow&s'; // Fallback image
    };

    return (
        <div className="p-6 bg-white-transparent min-h-screen">
            <div className="max-w-screen-lg mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Courses Purchased</h1>
                </div>
                <div className='gap-5'>
                    {loading ? (
                        <div className="flex justify-center items-center col-span-full min-h-[200px]">
                            <Spin />
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center col-span-full min-h-[200px]">
                            <Alert message={error} type="error" showIcon />
                        </div>
                    ) : courses.length ? (
                        courses.map((course: Course) => (
                            <div key={course._id} className="flex flex-row shadow-lg rounded-lg overflow-hidden bg-gray-800 mb-5">
                                <div className="w-1/3">
                                    <img
                                        alt={course.name}
                                        src={course.image_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJy_JSAysO8hrX0Qab6AAqOnQ3LwOGojayow&s'}
                                        onError={handleImageError}
                                        className="w-full h-[12rem] object-cover"
                                    />
                                </div>
                                <div className="w-2/3 p-4 flex flex-col justify-between">
                                    <div>
                                        <Link to={`/course/${course._id}/lesson`} className="text-xl font-semibold">
                                            {course.name}
                                        </Link>
                                        <p className="text-gray-400 mb-2 truncate">{course.description}</p>
                                        <div className="flex items-center mb-2">
                                            <Rate disabled allowHalf defaultValue={course.average_rating} />
                                            <span className="ml-2 text-gray-400">{course.average_rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-400">Lessons: {course.lesson_count}</p>
                                            <p className="text-sm text-gray-400">Instructor: {course.instructor_name}</p>
                                        </div>
                                        <Link to={`/course/${course._id}/lesson`}>
                                            <Button type="primary" className="w-32 h-10"><ArrowRightOutlined /> Learn Now </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center">No courses found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyList;
