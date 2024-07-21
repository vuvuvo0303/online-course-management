import { useEffect, useState } from 'react';
import { Card, Popover, Button, Rate } from 'antd';
import Carousel from "react-multi-carousel";
import { Link } from 'react-router-dom';
import { paths } from "../../../consts/index";
import { HeartOutlined } from '@ant-design/icons';
import { fetchCoursesByClient, addCourseToCart } from '../../../services';
import { Course } from '../../../models';
import { format } from 'date-fns';


const { Meta } = Card;

const AllCourses: React.FC = () => {
    const [ratings, setRatings] = useState<number[]>([3, 4, 5]);
    const [courses, setCourses] = useState<Course[]>([]);

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
        const res = await fetchCoursesByClient("", "");
        setCourses(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchCourse();
    }, [])

    if (loading) {
        return <p className='text-center'>Loading ...</p>
    }

    const renderPopoverContent = (course: Course) => {
        // add course and go to cart
        const handleGoToCourse = async () => {
            await addCourseToCart(course._id);
        }
        const lastUpdated = format(new Date(course.updated_at), "dd/MM/yyyy");
        return (
            <div className="popover-content w-full">
                <Meta
                    title={course.name}
                    description={
                        <div className="max-w-[350px] max-h-[410px] flex flex-col justify-between p-4 text-left">
                            <div>
                                <p className="text-black text-[1rem] mb-2">Last Updated: {lastUpdated}</p>
                            </div>
                            <div>
                                <p className="text-black text-[1rem] mb-2 truncate">Description: {course.description}</p>
                            </div>
                            <div>
                                <p className="text-black text-[1rem] mb-2 truncate">Price: {course.price} vnđ</p>
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
                        Add to cart
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
                        <div key={course._id} className=" w-full">
                            <Popover
                                content={renderPopoverContent(course)}
                                title="Course Info"
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
                                        {course.price} vnđ
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
