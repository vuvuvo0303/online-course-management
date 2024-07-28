import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Collapse, Button, Drawer, Skeleton } from "antd";
import { VideoCameraOutlined, PlayCircleOutlined, FileWordOutlined, QuestionCircleOutlined, PictureOutlined } from "@ant-design/icons";
import axiosInstance from "../../../services/axiosInstance";
import { API_GET_LESSON, API_CLIENT_GET_COURSE_DETAIL } from "../../../consts";
import 'tailwindcss/tailwind.css';
import { Lessons, LessonType } from "../../../models/Lesson";
import { Course } from "../../../models/Course";

const { Panel } = Collapse;

const Lesson: React.FC = () => {
    const [lesson, setLesson] = useState<Lessons | null>(null);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { _id } = useParams<{ _id: string }>();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${_id}`);
                const courseData = response.data;

                if (courseData && courseData._id) {
                    setCourse(courseData);
                } else {
                    setError('Course data is incomplete.');
                }
            } catch (error) {
                // setError("Error fetching course details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [_id]);

    useEffect(() => {
        const fetchLesson = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${API_GET_LESSON}/${_id}`);
                const lessonData = response.data;

                if (lessonData && lessonData._id) {
                    setLesson(lessonData);
                } else {
                    setError('Lesson data is incomplete or not found.');
                }
            } catch (error) {
                // console.error('Error fetching lesson details:', error.response?.data || error.message);
                // setError(error.response?.data?.message || 'Failed to fetch lesson details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [_id]);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const headerStyle = { display: 'flex', alignItems: 'center' };
    const iconTextStyle = { marginLeft: '8px' };
    const contentStyle = { paddingLeft: '24px' };
    const itemStyle = { marginBottom: '8px' };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="w-full bg-white p-4 flex items-center fixed top-0 z-10 shadow-md">
                <Button type="default" onClick={() => window.history.back()} aria-label="Go back"> {'<'} </Button>
                <h1 className="text-[1.1rem] font-bold ml-[2rem]">{course?.name}</h1>
                <QuestionCircleOutlined className="ml-auto hidden md:block" />
                {isMobile && <Button type="primary" onClick={showDrawer} className='ml-3'>Course Content</Button>}
            </div>
            <div className='flex flex-1'>
                <div className={`p-6 bg-white overflow-auto ${isMobile ? 'w-full' : 'w-3/4'}`} style={{ height: 'calc(100vh - 112px)' }}>
                    <div className="text-center mb-4 w-full">
                        <Skeleton loading={loading} active>
                            {lesson && lesson.video_url && (
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        src={lesson.video_url}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={lesson.name}
                                        className="absolute top-0 left-0 w-full h-full"
                                    />
                                </div>
                            )}
                        </Skeleton>
                    </div>
                    <div>
                        <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
                            <h2 className="text-xl font-semibold mt-4">{lesson ? lesson.name : 'Loading...'}</h2>
                            <p>{lesson ? lesson.description : ''}</p>
                        </Skeleton>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                {!isMobile && (
                    <div className="w-1/4 p-5 bg-white overflow-auto" style={{ height: 'calc(100vh - 112px)' }}>
                        <Skeleton loading={loading} active>
                            {course && (
                                <div className="p-5 bg-white-transparent w-full h-full overflow-auto text-left">
                                    <h2 className="text-black mb-[1rem]">Lesson Content</h2>
                                    <Collapse accordion ghost>
                                        {course.session_list.map((session, index) => (
                                            <Panel
                                                header={
                                                    <div className='flex items-left' style={headerStyle}>
                                                        <VideoCameraOutlined />
                                                        <span style={iconTextStyle}>{session.name}</span>
                                                    </div>
                                                }
                                                key={index.toString()}
                                                showArrow={false}
                                            >
                                                <div style={contentStyle}>
                                                    {lesson && lesson && (
                                                        <div style={itemStyle} key={lesson._id}>
                                                            <div className="flex items-left">
                                                                {(() => {
                                                                    switch (lesson.lesson_type) {
                                                                        case LessonType.text:
                                                                            return <FileWordOutlined />;
                                                                        case LessonType.video:
                                                                            return <PlayCircleOutlined />;
                                                                        case LessonType.image:
                                                                            return <PictureOutlined />;
                                                                        default:
                                                                            return null;
                                                                    }
                                                                })()}
                                                                <p style={iconTextStyle}>{lesson.name}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </Panel>
                                        ))}
                                    </Collapse>
                                </div>
                            )}
                        </Skeleton>
                    </div>
                )}
                {isMobile && (
                    <Drawer title="Course Content" placement="right" onClose={onClose} open={open}>
                        <Skeleton loading={loading} active>
                            {course && course.session_list.map((session, sessionIndex) => (
                                <div key={sessionIndex}>
                                    <h3 className="text-black mb-[1rem]">{session.name}</h3>
                                    {session.lesson_list.map((lessonItem, lessonIndex) => (
                                        <div key={lessonIndex} className="flex items-center mb-2">
                                            <PlayCircleOutlined />
                                            <p className="ml-2">{lessonItem.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Skeleton>
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

export default Lesson;
