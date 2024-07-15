import { DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Modal, Select, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Session } from "../../../../models";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { host_main } from "../../../../consts";
import axiosInstance from "../../../../services/axiosInstance.ts";
import useDebounce from "../../../../hooks/useDebounce";
import { format } from "date-fns";
const ManageSession = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState<string>('');
    const [selectedSessionID, setSelectedSessionID] = useState<string>('');
    const debouncedSearchTerm = useDebounce(keyword, 500);
    const token = localStorage.getItem("token")
    const showModal = (sessionId: string) => {
        setModalText(`Do you want to delete this session with id = ${sessionId} and the lessons of this session `)
        setSelectedSessionID(sessionId)
        setOpen(true);
    };
    const [is_deleted, setIs_deleted] = useState<boolean>(false);

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
                }, 2000);
            }
        } else {
            setOpen(false);
        }
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    const handleDelete = async (sessionId: string) => {
        try {
            // Xóa session trước
            await axios.delete(`${host_main}/api/session/${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSessions(sessions.filter(session => session._id !== sessionId));
            toast.success("Delete Session Successfully!");
        } catch (error) {
            toast.error("Failed to delete session. Please try again.");
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await axiosInstance.post(`/api/session/search`,
                    {
                        "searchCondition": {
                            "keyword": debouncedSearchTerm,
                            "course_id": courseId,
                            "is_position_order": false,
                            "is_deleted": is_deleted
                        },
                        "pageInfo": {
                            "pageNum": 1,
                            "pageSize": 30
                        }
                    });
                if (res) {
                    setSessions(res.data.pageData);
                    console.log("check res: ", res);
                }
            } catch (error) {
                console.log("error: ", error);
                setError(error + "");
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchSession();
        }
    }, [courseId, keyword, is_deleted, debouncedSearchTerm]);

    const columns: TableProps<Session>["columns"] = [
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
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => {
                return format(new Date(date), 'dd/MM/yy');
            },
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (date: string) => {
                return format(new Date(date), 'dd/MM/yy');
            },
        },
        // {
        //     title: '__v',
        //     dataIndex: '__v',
        //     key: '__v',
        // },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (_id: string) => (
                <>
                    {/* <Button type="primary" className="m-2">Detail</Button> */}
                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/update-session/${_id}`}><EditOutlined className="m-2 text-blue-500" /></Link>
                    <DeleteOutlined className="text-red-500 m-2" onClick={() => showModal(_id)} />
                </>
            )
        },
        {
            title: 'Lesson',
            dataIndex: '_id',
            key: '_id',
            render: (_id: number, record: Session) => (
                <>
                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${_id}/manage-lectures`}>
                    <p className="text-blue-700">Lesson of "{record.name}"</p></Link>
                </>
            )
        },
    ];

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const handleChange = (value: boolean) => {
        setIs_deleted(value);
    };
    return (
        <div>
            <Modal
                title="Confirm Delete"
                visible={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
            <Breadcrumb>
                <Breadcrumb.Item href="/instructor/dashboard">
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/instructor/manage-courses">
                    <span>Manage Courses</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>Manage Sessions</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-center m-5">Manage Session</h1>
            <div className="grid grid-cols-2">
                <div className="grid grid-cols-2">
                    <Select
                        defaultValue={is_deleted}
                        style={{ width: 200 }}
                        className="mt-10"
                        onChange={handleChange}
                        options={[
                            {
                                options: [
                                    { label: <span>true</span>, value: true },
                                    { label: <span>false</span>, value: false },
                                ],
                            },
                        ]}
                    />
                    <Input
                        placeholder="Search"
                        value={keyword}
                        onChange={handleSearch}
                        className="m-10"
                        style={{ width: 200 }}
                    />
                </div>
                <div>
                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/create-session`}><Button type="primary" className="float-right my-10">Add New</Button></Link>
                </div>
            </div>
            <Table dataSource={sessions} columns={columns} rowKey="sessionId" />
        </div>
    );
};

export default ManageSession;
