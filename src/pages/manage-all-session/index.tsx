import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Modal, Select, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { Session } from "../../models";
import { Link } from "react-router-dom";
import { User } from "../../models/User";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosInstance.ts";
import { colorIs_delete } from "../../consts";
import useDebounce from "../../hooks/useDebounce";

const ManageAllSession = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [is_deleted, setIs_deleted] = useState<boolean>(false);
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
            await axiosInstance.delete(`/api/session/${sessionId}`);
            setSessions(sessions.filter(session => session._id !== sessionId));
            toast.success("Delete Session Successfully!");
        } catch (error) {
            toast.error("Failed to delete session. Please try again.");
        }
    };


    useEffect(() => {
        const userString = localStorage.getItem("user");
        const user: User = userString ? JSON.parse(userString) : null;
        setRole(user?.role);
        setUserId(user?._id)
    }, []);

    
    const handleChange = (value: boolean) => {
        setIs_deleted(value);
    };

    
    //fetch session
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await axiosInstance.post(`/api/session/search`, {
                    "searchCondition": {
                        "keyword": debouncedSearchTerm,
                        "course_id": "",
                        "is_position_order": true,
                        "is_deleted": is_deleted
                    },
                    "pageInfo": {
                        "pageNum": 1,
                        "pageSize": 100
                    }
                });
                if (res) {
                    console.log("check res:", res);
                    setSessions(res.data.pageData);
                }
            } catch (error) {
                console.log("error: ", error);
                toast.error("failed")
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, [userId, role, is_deleted, keyword, debouncedSearchTerm]);

    if (loading === true) {
        return <div className="text-center">Loading...</div>;
    }

    const columns: TableProps["columns"] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'Is Deleted',
            dataIndex: 'is_deleted',
            key: 'is_deleted',
            render: (is_deleted: boolean) => (
                <>
                    <Tag color={colorIs_delete(is_deleted)}>
                        {is_deleted ? "true" : "false"}
                    </Tag>
                </>
            )
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (_id: string, record: Session) => (
                <>
                    {
                        role === "instructor" ?
                            (
                                <Link to={`/instructor/manage-courses/${record.course_id}/manage-sessions/${_id}/manage-lectures`}><EyeOutlined className="text-purple-500 m-2" /></Link>
                            )
                            :
                            (
                                <Link to={`/admin/manage-all-sessions/${_id}/manage-lecture`}><EyeOutlined className="text-purple-500 m-2" /></Link>
                            )
                    }
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
                {
                    role === "instructor" ?
                        (
                            <Breadcrumb.Item href="/instructor/dashboard">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                        )
                        :
                        (
                            <Breadcrumb.Item href="/admin/dashboard">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                        )
                }
                <Breadcrumb.Item>
                    <span>Manage All Sessions</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-center my-5">Manage All Session</h1>
            <div className="grid grid-cols-2">
                <div className="grid grid-cols-2">
                    <Select
                        defaultValue={is_deleted}
                        onChange={handleChange}
                        style={{ width: 200 }}
                        className="mt-10"
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
                {
                    role === "instructor" && (
                        <Link to={`/instructor/manage-all-sessions/create-session`}><Button type="primary" className="float-right my-10">Add New</Button></Link>
                    )

                }
            </div>

            <Table dataSource={sessions} columns={columns} rowKey="_id" />
        </div>
    );
};

export default ManageAllSession;
