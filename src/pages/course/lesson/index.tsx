import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Collapse, Button, Drawer, Spin, Skeleton } from "antd";
import { VideoCameraOutlined, PlayCircleOutlined, FileWordOutlined, PictureOutlined } from "@ant-design/icons";
import axiosInstance from "../../../services/axiosInstance";
import { API_GET_LESSON, API_CLIENT_GET_COURSE_DETAIL } from "../../../consts";
import 'tailwindcss/tailwind.css';
import { Lessons, LessonType } from "../../../models/Lesson";
import { Course } from "../../../models/Course";

const { Panel } = Collapse;

const Lesson: React.FC = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true); // Track the first load
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [selectedLesson, setSelectedLesson] = useState<Lessons | null>(null);
    const [activeKey, setActiveKey] = useState<string | string[]>([]);
    const { _id } = useParams<{ _id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${_id}`);
                setCourse(response.data);
            } catch (error) {
                setError('Failed to load course details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [_id]);

    const fetchLesson = async (lessonId: string) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`${API_GET_LESSON}/${lessonId}`);
            setSelectedLesson(response.data);
        } catch (error) {
            setError('Failed to load lesson details.');
        } finally {
            setLoading(false);
            setFirstLoad(false); // Set to false after the first load
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    const handleLessonClick = (lessonItem: Lessons) => {
        fetchLesson(lessonItem._id);
    };

    // Make sure `Lessons` is the correct type for `lessonItem`
    const renderLessonContent = (lessonItem: Lessons) => (
        <div key={lessonItem._id} className="flex items-center mb-2 cursor-pointer border p-2 rounded border-gray-300" onClick={() => handleLessonClick(lessonItem)}>
            {(() => {
                switch (lessonItem.lesson_type) {
                    case LessonType.video:
                        return <PlayCircleOutlined />;
                    case LessonType.text:
                        return <FileWordOutlined />;
                    case LessonType.image:
                        return <PictureOutlined />;
                    default:
                        return null;
                }
            })()}
            <p className="ml-2">{lessonItem.name}</p>
        </div>
    );

    const handlePanelChange = (key: string | string[]) => {
        setActiveKey(key);
    };

    const renderSelectedLesson = () => {
        if (!selectedLesson) return null;

        switch (selectedLesson.lesson_type) {
            case LessonType.video:
                return (
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            src={selectedLesson.video_url}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={selectedLesson.name}
                            className="absolute top-0 left-0 w-full h-full"
                        />
                    </div>
                );
            case LessonType.text:
                return <div></div>;
            case LessonType.image:
                return <img src={selectedLesson.image_url} alt={selectedLesson.name} className="w-full h-auto" />;
            default:
                return <p>Lesson type not supported</p>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="w-full bg-white p-4 flex items-center fixed top-0 z-10 shadow-md">
                <Button type="default" onClick={() => navigate(-1)}>
                    {'<'}
                </Button>
                <h1 className="text-[1.1rem] font-bold ml-[2rem]">{course?.name}</h1>
                {isMobile && <Button type="primary" onClick={showDrawer} className="left-[160px]">Course Content</Button>}
            </div>
            <div className="flex flex-1">
                <div className={`p-6 bg-white overflow-auto ${isMobile ? 'w-full' : 'w-3/4'}`} style={{ height: 'calc(100vh - 112px)' }}>
                    {loading ? (
                        firstLoad ? (
                            <Skeleton loading={loading} active>
                                {renderSelectedLesson()}
                            </Skeleton>
                        ) : (
                            <Spin spinning={loading}>
                                {renderSelectedLesson()}
                            </Spin>
                        )
                    ) : (
                        <>
                            {renderSelectedLesson()}
                            <h2 className="text-xl font-semibold">{selectedLesson?.name || 'Select a lesson to view the details'}</h2>
                            <p>{selectedLesson?.description}</p>
                            {error && <p className="text-red-500">{error}</p>}
                        </>
                    )}
                </div>
                {!isMobile && (
                    <div className="w-1/4 p-5 bg-white overflow-auto border-l border-gray-300" style={{ height: 'calc(100vh - 112px)' }}>
                        <Spin spinning={loading}>
                            {course && (
                                <>
                                    <h1 className="text-xl font-semibold mb-4">Course Content</h1>
                                    <Collapse accordion ghost activeKey={activeKey} onChange={handlePanelChange}>
                                        {course.session_list.map((session, index) => (
                                            <Panel
                                                header={
                                                    <div className="flex items-center border-b border-gray-300 pb-2 mb-2">
                                                        <VideoCameraOutlined />
                                                        <span className="ml-2">{session.name}</span>
                                                    </div>
                                                }
                                                key={index.toString()}
                                            >
                                                {session.lesson_list.map(renderLessonContent)}
                                            </Panel>
                                        ))}
                                    </Collapse>
                                </>
                            )}
                        </Spin>
                    </div>

                )}
                {isMobile && (
                    <Drawer title="Course Content" placement="right" onClose={onClose} open={open}>
                        <Spin spinning={loading}>
                            {course && course.session_list.map((session, sessionIndex) => (
                                <div key={sessionIndex} className="mb-4">
                                    <h3 className="text-black mb-2 border-b border-gray-300 pb-2">{session.name}</h3>
                                    {session.lesson_list.map(renderLessonContent)}
                                </div>
                            ))}
                        </Spin>
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
