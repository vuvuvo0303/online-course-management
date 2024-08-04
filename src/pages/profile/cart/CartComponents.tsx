import { useState, useEffect } from 'react';
import { fetchCoursesByClient } from '../../../services'; // Ensure the import is correct
import { Course } from "../../../models";
import { Spin, Alert, Card, Rate } from 'antd'; // Import Ant Design components
import { Link } from 'react-router-dom'; // Import Link for routing

const { Meta } = Card;

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {loading ? (
                        <div className="flex justify-center items-center col-span-full min-h-[200px]">
                            <Spin /> {/* Ant Design loading spinner */}
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center col-span-full min-h-[200px]">
                            <Alert message={error} type="error" showIcon />
                        </div>
                    ) : courses.length ? (
                        courses.map((course: Course) => (
                            <Card
                                key={course._id} // Ensure each card has a unique key
                                className="w-64 mx-auto shadow-lg rounded-lg overflow-hidden"
                                cover={
                                    <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden">
                                        <Link to={`/course/${course._id}`}>
                                            <img
                                                alt="course"
                                                src={course.image_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJy_JSAysO8hrX0Qab6AAqOnQ3LwOGojayow&s'} // Fallback image
                                                className="w-full h-full object-cover"
                                                onError={handleImageError}
                                            />
                                        </Link>
                                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">Best Seller</div>
                                    </div>
                                }
                            >
                                <Meta
                                    title={<Link to={`/course/${course._id}`} className="hover:underline">{course.name}</Link>}
                                    description={course.instructor_name}
                                />
                                <div className="mt-2">
                                    <div className="flex items-center text-sm">
                                        <span className="mr-1">{course.average_rating}</span>
                                        <Rate
                                            value={course.average_rating}
                                            disabled
                                        />
                                        <span className="ml-1 text-gray-500">({course.review_count})</span>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p className="col-span-full text-center">No courses found.</p> // Handle empty state
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyList;
