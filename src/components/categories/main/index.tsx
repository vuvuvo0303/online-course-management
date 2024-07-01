import React, { useState, useCallback, useEffect } from 'react';
import { Card, Popover, Button, Rate } from 'antd';
import Carousel from "react-multi-carousel";
import { Link } from 'react-router-dom';
import { categoryFilters, categoryCourse, paths } from "../../../consts/index";
import { CheckOutlined, HeartOutlined } from '@ant-design/icons';
import { HashLink } from 'react-router-hash-link';
import './Categories.css';

const { Meta } = Card;

const Categories: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Web Development');
    const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 464);
    const [ratings, setRatings] = useState<number[]>(Array.from({ length: categoryCourse[selectedCategory].length }, () => 3));

    const handleResize = useCallback(() => {
        setIsDesktop(window.innerWidth > 464);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const price = "$99.99"; // Example price, you can modify it as needed

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
        setRatings(Array.from({ length: categoryCourse[filter].length }, () => 3));
    };

    const handleExploreClick = () => {
        if (selectedCategory) {
            window.location.href = `/courses/${encodeURIComponent(selectedCategory)}`;
        }
    };

    const handleStartTeaching = useCallback(() => {
        window.location.href = paths.TEACHING;
    }, []);

    const renderPopoverContent = (course: string) => {
        const handleGoToCourse = () => {
            window.location.href = paths.STUDENT_CART;
        };

        return (
            <div className="popover-content">
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
        <div className="categories-container">
            <div className="categories-content">
                <div className="category-filters-container">
                    {categoryFilters.map((filter) => (
                        <Button
                            key={filter}
                            className="category-filter-button"
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
                <h1 className="categories-header">{selectedCategory}</h1>
                <Button
                    type="primary"
                    className="categories-button"
                    onClick={handleExploreClick}
                    disabled={!selectedCategory}
                >
                    Explore Course
                </Button>
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
                    {categoryCourse[selectedCategory].map((course, index) => (
                        <div key={course} className="category-card">
                            <Popover
                                content={renderPopoverContent(course)}
                                title="Category Info"
                                trigger="hover"
                                placement="right"
                                overlayStyle={{ textAlign: 'center' }}
                            >
                                <Card
                                    style={{ margin: '10px' }}
                                    cover={
                                        <div className="avatar-container">
                                            <HashLink smooth to={`${paths.COURSE}#top`}>
                                                <img
                                                    alt="example"
                                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                    style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                                                />
                                            </HashLink>
                                            <div className="best-seller-label text-yellow-200 text-base">Best Seller</div>
                                        </div>
                                    }
                                >
                                    <Meta
                                        className="card-meta"
                                        title={<HashLink smooth to={`${paths.COURSE}#top`}>{course}</HashLink>}
                                        description="This is the description"
                                    />
                                    <div className="rating-container card-meta">
                                        <span className="rating-number">{ratings[index]}</span>
                                        <Rate value={ratings[index]} onChange={(value) => handleRatingChange(index, value)} />
                                    </div>
                                    <div className="card-meta price" style={{ marginTop: '10px' }}>
                                        {price}
                                    </div>
                                </Card>
                            </Popover>
                        </div>
                    ))}
                </Carousel>
            </div>
            {isDesktop && (
                <div className="content-frame">
                    <h2>Become an Instructor</h2>
                    <img
                        src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-teachers-day-cartoon-female-teacher-teacher-png-image_370554.jpg"
                        alt="Instructor"
                        className="instructor-image"
                    />
                    <p>Top instructors from around the world teach millions of students on Cursus. We provide the tools and skills to teach what you love.</p>
                    <Button type="primary" onClick={handleStartTeaching} style={{ backgroundColor: 'gray', marginTop: '50px' }}>
                        Start Teaching
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Categories;
