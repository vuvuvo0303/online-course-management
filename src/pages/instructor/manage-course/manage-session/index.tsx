import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Modal, Switch, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Lecture, Session } from "../../../../models";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ManageSession = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedSessionID, setSelectedSessionID] = useState<string>('');
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
            await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/session/${sessionId}`);
            const res = await axios.get<Lecture[]>(`https://665fbf245425580055b0b23d.mockapi.io/lectures`);
            const lecturesOfSessionNeedToDelete = res.data.filter(lecture => lecture.sessionId === sessionId);
            await Promise.all(lecturesOfSessionNeedToDelete.map(lecture => 
                axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/lectures/${lecture.lectureId}`)
            ));
            setSessions(sessions.filter(session => session.sessionId !== sessionId));
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
                const res = await axios.get<Session[]>("https://665fbf245425580055b0b23d.mockapi.io/session");
                if (res) {
                    console.log("check res:", res);
                    setSessions(res.data.filter(session => session.courseId === courseId));
                }
            } catch (error) {
                console.log("error: ", error);
                setError("Lỗi xảy ra khi lấy dữ liệu phiên học");
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchSession();
        }
    }, [courseId]);

    const onChangeStatus = async (checked: boolean, sessionId: string) => {
        try {
            const updatedSesstion = sessions.find(session => session.sessionId === sessionId);
            if (updatedSesstion) {
                updatedSesstion.status = checked;
                await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/session/${sessionId}`, updatedSesstion);
                setSessions([...sessions]); // Update state to trigger re-render
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const columns: TableProps<Session>["columns"] = [
        {
            title: 'Session Id',
            dataIndex: 'sessionId',
            key: 'sessionId',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            defaultSortOrder: 'descend',
            sorter: (a: { createdDate: string }, b: { createdDate: string }) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Updated Date',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
            defaultSortOrder: 'descend',
            sorter: (a: { createdDate: string }, b: { createdDate: string }) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Course Id',
            dataIndex: 'courseId',
            key: 'courseId',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean, record: Session) => (
                <Switch
                    checked={status}
                    onChange={(checked) => onChangeStatus(checked, record.sessionId)}
                />
            ),
        },
        {
            title: 'Action',
            dataIndex: 'sessionId',
            key: 'sessionId',
            render: (sessionId: string) => (
                <>
                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lectures`}><EyeOutlined className="text-purple-500 m-2" /></Link>
                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/update-session/${sessionId}`}><EditOutlined className="mt-2 text-blue-500" /></Link>
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
