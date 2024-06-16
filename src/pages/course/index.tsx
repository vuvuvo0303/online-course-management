import { useState } from 'react';
import { Rate, Tabs } from 'antd';
import { HeartOutlined, FlagOutlined, EyeOutlined, LikeOutlined, DislikeOutlined, ShareAltOutlined, CopyrightOutlined, MessageOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import About from './about/about'; // Import the About component
import Content from './content/content';
import ReviewPage from './reviews/review';
import { Link } from 'react-router-dom';
import './index.css';
import Instructor from './instructor/info';

const { TabPane } = Tabs;

const Course: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const onChange = (key: string) => {
        setActiveTabKey(key);
    };

    return (
        <div>
            <div className="course-container">
                <div className="course-card">
                    <div className="course-image">
                        <img src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp" alt="Course Image" />
                    </div>
                    <div className="course-info">
                        <div className="course-title">
                            <h2>The Web Developer Bootcamp</h2>
                            <span className="bestseller">BESTSELLER</span>
                        </div>
                        <div className="course-description">
                            <p>The only course you need to learn web development - HTML, CSS, JS, Node, and More!</p>
                        </div>
                        <div className="course-rating">
                            <Rate allowHalf defaultValue={5} />
                            <span className="rating-count ml-[1rem]">(81,665 ratings)</span>
                        </div>
                        <div className="course-enrollment">
                            <p>114,521 students enrolled</p>
                        </div>
                        <div className="course-language">
                            <MessageOutlined />
                            <span className="language ml-[0.5rem] pr-[2rem]">English</span>
                            <CopyrightOutlined />
                            <span className="language ml-[0.5rem]">English, Dutch 12 more</span>
                        </div>
                        <div className="course-update">
                            <p>Last updated 1/2024</p>
                        </div>
                        <div className="course-buttons">
                            <Link to="/cart">
                                <button className="button add-to-cart">
                                    <ShoppingCartOutlined className='mr-[0.5rem]' /> Add to Cart
                                </button>
                            </Link>
                            <Link to="/checkout">
                                <button className="button buy-now">Buy Now</button>
                            </Link>
                            <Link to="/course/id">
                                <button className="button buy-now">Go to course</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="course-actions mb-[0.1rem]">
                    <a href="/enrollment" className="button save flex items-center">
                        <HeartOutlined className="mr-2" />
                        Save
                    </a>
                    <button className="button report-abuse">
                        <FlagOutlined />
                        Report abuse
                    </button>
                    <div className='info-instructor'>
                        <div className="course-stats ml-[70rem] mb-[0.1rem]">
                            <div className="stat">
                                <button className="stat-button ml-[-0.2rem] mt-[0.1rem]">
                                    <EyeOutlined className='mr-[0.2rem]' />
                                    <span>1452</span>
                                </button>
                            </div>
                            <div className="stat">
                                <button className="stat-button ml-[0.1rem] mt-[0.1rem]">
                                    <LikeOutlined className='mr-[0.3rem]' />
                                    <span>100</span>
                                </button>
                            </div>
                            <div className="stat">
                                <button className="stat-button ml-[0.1rem] mt-[0.1rem]">
                                    <DislikeOutlined className='mr-[0.3rem]' />
                                    <span>20</span>
                                </button>
                            </div>
                            <div className="stat">
                                <button className="stat-button ml-[0.1rem] mt-[0.1rem]">
                                    <ShareAltOutlined className='mr-[0.3rem]' />
                                    <span>9</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="course-tabs">
                <Tabs defaultActiveKey="1" centered onChange={onChange}>
                    <TabPane tab="About" key="1" />
                    <TabPane tab="Course Content" key="2" />
                    <TabPane tab="Reviews" key="3" />
                    <TabPane tab="Instructor" key="4" />
                </Tabs>
            </div>
            <div className="course-content">
                {activeTabKey === '1' && <About />}
                {activeTabKey === '2' && <Content />}
                {activeTabKey === '3' && <ReviewPage />}
                {activeTabKey === '4' && <Instructor />}
            </div>
        </div>
    );
};

export default Course;
