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
    return (
        <div className='p-8 bg-white rounded-md'>
            <h2 className='text-black mb-4'>Course Content</h2>
            <Collapse accordion ghost>
                {course.session_list.map((session) => (
                    <Panel
                        header={
                            <div className="flex justify-between items-center p-3 bg-gray-200">
                                <div className='flex items-center'>
                                    <VideoCameraOutlined />
                                    <span className="ml-4">{session.name}</span>
                                </div>
                                <div>
                                    <span>{formatTime(session.full_time)}</span>
                                </div>
                            </div>
                        }
                        key={session.name} // Assuming each session has a unique id
                        showArrow={false}
                    >
                        <div className="p-3 bg-white text-black">
                            {session.lesson_list.map((lesson) => (
                                <div className="flex justify-between items-center py-2" key={lesson.name}> {/* Assuming each lesson has a unique id */}
                                    <div className="flex items-center">
                                        <PlayCircleOutlined />
                                        <p className="ml-4">{lesson.name}</p>
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
