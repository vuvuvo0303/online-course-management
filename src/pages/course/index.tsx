import { useState } from 'react';
import { Rate, Tabs } from 'antd';
import { HeartOutlined, FlagOutlined, EyeOutlined, LikeOutlined, DislikeOutlined, ShareAltOutlined, CopyrightOutlined, MessageOutlined } from '@ant-design/icons';
import About from '../course/AboutCourse/about'; // Import the About component
import './index.css';

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
                            <span className="rating-count">(81,665 ratings)</span>
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
                            <button className="button add-to-cart">Add to Cart</button>
                            <button className="button buy-now">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="course-actions">
                    <button className="button save">
                        <HeartOutlined />
                        Save
                    </button>
                    <button className="button report-abuse">
                        <FlagOutlined />
                        Report abuse
                    </button>
                </div>
                <div className='info-instructor'>
                    <div className="instructor">
                        <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png" alt="Instructor" />
                        <div className="instructor-info">
                            <h3>Johnson Smith</h3>
                            <button className="button subscribe">Subscribe</button>
                        </div>
                    </div>
                    <div className="course-stats ml-[76rem] mb-[5rem]">
                        <div className="stat">
                            <button className="stat-button ml-[-0.1rem] mt-[0.1rem]">
                                <EyeOutlined />
                                <span>1452</span>
                            </button>
                        </div>
                        <div className="stat">
                            <button className="stat-button ml-[0.2rem] mt-[0.1rem]">
                                <LikeOutlined />
                                <span>100</span>
                            </button>
                        </div>
                        <div className="stat">
                            <button className="stat-button ml-[0.5rem] mt-[0.1rem]">
                                <DislikeOutlined />
                                <span>20</span>
                            </button>
                        </div>
                        <div className="stat">
                            <button className="stat-button ml-[0.6rem] mt-[0.1rem]">
                                <ShareAltOutlined />
                                <span>9</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="course-tabs ml-[40rem]">
                <Tabs defaultActiveKey="1" onChange={onChange}>
                    <TabPane tab="About" key="1" />
                    <TabPane tab="Course Content" key="2" />
                    <TabPane tab="Reviews" key="3" />
                </Tabs>
            </div>
            <div className="course-content">
                {activeTabKey === '1' && <About />}
                {activeTabKey === '2' && <div>Content of Tab Pane 2</div>}
                {activeTabKey === '3' && <div>Content of Tab Pane 3</div>}
            </div>
        </div>
    );
};

export default Course;
