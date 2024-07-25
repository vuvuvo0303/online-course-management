import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Skeleton, Rate } from 'antd';
import Carousel from "react-multi-carousel";
import axiosInstance from "../../../services/axiosInstance";
import { API_CLIENT_GET_CATEGORIES } from "../../../consts";
import { Link } from 'react-router-dom';
import { fetchCoursesByClient } from '../../../services';
import { Course } from '../../../models';
import './Categories.css';
import { paths } from '../../../consts';
import { Category } from 'models/Category'; // Ensure this import is correct

const { Meta } = Card;

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(API_CLIENT_GET_CATEGORIES, {
                searchCondition: {
                    status: true,
                    is_deleted: false,
                },
                pageInfo: {
                    pageNum: pagination.current,
                    pageSize: pagination.pageSize,
                },
            });

            if (response.data) {
                setCategories(response.data.pageData || []);
                setPagination(prev => ({
                    ...prev,
                    total: response.data.pageInfo?.totalItems || response.data.length,
                    current: response.data.pageInfo?.pageNum || 1,
                    pageSize: response.data.pageInfo?.pageSize || prev.pageSize,
                }));
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Fetch courses to display
    const fetchCourse = async () => {
        setLoading(true);
        try {
            const res = await fetchCoursesByClient("", "");
            setCourses(res);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
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

    const handleFilterClick = (filter: string) => {
        setSelectedCategory(filter);
    };

    return (
        <div className="categories-container">
            <div className="categories-content">
                <div className="category-filters-container">
                    {categories.map((category) => (
                        <Button
                            key={category._id}
                            className="category-filter-button"
                            onClick={() => handleFilterClick(category.name)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
                <h1 className="categories-header">{selectedCategory}</h1>
                <Link to={`/courses/${selectedCategory}`}>
                    <Button
                        type="default"
                        className="categories-button lg:mr-[60rem]"
                        disabled={!selectedCategory}
                    >
                        Explore Category
                    </Button>
                </Link>

                {loading ? (
                    <Skeleton active />
                ) : (
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
                        {courses.map((course) => (
                            <div key={course._id} className="flex justify-center">
                                <Card
                                    className="w-[20rem] mx-auto shadow-lg rounded-lg overflow-hidden"
                                    style={{ margin: '10px' }}
                                    cover={
                                        <div className="h-48 bg-white flex items-center justify-center overflow-hidden">
                                            <Link to={`/course/all-courses/course/${course._id}`}>
                                                <img
                                                    alt="course"
                                                    src={course.image_url}
                                                    className="object-cover w-full h-full p-2"
                                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJy_JSAysO8hrX0Qab6AAqOnQ3LwOGojayow&s';
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    }
                                >
                                    <Meta
                                        className="truncate"
                                        title={
                                            <Link to={`/course/all-courses/course/${course._id}`} className="hover:underline">
                                                {course.name}
                                            </Link>
                                        }
                                        description={course.instructor_name}
                                    />
                                    <div className="mt-2">
                                        <div className="flexCenter items-center text-sm">
                                            <span className="mr-2">{course.average_rating}</span>
                                            <Rate value={course.average_rating} disabled />
                                            <span className="ml-2 text-gray-500">({course.review_count})</span>
                                        </div>
                                        <div className="flexCenter items-baseline mt-2">
                                            <div className="text-2xl text-gray-500 font-bold">₫{course.price_paid}</div>
                                            <div className="text-xl text-gray-500 ml-2 line-through">₫{course.price}</div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
            <div className="content-frame">
                <h2>Become an Instructor</h2>
                <img
                    src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-teachers-day-cartoon-female-teacher-teacher-png-image_370554.jpg"
                    alt="Instructor"
                    className="instructor-image"
                />
                <p>Top instructors from around the world teach millions of students on FLearn. We provide the tools and skills to teach what you love.</p>
                <Link to={paths.TEACHING}>
                    <Button type="primary" style={{ backgroundColor: 'gray', marginTop: '50px' }}>
                        Start Teaching
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Categories;
