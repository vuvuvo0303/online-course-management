import React from 'react';
import { Rate, Tabs } from 'antd';
import './index.css';

const { TabPane } = Tabs;

const Course: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <div>
            <div className="course-container">
                <div className="course-card">
                    <div className="course-image">
                        {/* Replace with your actual image */}
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
                            {/* Utilize the Rate component here */}
                            <Rate allowHalf defaultValue={5} />
                            <span className="rating-count">(81,665 ratings)</span>
                        </div>
                        <div className="course-enrollment">
                            <p>114,521 students enrolled</p>
                        </div>
                        <div className="course-language">
                            <span className="language">English</span>
                            <span className="language">English, Dutch 12 more</span>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 0 8 13.438-7.534 0-12.438-3.248 8 1.314z" />
                        </svg>
                        Save
                    </button>
                    <button className="button report-abuse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-flag-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M14.778.085A1.171 1.171 0 0 1 16 .546V8a1.5 1.5 0 0 1-1.5 1.5H10.712v3.778a.5.5 0 0 1-.548.457h-5.688a.5.5 0 0 1-.548-.457V10H1.5a1.5 1.5 0 0 1-1.5-1.5V.546a1.171 1.171 0 0 1 .222-.461z" />
                        </svg>
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
                    <div className="course-stats" style={{ left: '1200px', bottom: '22px' }}>
                        <div className="stat">
                            <button className="stat-button mt-[3px] ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8z" />
                                </svg>
                                <span>1452</span>
                            </button>
                        </div>
                        <div className="stat">
                            <button className="stat-button ml-[3px] mt-[3px] ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                    <path d="M1 10.5a.5.5 0 0 1 .5-.5h12.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-12.5a.5.5 0 0 1-.5-.5v-1z" />
                                    <path d="M7.293 1.5a1 1 0 0 1 1.414 0l4.352 4.352a1 1 0 0 1 0 1.414l-4.352 4.352a1 1 0 0 1-1.414-1.414l4.352-4.352a.5.5 0 0 1 .707-.707l-6-6a.5.5 0 0 1 .707-.707L7.293 1.5z" />
                                </svg>
                                <span>100</span>
                            </button>
                        </div>
                        <div className="stat">
                            <button className="stat-button ml-[5px] mt-[3px] ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                                    <path d="M1 10.5a.5.5 0 0 1 .5-.5h12.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-12.5a.5.5 0 0 1-.5-.5v-1z" />
                                    <path d="M7.293 1.5a1 1 0 0 0-1.414 0l-4.352 4.352a1 1 0 0 0 0 1.414l4.352 4.352a1 1 0 0 0 1.414-1.414l-4.352-4.352a.5.5 0 0 0-.707.707l6 6a.5.5 0 0 0 .707.707L7.293 1.5z" />
                                </svg>
                                <span>20</span>
                            </button>
                        </div>
                        <div className="stat">
                            <button className="stat-button ml-[8px] mt-[2px] ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                                    <path d="M11 2.5a2.5 2.5 0 1 0 .603 1.628l-6.718 3.12a2.5 2.5 0 0 0 0 3.844l6.718 3.12a2.5 2.5 0 1 0 .603-1.628L13.454 7.66a2.5 2.5 0 0 0 0-3.844L11 2.5z" />
                                </svg>
                                <span>9</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={onChange} className="course-tabs" style={{ marginLeft: '600px' }}>
                <TabPane tab="About" key="1">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Course Content" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Reviews" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Course;