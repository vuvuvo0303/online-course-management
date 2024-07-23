// content.tsx
import { Collapse } from 'antd';
import { VideoCameraOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Course } from '../../../models/Course'; // Import the Course type

const { Panel } = Collapse;

interface ContentProps {
    course: Course; // Use the Course type from your models
}

const formatTime = (minutes: number): string => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
};

const Content: React.FC<ContentProps> = ({ course }) => {
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
        <div className='p-8 bg-white rounded-md'>
            <h2 className='text-black mb-4'>Course Content</h2>
            <Collapse accordion ghost>
                {course.session_list.map((session, sessionIndex) => (
                    <Panel
                        header={
                            <div style={headerStyle} key={sessionIndex}>
                                <div className='flex items-center'>
                                    <VideoCameraOutlined />
                                    <span style={iconTextStyle}>{session.name}</span>
                                </div>
                                <div>
                                    <span>{formatTime(session.full_time)}</span>
                                </div>
                            </div>
                        }
                        key={sessionIndex}
                        showArrow={false}
                    >
                        <div style={contentStyle}>
                            {session.lesson_list.map((lesson, lessonIndex) => (
                                <div style={itemStyle} key={lessonIndex}>
                                    <div className="flex items-center">
                                        <PlayCircleOutlined />
                                        <p style={iconTextStyle}>{lesson.name}</p>
                                    </div>
                                    <span>{formatTime(lesson.full_time)}</span>
                                </div>
                            ))}
                        </div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default Content;
