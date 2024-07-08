import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Modal, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Lecture, Session } from "../../../../models";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { host_main } from "../../../../consts";

const ManageSession = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedSessionID, setSelectedSessionID] = useState<string>('');
    const token = localStorage.getItem("token")
    const showModal = (sessionId: string) => {
        setModalText(`Do you want to delete this session with id = ${sessionId} and the lessons of this session `)
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
                }, 2000);
            }
        } else {
            setOpen(false);
        }
    };
    const handleDelete = async (sessionId: string) => {
        try {
            // Xóa session trước
            await axios.delete(`${host_main}/api/session/${sessionId}`,{
                headers:{
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
                const res = await axios.post<Session[]>(`${host_main}/api/session/search`,
                    {
                        "searchCondition": {
                            "keyword": "",
                            "course_id": `${courseId}`,
                            "is_position_order": true,
                            "is_deleted": false
                        },
                        "pageInfo": {
                            "pageNum": 1,
                            "pageSize": 10
                        }
                    }
                    ,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res) {
                    console.log("check res:", res);
                    setSessions(res.data.data.pageData);
                }
            } catch (error) {
                console.log("error: ", error);
                setError(error+"");
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchSession();
        }
    }, [courseId, token]);

    const columns: TableProps<Session>["columns"] = [
        {
            title: 'Session Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            defaultSortOrder: 'descend',
            sorter: (a: { createdDate: string }, b: { createdDate: string }) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            defaultSortOrder: 'descend',
            sorter: (a: { createdDate: string }, b: { createdDate: string }) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Course Id',
            dataIndex: 'course_id',
            key: 'course_id',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Is deleted',
            dataIndex: 'is_deleted',
            key: 'is_deleted',
        },
        {
            title: '__v',
            dataIndex: '__v',
            key: '__v',
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (sessionId: string) => (
                <>
                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lectures`}><EyeOutlined className="text-purple-500 m-2" /></Link>
                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/update-session/${sessionId}`}><EditOutlined className="m-2 text-blue-500" /></Link>
                    <DeleteOutlined className="text-red-500 m-2" onClick={() => showModal(sessionId)} />
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
            <h1 className="text-center mt-10">Manage Session</h1>
            <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/create-session`}><Button type="primary" className="float-right my-10">Add New</Button></Link>
            <Table dataSource={sessions} columns={columns} rowKey="sessionId" />
        </div>
    );
};

export default ManageSession;
