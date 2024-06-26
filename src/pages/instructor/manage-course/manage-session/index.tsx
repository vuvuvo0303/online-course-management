import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Switch, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Session } from "../../../../models";
import { Link, useParams } from "react-router-dom";

const ManageSession = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    const columns:TableProps<Session>["columns"]= [
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
                    <Link to={`/instructor/manage-course/${courseId}/manage-session/${sessionId}/lecture`}><EyeOutlined className="text-purple-500 m-2" /></Link>
                    <Link to={`/instructor/manage-course/${courseId}/manage-session/update-session/${sessionId}`}><EditOutlined className="mt-2 text-blue-500" /></Link>
                    <DeleteOutlined className=" text-red-500 m-2" />
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

            <Breadcrumb>
                <Breadcrumb.Item href="/instructor/dashboard">
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/instructor/manage-courses">
                    <span>Manage Course</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>Manage Session</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-center mt-10">Manage Session</h1>
            <Link to={`/instructor/manage-course/${courseId}/manage-session/create-session`}><Button type="primary" className="float-right my-10">Add New</Button></Link>
            <Table dataSource={sessions} columns={columns} rowKey="sessionId" />
        </div>
    );
};

export default ManageSession;
