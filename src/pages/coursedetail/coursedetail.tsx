import React from 'react';
import { Collapse, Button } from 'antd';
import { VideoCameraOutlined, PlayCircleOutlined, FileWordOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const { Panel } = Collapse;

const CourseDetail: React.FC = () => {
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const headerStyle = {
        backgroundColor: 'lightgray',
        color: 'black',
        padding: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0',
        color: 'lightgray',
    };

    const contentStyle = {
        backgroundColor: 'white',
        padding: '10px',
        color: '#000',
    };

    const iconTextStyle = {
        marginLeft: '1rem',
        flex: 1,
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="w-full bg-[#faf7f7] p-4 flex  items-center fixed top-0 z-10 shadow-md">
                <Link to='/course'>
                    <Button type="default"> {'<'} </Button>
                </Link>
                <h1 className="text-2xl font-bold ml-[2rem]">Node & ExpressJS</h1>
                <QuestionCircleOutlined className="ml-[75rem]" />
            </div>
            <div className="flex flex-1 mt-16">
                <div className="w-3/4 p-6 bg-white overflow-auto" style={{ height: 'calc(100vh - 112px)' }}>
                    <div className="text-center mb-4">
                        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                            <iframe
                                src="https://www.youtube.com/embed/ZmU6BxxvzeU"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Node & ExpressJS"
                                className="absolute top-0 left-0 w-full h-full"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mt-4">About</h2>
                        <p>This section can contain the description of the course or video content.</p>
                    </div>
                </div>
                <div className="p-5 bg-white w-[24rem] fixed right-0 top-16 bottom-16 overflow-auto">
                    <h2 className="text-black mb-[1rem]">Course content</h2>
                    <Collapse accordion ghost onChange={onChange}>
                        <Panel
                            header={
                                <div className='flex items-left' style={headerStyle}>
                                    <VideoCameraOutlined />
                                    <span style={iconTextStyle}>Introduction to this Course</span>
                                </div>
                            }
                            key="1"
                            showArrow={false}
                        >
                            <div style={contentStyle}>
                                <div style={itemStyle}>
                                    <div className="flex items-left">
                                        <PlayCircleOutlined />
                                        <p style={iconTextStyle}>Unit Objectives</p>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                        <Panel
                            header={
                                <div className='flex items-left' style={headerStyle}>
                                    <VideoCameraOutlined />
                                    <span style={iconTextStyle}>Introduction to Front End Development</span>
                                </div>
                            }
                            key="2"
                            showArrow={false}
                        >
                            <div style={contentStyle}>
                                <div style={itemStyle}>
                                    <div className="flex items-left">
                                        <PlayCircleOutlined />
                                        <p style={iconTextStyle}>Unit Objectives</p>
                                    </div>
                                </div>
                                <div style={itemStyle}>
                                    <div className="flex items-left">
                                        <FileWordOutlined className='mt-[1.1rem]' />
                                        <p style={{ ...iconTextStyle, marginTop: '1rem' }}>Note about Introduction to the Web</p>
                                    </div>
                                </div>
                                <div style={itemStyle}>
                                    <div className="flex items-left">
                                        <PlayCircleOutlined className='mt-[1.1rem]' />
                                        <p style={{ ...iconTextStyle, marginTop: '1rem' }}>Introduction to the Web</p>
                                    </div>
                                </div>
                                <div style={itemStyle}>
                                    <div className="flex items-left">
                                        <PlayCircleOutlined className='mt-[1.1rem]' />
                                        <p style={{ ...iconTextStyle, marginTop: '1rem' }}>The Front End Holy Trinity</p>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                        <Panel
                            header={
                                <div className='flex items-left' style={headerStyle}>
                                    <VideoCameraOutlined />
                                    <span style={iconTextStyle}>Introduction to HTML</span>
                                </div>
                            }
                            key="3"
                            showArrow={false}
                        >
                            <div style={contentStyle}>
                                <div style={itemStyle}>
                                    <div className="flex items-left">
                                        <PlayCircleOutlined />
                                        <p style={iconTextStyle}>Unit Objectives</p>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                        <Panel
                            header={
                                <div className='flex items-left' style={headerStyle}>
                                    <VideoCameraOutlined />
                                    <span style={iconTextStyle}>Intermediate HTML</span>
                                </div>
                            }
                            key="4"
                            showArrow={false}
                        >
                            <div style={contentStyle}>
                                <div style={itemStyle}>
                                    <div className="flex items-left">
                                        <PlayCircleOutlined />
                                        <p style={iconTextStyle}>Unit Objectives</p>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <div className="w-full bg-white p-4 flex justify-between items-center fixed bottom-0 z-10 shadow-md">
                <Button type="default">Previous Lesson</Button>
                <Button type="default">Next Lesson</Button>
            </div>
        </div>
    );
};

export default CourseDetail;
