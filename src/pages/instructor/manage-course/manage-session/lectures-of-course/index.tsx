import { DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Modal, Spin, Switch, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Lecture } from "../../../../../models";
import { toast } from "react-toastify";

const LectureOfCourse: React.FC = () => {
    const [data, setData] = useState<Lecture[]>([]);
    const { courseId, sessionId } = useParams<{ courseId: string, sessionId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [selectedLectureId, setSelectedLectureId] = useState<string>('');

    const showModal = (lectureId: string) => {
        setModalText(`Do you want to delete this lecture with id = ${lectureId}`)
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

    const handleDelete = async (lectureId: string) => {
        await axios.delete(`https://665fbf245425580055b0b23d.mockapi.io/lectures/${lectureId}`);
        setData(data.filter(lecture => lecture.lectureId !== lectureId));
        toast.success("Delete Lecture Successfully!")
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {

        if (courseId) {
            const fetchLecture = async () => {
                try {
                    const res = await axios.get<Lecture[]>(`https://665fbf245425580055b0b23d.mockapi.io/lectures`);
                    if (res.data) {
                        const filteredLectures = res.data.filter(lecture => lecture.courseId === courseId && lecture.sessionId === sessionId);
                        setData(filteredLectures);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLecture();
        } else {
            const fetchLecture = async () => {
                try {
                    const res = await axios.get<Lecture[]>(`https://665fbf245425580055b0b23d.mockapi.io/lectures`);
                    if (res.data) {
                        setData(res.data);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLecture();
        }
    }, [courseId, sessionId]);

    const onChangeStatus = async (checked: boolean, lectureId: string) => {
        try {
            const updatedLecture = data.find(lecture => lecture.lectureId === lectureId);
            if (updatedLecture) {
                updatedLecture.status = checked;
                await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/lectures/${lectureId}`, updatedLecture);
                setData([...data]); // Update state to trigger re-render
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const columns: TableProps<Lecture>["columns"] = [
        {
            title: 'Lecture Id',
            dataIndex: 'lectureId',
            key: 'lectureId',
        },
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
            render: (status: boolean, record: Lecture) => (
                <Switch
                    checked={status}
                    onChange={(checked) => onChangeStatus(checked, record.lectureId)}
                />
            ),
        },
        {
            title: 'Action',
            dataIndex: 'lectureId',
            key: 'action',
            render: (lectureId: string) => (
                <>
                    <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lectures/edit-lecture/${lectureId}`}>
                        <EditOutlined className="text-blue-500 m-2" />

                    </Link>
                    <DeleteOutlined className="text-red-500 m-2" onClick={() => showModal(lectureId)} />
                </>
            ),
        },
    ];

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
                                    <Breadcrumb.Item>Manage Lectures</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1 className="text-center m-10">Manage Lectures</h1>
                            </>
                        ) : (
                            <>
                                <Breadcrumb className="py-2" >
                                    <Breadcrumb.Item href="/dashboard">
                                        <HomeOutlined />
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Manage Lectures</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1 className="text-center m-10">Manage All Lectures</h1>
                            </>
                        )
                    }

                    <div>
                        {
                            courseId && sessionId ? (
                                <Link to={`/instructor/manage-courses/${courseId}/manage-sessions/${sessionId}/manage-lectures/create-lecture`}>
                                    <Button className="bg-yellow-500 mb-10 float-right">Add New</Button>
                                </Link>
                            ) :
                                (
                                    <Link to={`/instructor/manage-all-lectures/create-lecture`}>
                                        <Button className="bg-yellow-500 mb-10 float-right">Add New</Button>
                                    </Link>
                                )
                        }
                    </div>
                    <Table dataSource={data} columns={columns} rowKey="lectureId" />
                </div>
            )}
        </div>
    );
};

export default LectureOfCourse;
