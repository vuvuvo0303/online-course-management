import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {  Button, Input, message, Modal, Select, Table, TableProps, Tag, } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Course, Session } from "../../../../../models/index.ts";
import axiosInstance from "../../../../../services/axiosInstance.ts";
import { useDebounce } from "../../../../../hooks";
import { API_GET_LESSONS, API_GET_COURSES, API_DELETE_LESSON, API_GET_SESSIONS, getColorLessonType } from "../../../../../consts";
import { format } from "date-fns";
import { Lessons } from "models/Lesson.ts";
import LoadingComponent from "../../../../../components/loading";
import CustomBreadcrumb from "../../../../../components/breadcrumb/index.tsx";
const LectureOfCourse: React.FC = () => {
    const [data, setData] = useState<Lessons[]>([]);
    const { courseId, sessionId } = useParams<{ courseId: string, sessionId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [selectedLectureId, setSelectedLectureId] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const [session_id, setSession_id] = useState<string>('');
    const [lessonType, setLessonTpe] = useState<string>('');
    const [sessions, setSessions] = useState<Session[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [course_id, setCourse_id] = useState<string>('');

    const debouncedSearchTerm = useDebounce(keyword, 300);

    const showModal = (lectureId: string, name: string) => {
        setModalText(`Do you want to delete this lecture with name is "${name}"`)
        setSelectedLectureId(lectureId)
        setOpen(true);
    };

    const handleOk = async () => {
        if (selectedLectureId) {
            setModalText('Deleting...');
            setConfirmLoading(true);
            try {
                await handleDelete(selectedLectureId);
            } catch (error) {
                setModalText("Error occurred: " + error);
                message.success("Delete Lecture Failed!");
            } finally {
                setTimeout(() => {
                    setOpen(false);
                    setConfirmLoading(false);
                }, 300);
            }
        } else {
            setOpen(false);
        }
    };

    const handleDelete = async (lectureId: string) => {
        await axiosInstance.delete(`${API_DELETE_LESSON}/${lectureId}`);
        setData(data.filter(lecture => lecture._id !== lectureId));
        message.success("Delete Lecture Successfully!")
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const fetchSession = async () => {
        try {
            const response = await axiosInstance.post(API_GET_SESSIONS, {
                "searchCondition": {
                    "keyword": "",
                    "course_id": course_id,
                    "session_id": "",
                    "lesson_type": "",
                    "is_position_order": false,
                    "is_deleted": false
                },
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 100
                }
            })
            if (response) {
                setSessions(response.data.pageData);
            }
        } catch (error) {
            //
        }
    }

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.post(API_GET_COURSES, {
                "searchCondition": {
                    "keyword": "",
                    "category": "",
                    "status": "",
                    "is_deleted": false
                },
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 100
                }
            })
            if (response) {
                setCourses(response.data.pageData);
            }
        } catch (error) {
            //
        }
    }
    useEffect(() => {
        fetchCourses();
        fetchSession();
    }, [course_id])

    //fetch lecture
    useEffect(() => {
        if (courseId && sessionId) {
            const fetchLecture = async () => {
                try {
                    const response = await axiosInstance.post(API_GET_LESSONS,
                        {
                            "searchCondition": {
                                "keyword": debouncedSearchTerm,
                                "course_id": courseId,
                                "session_id": sessionId,
                                "lesson_type": lessonType,
                                "is_position_order": false,
                                "is_deleted": false
                            },
                            "pageInfo": {
                                "pageNum": 1,
                                "pageSize": 100
                            }
                        }
                    );
                    if (response) {
                        setData(response.data.pageData)
                    }
                } catch (error) {
                    //
                } finally {
                    setLoading(false);
                }
            };
            fetchLecture();
        } else {
            //Manage all lecture
            const fetchLecture = async () => {
                try {
                    const response = await axiosInstance.post(API_GET_LESSONS, {
                        "searchCondition": {
                            "keyword": debouncedSearchTerm,
                            "course_id": course_id,
                            "session_id": session_id,
                            "lesson_type": lessonType,
                            "is_position_order": false,
                            "is_deleted": false
                        },
                        "pageInfo": {
                            "pageNum": 1,
                            "pageSize": 100
                        }
                    },);
                    if (response) {
                        setData(response.data.pageData);
                    }
                } catch (error) {
                    //
                } finally {
                    setLoading(false);
                }
            };
            fetchLecture();
        }
    }, [courseId, sessionId, keyword, session_id, course_id, debouncedSearchTerm, lessonType]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const columns: TableProps["columns"] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300
        },
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name',
            render: (course_name: string) => (
                <div className="truncate">
                    {course_name}
                </div>
            )
        },
        {
            title: 'Session Name',
            dataIndex: 'session_name',
            key: 'session_name',

        },
        {
            title: 'Video Url',
            dataIndex: 'video_url',
            key: 'video_url',
            render: (video_url: string) => (
                <>
                    <iframe src={video_url} ></iframe>
                </>
            )
        },
        {
            title: 'Image Url',
            dataIndex: 'image_url',
            key: 'image_url',

        },
        {
            title: 'Lesson type',
            dataIndex: 'lesson_type',
            key: 'lesson_type',
            render: (lesson_type) => (
                <>
                    <Tag color={getColorLessonType(lesson_type)}>
                        {lesson_type}
                    </Tag>
                </>
            )
        },
        {
            title: 'Created Date ',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
        },
        {
            title: 'Updated Date ',
            dataIndex: 'updated_at',
            key: 'updatedDate',
            render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (_id: string, record: Lessons) => (
                <>
                    {
                        courseId && sessionId ? (
                            <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lectures/edit-lecture/${_id}`}>
                                <EditOutlined className="text-blue-500 m-2" />

                            </Link>
                        )
                            :
                            (
                                <Link to={`/instructor/manage-all-lectures/update-lecture/${_id}`}>
                                    <EditOutlined className="text-blue-500 m-2" />

                                </Link>
                            )
                    }
                    <DeleteOutlined className="text-red-500 m-2" onClick={() => showModal(_id, record.name)} />
                </>
            ),
        },
    ];

    const handleChange = (value: string) => {
        setSession_id(value);
    };

    const handleChangeLessonType = (value: string) => {
        setLessonTpe(value);
    };

    const handleCourseChange = (value: string) => {
        setCourse_id(value);
    };

    return (
        <div>

            <Modal
                title="Confirm Delete"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
            {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                    <LoadingComponent />
                </div>
            ) : (
                <div className="">

                    {
                        courseId && sessionId ? (
                            <>
                                <CustomBreadcrumb />
                            </>
                        ) : (
                            <CustomBreadcrumb />
                        )
                    }
                    <div className="grid grid-cols-2">

                        <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-20">
                            {/* filter lesson by course */}
                            {
                                !courseId && (
                                    <Select
                                        defaultValue="Choose course to filter"
                                        style={{ width: 200 }}
                                        className="mt-10"
                                        onChange={handleCourseChange}

                                        options={courses.map(course => ({
                                            label: course.name,
                                            value: course._id
                                        }))}
                                    />
                                )
                            }
                            {/* filter lesson by session */}
                            {
                                !sessionId && (
                                    <Select
                                        defaultValue="Choose session to filter"
                                        style={{ width: 200 }}
                                        className="mt-10"
                                        onChange={handleChange}
                                        options={sessions.map(session => ({
                                            label: session.name,
                                            value: session._id
                                        }))}
                                    />
                                )
                            }
                            {/* filter lesson by lesson type */}
                            <Select
                                defaultValue="All Lesson Type"
                                style={{ width: 200 }}
                                className="mt-10"
                                onChange={handleChangeLessonType}
                                options={[
                                    {
                                        options: [
                                            { label: <span>All</span>, value: '' },
                                            { label: <span>video</span>, value: 'video' },
                                            { label: <span>text</span>, value: 'text' },
                                            { label: <span>image</span>, value: 'image' },
                                        ],
                                    },
                                ]}
                            />
                            <Input
                                placeholder="Search"
                                value={keyword}
                                onChange={handleSearch}
                                className="my-10"
                                style={{ width: 200 }}
                            />
                        </div>
                        <div>
                            {
                                courseId && sessionId ? (
                                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}//create-lecture`}>
                                        <Button type="primary" className="my-10 float-right">Add New Lessons</Button>
                                    </Link>
                                ) :
                                    (
                                        <Link to={`/instructor/manage-all-lessons/create-lesson`}>
                                            <Button type="primary" className="my-10 float-right">Add New Lessons</Button>
                                        </Link>
                                    )
                            }
                        </div>
                    </div>

                    <Table dataSource={data} columns={columns} rowKey={(record: Lessons) => record._id} />
                </div>
            )}
        </div>
    );
};

export default LectureOfCourse;
