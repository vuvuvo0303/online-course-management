import { DeleteOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Modal, Spin, Switch, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Lecture } from "../../../../../models";
import { toast } from "react-toastify";

const AdminMangeLecture: React.FC = () => {
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
        const fetchLecture = async () => {
            try {
             
                if (sessionId) {
                    const res = await axios.get<Lecture[]>(`https://665fbf245425580055b0b23d.mockapi.io/lectures`);
                    if (res.data) {
                        const filteredLectures = res.data.filter(lecture => lecture.courseId === courseId && lecture.sessionId === sessionId);
                        setData(filteredLectures);
                    }
                }  else {
                    // manage all lectures
                    const res = await axios.get<Lecture[]>(`https://665fbf245425580055b0b23d.mockapi.io/lectures`);
                    console.log("check res all lectures: ", res)
                    if (res.data) {
                        setData(res.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLecture();
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
            title: 'Ban',
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
                    {   //manage courses > manage sessions > manage lectures
                        courseId && sessionId ?
                            (
                                <Breadcrumb className="py-2" >
                                    <Breadcrumb.Item href="instructor/dashboard">
                                        <HomeOutlined />
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="/admin/manage-courses">
                                        Manage Courses
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href={`/admin/manage-course/${courseId}/manage-session`}>
                                        Manage Session
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Manage Lecture</Breadcrumb.Item>
                                </Breadcrumb>
                            )
                            :
                            (  // manage all lectures
                                <Breadcrumb className="py-2" >
                                    <Breadcrumb.Item href="admin/dashboard">
                                        <HomeOutlined />
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Manage Lecture</Breadcrumb.Item>
                                </Breadcrumb>
                            )
                    }
                    {sessionId ? <h1 className="text-center m-10">Manage Lecture</h1> : <h1 className="text-center m-10">Manage All Lecture</h1>}
                    <Table dataSource={data} columns={columns} rowKey="lectureId" />
                </div>
            )}
        </div>
    );
};

export default AdminMangeLecture;
