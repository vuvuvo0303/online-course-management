import { useEffect, useState } from 'react';
import { Card, Popover, Button, Rate } from 'antd';
import Carousel from "react-multi-carousel";
import { Link } from 'react-router-dom';
import { paths } from "../../../consts/index";
import { CheckOutlined, HeartOutlined } from '@ant-design/icons';
import { fetchCoursesByClient } from '../../../services/client';
import { Course } from '../../../models';

const { Meta } = Card;

const AllCourses: React.FC = () => {
    const [ratings, setRatings] = useState<number[]>([3, 4, 5]);
    const [courses, setCourses] = useState<Course[]>([]);
    const price = "$99.99"; // Example price, you can modify it as needed

    const [loading, setLoading] = useState<boolean>(false);
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    // fetch course to display for student or client
    const fetchCourse = async () => {
        setLoading(true)
        const res = await fetchCoursesByClient();
        setCourses(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchCourse();
    }, [])

    if (loading) {
        return <p className='text-center'>Loading ...</p>
    }

    const renderPopoverContent = (course: string) => {
        const handleGoToCourse = () => {
            window.location.href = paths.STUDENT_CART;
        };

        return (
            <div className="popover-content w-full">
                <Meta
                    title={course}
                    description={
                        <div className="max-w-[350px] max-h-[410px] flex flex-col justify-between p-4 text-left">
                            <div>
                                <h3 className="text-green-600 text-[1rem] mb-2">Course Title</h3>
                                <p className="text-black text-[0.8rem] mb-2">Updated at 7/2023</p>
                            </div>
                            <div>
                                <p className="text-black text-[1rem] mb-2">Course description goes here.</p>
                            </div>
                            <div>
                                <ul className="list-none">
                                    <li className="text-black text-[1rem] ml-[1rem]"><CheckOutlined className='mr-[0.5rem]' />Feature 1</li>
                                    <li className="text-black text-[1rem] ml-[1rem]"><CheckOutlined className='mr-[0.5rem]' />Feature 2</li>
                                    <li className="text-black text-[1rem] ml-[1rem]"><CheckOutlined className='mr-[0.5rem]' />Feature 3</li>
                                </ul>
                            </div>
                        </div>
                    }
                />
                <div className="flex items-center ml-[4rem]">
                    <Button
                        type="default"
                        onClick={handleGoToCourse}
                        style={{
                            backgroundColor: '#A020F0',
                            borderColor: '#A020F0',
                            color: '#fff',
                            fontWeight: 'bold',
                            padding: '4px 60px', // Adjust padding as needed
                            lineHeight: 'normal', // Reset line height if necessary
                        }}
                    >
                        Go to cart
                    </Button>
                    <Link to={paths.STUDENT_ENROLLMENT} className="ml-4 mt-[0.4rem]">
                        <HeartOutlined className="text-black text-2xl" />
                    </Link>
                </div>
            </div>
        );
    };

    const handleRatingChange = (index: number, value: number) => {
        const newRatings = [...ratings];
        newRatings[index] = value;
        setRatings(newRatings);
    };

    return (
        <div className="w-full">
            <div className="w-full text-left">
                <Link to={`/course/all-courses`}>
                    <h2 className="text-2xl font-bold mb-2 p-2">All Courses</h2>
                </Link>

                <Carousel
                    responsive={responsive}
                    itemClass="carousel-item-padding-10px"
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    arrows={true}
                    centerMode={false}
                    infinite={true}
                    className="categories-carousel"
                >
                    {courses.map((course, index) => (
                        <div key={course._id} className="category-card w-full">
                            <Popover
                                content={renderPopoverContent(course.name)}
                                title="Category Info"
                                trigger="hover"
                                placement="right"
                                overlayStyle={{ textAlign: 'center' }}
                            >
                                <Card
                                    className="max-w-[300px] mx-auto"
                                    cover={
                                        <div className="avatar-container">
                                            <Link to={`${paths.COURSE}`}>
                                                <img
                                                    alt="example"
                                                    src={course.image_url}
                                                    className="w-full max-h-32"
                                                    
                                                />
                                            </Link>
                                            <div className="best-seller-label text-yellow-200 text-base">Best Seller</div>
                                        </div>
                                    }
                                >
                                    <Meta
                                        className="card-meta truncate"
                                        title={<Link to={`${paths.COURSE}`}>{course.name}</Link>}
                                        description={course.description}
                                    />
                                    <div className="rating-container card-meta">
                                        <span className="rating-number">{ratings[course.average_rating]}</span>
                                        <Rate value={ratings[course.average_rating]} onChange={(value) => handleRatingChange(index, value)} />
                                    </div>
                                    <div className="card-meta price mt-2">
                                        {course.price}
                                    </div>
                                </Card>
                            </Popover>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default AllCourses;
