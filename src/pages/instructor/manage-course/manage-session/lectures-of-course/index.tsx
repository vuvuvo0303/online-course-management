import { DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Modal, Select, Spin, Table, TableProps, Tag, } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Course, Lecture, Session } from "../../../../../models";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/axiosInstance.ts";
import useDebounce from "../../../../../hooks/useDebounce.ts";
import {API_GET_LESSONS, API_GET_COURSES, API_DELETE_LESSON, API_GET_SESSIONS, getColorLessonType} from "../../../../../consts";
import {format} from "date-fns";

const LectureOfCourse: React.FC = () => {
    const [data, setData] = useState<Lecture[]>([]);
    const { courseId, sessionId } = useParams<{ courseId: string, sessionId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [selectedLectureId, setSelectedLectureId] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const [session_id, setSession_id] = useState<string>('');
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
                toast.success("Delete Lecture Failed!");
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
        toast.success("Delete Lecture Successfully!")
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const fetchSession = async () => {
        try {
            const response = await axiosInstance.post(API_GET_SESSIONS, {
                "searchCondition": {
                    "keyword": "",
                    "course_id": "",
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
                    "status": "new",
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
    }, [])

    //fetch lecture
    useEffect(() => {
        if (courseId && sessionId) {
            const fetchLecture = async () => {
                try {
                    const res = await axiosInstance.post(API_GET_LESSONS,
                        {
                            "searchCondition": {
                                "keyword": debouncedSearchTerm,
                                "course_id": courseId,
                                "session_id": sessionId,
                                "lesson_type": "",
                                "is_position_order": false,
                                "is_deleted": false
                            },
                            "pageInfo": {
                                "pageNum": 1,
                                "pageSize": 100
                            }
                        }
                    );
                    if (res) {
                        setData(res.data.pageData)
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
                    const res = await axiosInstance.post(API_GET_LESSONS, {
                        "searchCondition": {
                            "keyword": debouncedSearchTerm,
                            "course_id": "",
                            "session_id": session_id,
                            "lesson_type": "",
                            "is_position_order": false,
                            "is_deleted": false
                        },
                        "pageInfo": {
                            "pageNum": 1,
                            "pageSize": 100
                        }
                    },);
                    if (res) {
                        setData(res.data.pageData);
                    }
                } catch (error) {
                    //
                } finally {
                    setLoading(false);
                }
            };
            fetchLecture();
        }
    }, [courseId, sessionId, keyword, session_id, course_id, debouncedSearchTerm]);

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
            render: (lesson_type)=>(
                <>
                <Tag color={getColorLessonType(lesson_type)}>
                    {lesson_type}
                </Tag>
                </>
            )
        },
        {
            title: 'Created At ',
            dataIndex: 'created_at',
            key: 'created_at',
            defaultSortOrder: 'descend',
            render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
        },
        {
            title: 'Updated At ',
            dataIndex: 'updated_at',
            key: 'updatedDate',
            defaultSortOrder: 'descend',
            render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (_id: string, record: Lecture) => (
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

    const handleCourseChange = (value: string) => {
        setCourse_id(value);
        console.log("check value: ", value)
    };
    console.log();

    return (
        <div className="">
            
            <Modal
                title="Confirm Delete"
                visible={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
            {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="">

                    {
                        courseId && sessionId ? (
                            <>
                                <Breadcrumb className="py-2" >
                                    <Breadcrumb.Item href="/dashboard">
                                        <HomeOutlined />
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="/instructor/manage-courses">
                                        Manage Courses
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href={`/instructor/manage-courses/${courseId}/manage-sessions`}>
                                        Manage Sessions
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Manage Lesson</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1 className="text-center m-10">Manage Lessons</h1>
                            </>
                        ) : (
                            <>
                                <Breadcrumb className="py-2" >
                                    <Breadcrumb.Item href="/dashboard">
                                        <HomeOutlined />
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Manage Lectures</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1 className="text-center m-10">Manage All Lessons</h1>
                            </>
                        )
                    }
                    <div className="grid grid-cols-2">

                        <div className="grid xl:grid-cols-3 grid-cols-1 gap-20">
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
                                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lectures/create-lecture`}>
                                        <Button className="bg-yellow-500 my-10 float-right">Add New</Button>
                                    </Link>
                                ) :
                                    (
                                        <Link to={`/instructor/manage-all-lectures/create-lecture`}>
                                            <Button type="primary" className="my-10 float-right">Add New Lessons</Button>
                                        </Link>
                                    )
                            }
                        </div>
                    </div>

                    <Table dataSource={data} columns={columns} rowKey="_id" />
                </div>
            )}
        </div>
    );
};

export default LectureOfCourse;
