import { useState, useEffect } from 'react';
import { Collapse, Button, Drawer } from 'antd';
import { VideoCameraOutlined, PlayCircleOutlined, FileWordOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const { Panel } = Collapse;

const CourseDetail: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const headerStyle = {
        backgroundColor: '#f7f9fa',
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
            <div className="w-full bg-white p-4 flex items-center fixed top-0 z-10 shadow-md">
                <Link to='/course'>
                    <Button type="default"> {'<'} </Button>
                </Link>
                <h1 className="text-[1.1rem] font-bold ml-[2rem]">Node & ExpressJS</h1>
                <QuestionCircleOutlined className="ml-auto" />
                {isMobile && <Button type="primary" onClick={showDrawer}>Course Content</Button>}
            </div>
            <div className={`flex flex-1 ${isMobile ? 'flex-col mt-16' : 'mt-16'}`}>
                <div className={`p-6 bg-white overflow-auto ${isMobile ? 'w-full mt-[4rem]' : 'w-3/4'}`} style={{ height: 'calc(100vh - 112px)' }}>
                    <div className="text-center mb-4 w-full">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
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
                {!isMobile && (
                    <div className="w-1/4 p-5 bg-white overflow-auto" style={{ height: 'calc(100vh - 112px)' }}>
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
                                        <span style={iconTextStyle}>Introduction to FE Development</span>
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
                )}
                {isMobile && (
                    <Drawer title="Course Content" placement="right" onClose={onClose} open={open}>
                        <div className="p-5 bg-white-transparent w-full h-full overflow-auto text-left">
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
                                            <span style={iconTextStyle}>Introduction to FE Development</span>
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
                    </Drawer>
                )}
            </div>

            <div className="w-full bg-white p-4 flex justify-between items-center fixed bottom-0 z-10 shadow-md">
                <Button type="default">Previous Lesson</Button>
                <Button type="default">Next Lesson</Button>
            </div>
        </div>
    );
};

export default CourseDetail;
