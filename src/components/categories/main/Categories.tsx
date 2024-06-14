import { useState, useCallback, useEffect } from 'react';
import { Card, Popover, Button, Rate } from 'antd';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { categoryFilters, categorySubmenu } from "../../../consts/index";
import { CheckOutlined } from '@ant-design/icons'; // Importing the icon
import './Categories.css';

const { Meta } = Card;

const Categories: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('IT & Software');
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 464);
    const [ratings, setRatings] = useState(Array(categorySubmenu.length).fill(3));

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

    const handleStartTeaching = useCallback(() => {
        window.location.href = "/teaching";
    }, []);

    const renderPopoverContent = useCallback((filter: string) => {
        const handleGoToCourse = () => {
            window.location.href = "/course";
        };

        return (
            <div className="popover-content">
                <Meta
                    title={filter}
                    description={
                        <div className="max-w-[350px] max-h-[400px] flex flex-col justify-between p-4 text-left">
                            <div>
                                <h3 className="text-green-600 text-[1rem] mb-2">The Complete Python Bootcamp From Zero to Hero in Python</h3>
                                <p className="text-black text-[0.8rem] mb-2">Updated at 7/2023</p>
                            </div>
                            <div>
                                <p className="text-black text-[1rem] mb-2">Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games</p>
                            </div>
                            <div>
                                <ul className="list-none">
                                    <li className="text-black text-[1rem] ml-[1rem]"><CheckOutlined className='mr-[0.5rem]' />You will learn how to leverage the power of Python to solve tasks.</li>
                                    <li className="text-black text-[1rem] ml-[1rem]"><CheckOutlined className='mr-[0.5rem]' />You will build games and programs that use Python libraries.</li>
                                    <li className="text-black text-[1rem] ml-[1rem]"><CheckOutlined className='mr-[0.5rem]' />You will be able to use Python for your own work problems or personal projects.</li>
                                </ul>
                            </div>
                        </div>
                    }
                />
                <Button type="primary" onClick={handleGoToCourse} style={{ marginTop: '10px' }}>
                    Go to Course
                </Button>
            </div>
        );
    }, []);

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
                    {categorySubmenu.map((filter, index) => (
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
