import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Collapse, Button, Drawer, Spin, Skeleton, theme } from "antd";
import { PlayCircleOutlined, FileWordOutlined, PictureOutlined, CaretRightOutlined } from "@ant-design/icons";
import axiosInstance from "../../../services/axiosInstance";
import { API_GET_LESSON, API_CLIENT_GET_COURSE_DETAIL } from "../../../consts";
import 'tailwindcss/tailwind.css';
import { Lessons, LessonType } from "../../../models/Lesson";
import { Course } from "../../../models/Course";

const { Panel } = Collapse;

const Lesson: React.FC = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [selectedLesson, setSelectedLesson] = useState<Lessons | null>(null);
    const [activeKey, setActiveKey] = useState<string | string[]>([]);
    const [currentSessionIndex, setCurrentSessionIndex] = useState<number>(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
    const { _id, lesson_id } = useParams<{ _id: string, lesson_id?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`${API_CLIENT_GET_COURSE_DETAIL}/${_id}`);
                setCourse(response.data);

                if (lesson_id) {
                    fetchLesson(lesson_id);
                } else if (response.data.session_list.length > 0 && response.data.session_list[0].lesson_list.length > 0) {
                    const firstLesson = response.data.session_list[0].lesson_list[0];
                    setCurrentSessionIndex(0);
                    setCurrentLessonIndex(0);
                    fetchLesson(firstLesson._id);
                }
            } catch (error) {
                setError('Failed to load course details.');
            } finally {
                setLoading(false);
                setFirstLoad(false);
            }
        };
        fetchCourseDetails();
    }, [_id, lesson_id]);

    const fetchLesson = async (lessonId: string) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`${API_GET_LESSON}/${lessonId}`);
            setSelectedLesson(response.data);
            console.log("fetchLesson: ", response);
        } catch (error) {
            setError('Failed to load lesson details.');
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

    const handleLessonClick = async (lessonItem: Lessons) => {
        await fetchLesson(lessonItem._id);
        navigate(`/course/${course?._id}/lesson/${lessonItem._id}`);
    };

    const handlePanelChange = (key: string | string[]) => {
        setActiveKey(key);
    };

    const findLesson = (sessionIndex: number, lessonIndex: number) => {
        if (course && course.session_list[sessionIndex]) {
            const lesson = course.session_list[sessionIndex].lesson_list[lessonIndex];
            if (lesson) {
                fetchLesson(lesson._id);
                setCurrentLessonIndex(lessonIndex);
                return;
            }
        }
        setSelectedLesson(null);
    };

    const handleNextLesson = () => {
        if (course) {
            let newSessionIndex = currentSessionIndex;
            let newLessonIndex = currentLessonIndex + 1;

            if (newLessonIndex >= course.session_list[newSessionIndex].lesson_list.length) {
                newLessonIndex = 0;
                newSessionIndex += 1;
                if (newSessionIndex >= course.session_list.length) {
                    newSessionIndex = 0; // Hoặc xử lý khi không còn session tiếp theo
                }
            }

            setCurrentSessionIndex(newSessionIndex);
            setCurrentLessonIndex(newLessonIndex);
            findLesson(newSessionIndex, newLessonIndex);
        }
    };

    const handlePreviousLesson = () => {
        if (course) {
            let newSessionIndex = currentSessionIndex;
            let newLessonIndex = currentLessonIndex - 1;

            if (newLessonIndex < 0) {
                newSessionIndex -= 1;
                if (newSessionIndex < 0) {
                    newSessionIndex = course.session_list.length - 1; // Hoặc xử lý khi không còn session trước đó
                }
                newLessonIndex = course.session_list[newSessionIndex].lesson_list.length - 1;
            }

            setCurrentSessionIndex(newSessionIndex);
            setCurrentLessonIndex(newLessonIndex);
            findLesson(newSessionIndex, newLessonIndex);
        }
    };

    const renderLessonContent = (lessonItem: Lessons) => (
        <div key={lessonItem._id} className="flex items-center mb-2 cursor-pointer p-2 rounded" onClick={() => handleLessonClick(lessonItem)}>
            {(() => {
                switch (lessonItem.lesson_type) {
                    case LessonType.video:
                        return <PlayCircleOutlined className="ml-2" />;
                    case LessonType.text:
                        return <FileWordOutlined className="ml-2" />;
                    case LessonType.image:
                        return <PictureOutlined className="ml-2" />;
                    default:
                        return null;
                }
            })()}
            <p className="ml-2">{lessonItem.name}</p>
        </div>
    );

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
                return <div>{selectedLesson.description}</div>;
            case LessonType.image:
                return <img src={selectedLesson.image_url} alt={selectedLesson.name} className="w-full h-auto" />;
            default:
                return <p>Lesson type not supported</p>;
        }
    };

    const { token } = theme.useToken();
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
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
            <div className="flex flex-1 mt-[72px]"> {/* Add margin-top to account for header height */}
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
                            {/* <h2 className="text-xl font-semibold">{selectedLesson?.name || 'Select a lesson to view the details'}</h2> */}
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
                                    <Collapse
                                        accordion
                                        ghost
                                        activeKey={activeKey}
                                        onChange={handlePanelChange}
                                        bordered={false}
                                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                        style={{ background: token.colorBgContainer }}
                                    >
                                        {course.session_list.map((session, sessionIndex) => (
                                            <Panel header={session.name} key={sessionIndex} style={panelStyle}>
                                                {session.lesson_list.map(lesson => renderLessonContent(lesson))}
                                            </Panel>
                                        ))}
                                    </Collapse>
                                </>
                            )}
                        </Spin>
                    </div>
                )}
            </div>
            <div className="flex justify-between p-4 bg-white shadow-md fixed bottom-0 left-0 right-0">
                <Button onClick={handlePreviousLesson} disabled={loading}>
                    Previous Lesson
                </Button>
                <Button onClick={handleNextLesson} type="primary" disabled={loading}>
                    Next Lesson
                </Button>
            </div>
            <Drawer
                title="Course Content"
                placement="right"
                onClose={onClose}
                open={open}
                width={isMobile ? '100%' : '50%'}
            >

                {course && (
                    <Collapse
                        accordion
                        ghost
                        activeKey={activeKey}
                        onChange={handlePanelChange}
                        bordered={false}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    >
                        {course.session_list.map((session, sessionIndex) => (
                            <Panel header={session.name} key={sessionIndex} style={panelStyle}>
                                {session.lesson_list.map(lesson => renderLessonContent(lesson))}
                            </Panel>
                        ))}
                    </Collapse>
                )}
            </Drawer>
        </div>
    );
};

export default Lesson;
