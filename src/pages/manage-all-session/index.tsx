import { DeleteOutlined, EditOutlined, } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { Course, Session } from "../../models";
import { Link } from "react-router-dom";
import { axiosInstance, getUserFromLocalStorage } from "../../services";
import { API_DELETE_SESSION, API_GET_COURSES, API_GET_SESSIONS } from "../../consts";
import { useDebounce } from "../../hooks";
import { LoadingComponent, CustomBreadcrumb } from "../../components";
import { formatDate } from "../../utils";
const ManageAllSession = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [course_id, setCourse_id] = useState<string>('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [role, setRole] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [modalText, setModalText] = useState('');
    const [selectedSessionID, setSelectedSessionID] = useState<string>('');
    const debouncedSearchTerm = useDebounce(keyword, 500);
    const showModal = (sessionId: string, record: Session) => {
        setModalText(`Do you want to delete this session with name is "${record.name}" and the lessons of this session `)
        setSelectedSessionID(sessionId)
        setOpen(true);
    };

    const handleOk = async () => {
        if (selectedSessionID) {
            setModalText('Deleting...');
            setConfirmLoading(true);
            try {
                await handleDelete(selectedSessionID);
            } catch (error) {
                setModalText("Error occurred: " + error);
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
    const handleDelete = async (sessionId: string) => {
        try {
            // Xóa session trước
            await axiosInstance.delete(`${API_DELETE_SESSION}/${sessionId}`);
            setSessions(sessions.filter(session => session._id !== sessionId));
            message.success("Delete Session Successfully!");
        } catch (error) {
            //
        }
    };


    useEffect(() => {
        const user = getUserFromLocalStorage();
        setRole(user?.role);
        setUserId(user?._id)
    }, []);

    //fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.post(API_GET_COURSES, {
                    "searchCondition": {
                        "keyword": "",
                        "category_id": "",
                        "status": "",
                        "is_deleted": false
                    },
                    "pageInfo": {
                        "pageNum": 1,
                        "pageSize": 100
                    }
                });
                if (response.data.pageData) {
                    setCourses(response.data.pageData);
                }
            } catch (error) {
                console.log("Error occurred: ", error);

            } finally {
                setLoading(false)
            }
        };
        fetchCourses();
    }, [])

    //fetch session
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axiosInstance.post(API_GET_SESSIONS, {
                    "searchCondition": {
                        "keyword": debouncedSearchTerm,
                        "course_id": course_id,
                        "is_position_order": true,
                        "is_deleted": false
                    },
                    "pageInfo": {
                        "pageNum": 1,
                        "pageSize": 100
                    }
                });
                if (response) {
                    const sortedSessions = response.data.pageData.sort((a: Session, b: Session) => {
                        const dateA = new Date(a.created_at).getTime();
                        const dateB = new Date(b.created_at).getTime();
                        return dateB - dateA;
                    });
                    setSessions(sortedSessions);
                }
            } catch (error) {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, [userId, role, keyword, debouncedSearchTerm, course_id]);


    if (loading) {
        return (<>
            <LoadingComponent />
        </>)
    }

    const columns: TableProps["columns"] = [
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name',
        },
        {
            title: 'Session Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Lesson',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: Session) => (
                <>
                    {
                        role === "instructor" ?
                            (
                                <Link className="text-blue-500" to={`/instructor/manage-all-sessions/${record._id}/manage-lessons`}>Lesson of {name}</Link>
                            )
                            :
                            (
                                <Link className="text-blue-500" to={`/admin/manage-all-sessions/${record._id}/manage-lessons`}>Lesson of {name}</Link>
                            )
                    }
                </>
            )
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: Date) => formatDate(new Date(created_at), "dd/MM/yyyy"),
        },
        {
            title: 'Updated Date',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (updated_at: Date) => formatDate(new Date(updated_at), "dd/MM/yyyy"),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (_id: string, record: Session) => (
                <>
                    <Link to={`/instructor/manage-all-sessions/update-session/${_id}`}><EditOutlined className="m-2 text-blue-500" /></Link>
                    <DeleteOutlined className="text-red-500 m-2" onClick={() => showModal(_id, record)} />
                </>
            )
        },
    ];


    const handleCancel = () => {
        setOpen(false);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // set course_id
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

            <CustomBreadcrumb />
            <div className="grid grid-cols-2">
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
                    {/* filter session by course */}
                    <Select
                        defaultValue="All Courses"
                        style={{ width: 200 }}
                        className="mt-10"
                        onChange={handleCourseChange}
                        options={[
                            { value: "", label: "All Courses" },
                            ...courses.map(course => ({
                                value: course._id,
                                label: course.name
                            }))
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
                {
                    role === "instructor" && (
                        <Link to={`/instructor/manage-all-sessions/create-session`}><Button type="primary" className="float-right my-10">Add New Session</Button></Link>
                    )

                }
            </div>

            <Table dataSource={sessions} columns={columns} rowKey="_id" />
        </div>
    );
};

export default ManageAllSession;
