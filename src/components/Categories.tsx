import React, { useState } from 'react';
import { Card, Popover, Button, Rate } from 'antd';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { categoryFilters, categorySubmenu } from "../consts/index";
import './Categories.css';

const { Meta } = Card;

const Categories: React.FC = () => {
    const [rating, setRating] = useState(3);
    const [selectedCategory, setSelectedCategory] = useState('IT & Software');
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

    const handleStartTeaching = () => {
        window.location.href = "http://localhost:5174/instructor";
    };

    const renderPopoverContent = (filter: string) => {
        const handleGoToCourse = () => {
            window.location.href = "http://localhost:5174/course";
        };

        return (
            <div>
                <Meta
                    title={filter}
                    description="This is the description"
                />
                <Button type="primary" onClick={handleGoToCourse} style={{ marginTop: '10px' }}>
                    Go to Course
                </Button>
            </div>
        );
    };

    return (
        <div className="categories-container">
            <div className="categories-content">
                <div className="category-filters-container">
                    {categoryFilters.map((filter) => (
                        <Button
                            key={filter}
                            className="category-filter-button"
                            onClick={() => setSelectedCategory(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
                <h1 className="categories-header">{selectedCategory}</h1>
                <Button
                    type="primary"
                    className="categories-button"
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
                    {categorySubmenu.map((filter) => (
                        <div key={filter} className="category-card">
                            <Popover
                                content={renderPopoverContent(filter)}
                                title="Category Info"
                                trigger="hover"
                                placement="right"
                                overlayStyle={{ textAlign: 'center' }}
                            >
                                <Card
                                    style={{ margin: '10px' }}
                                    cover={
                                        <div className="avatar-container">
                                            <img
                                                alt="example"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                                            />
                                            <div className="best-seller-label text-yellow-200 text-base">Best Seller</div>
                                        </div>
                                    }
                                >
                                    <Meta
                                        className="card-meta"
                                        title={filter}
                                        description="This is the description"
                                    />
                                    <div className="rating-container card-meta">
                                        <span className="rating-number">{rating}</span>
                                        <Rate value={rating} onChange={setRating} />
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
        </div>
    );
};

export default Categories;
