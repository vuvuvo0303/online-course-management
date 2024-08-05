import { useState } from "react";
import { Collapse, theme } from 'antd';
import {
    VideoCameraOutlined,
    PlayCircleOutlined,
    FileWordOutlined,
    PictureOutlined,
    CaretRightOutlined
} from '@ant-design/icons';
import { Course } from '../../../models/Course';
import { LessonType } from '../../../models/Lesson';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;

interface ContentProps {
    course: Course;
}

const Content: React.FC<ContentProps> = ({ course }) => {
    const [activeKey, setActiveKey] = useState<string | string[]>([]);
    const navigate = useNavigate(); // Initialize the navigate function
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const renderLessonContent = (lessonItem) => (
        <div
            key={lessonItem._id}
            className={`flex items-center mb-2 p-2 rounded cursor-pointer ${!course.is_purchased ? 'bg-gray-200' : ''}`}
            style={{ opacity: !course.is_purchased ? 0.5 : 1 }}
            onClick={() => course.is_purchased && handleLessonClick(lessonItem._id)}
        >
            {(() => {
                switch (lessonItem.lesson_type) {
                    case LessonType.video:
                        return <PlayCircleOutlined className="ml-4" />;
                    case LessonType.text:
                        return <FileWordOutlined className="ml-4" />;
                    case LessonType.image:
                        return <PictureOutlined className="ml-4" />;
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

    const handleLessonClick = (lesson_id: string) => {
        // Navigate to the course page
        // console.log("lesson_id:", lesson_id)
        navigate(`/course/${course._id}/lesson/${lesson_id}`);
    };

    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    return (
        <div className='p-8 bg-white rounded-md'>
            <h2 className='text-black mb-4'>Course Contents</h2>
            <Collapse
                accordion
                ghost
                activeKey={activeKey}
                onChange={handlePanelChange}
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{ background: token.colorBgContainer }}
            >
                {course.session_list.length > 0 ? (
                    course.session_list.map((session) => (
                        <Panel
                            header={
                                <div className="flex items-center pb-2 mb-2">
                                    <VideoCameraOutlined />
                                    <span className="ml-2">{session.name}</span>
                                </div>
                            }
                            key={session._id}
                            style={panelStyle}
                        >
                            {session.lesson_list.length > 0 ? (
                                session.lesson_list.map(lesson => renderLessonContent(lesson))
                            ) : (
                                <p>No lessons available</p>
                            )}
                        </Panel>
                    ))
                ) : (
                    <p>No sessions available</p>
                )}
            </Collapse>
        </div>
    );
};

export default Content;
