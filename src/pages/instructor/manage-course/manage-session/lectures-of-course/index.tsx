import { DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Modal, Spin, Table, TableProps, } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Lecture } from "../../../../../models";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/api";

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
        await axiosInstance.delete(`/api/lesson/${lectureId}`);
        setData(data.filter(lecture => lecture._id !== lectureId));
        toast.success("Delete Lecture Successfully!")
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const token = localStorage.getItem("token")
    useEffect(() => {

        if (courseId) {
            const fetchLecture = async () => {
                try {
                    const res = await axiosInstance.post(`/api/lesson/search`,
                        {
                            "searchCondition": {
                                "keyword": "",
                                "course_id": courseId,
                                "session_id": sessionId,
                                "lesson_type": "",
                                "is_position_order": false,
                                "is_deleted": false
                            },
                            "pageInfo": {
                                "pageNum": 1,
                                "pageSize": 10
                            }
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    if (res) {
                        console.log("Check res: ", res);
                        setData(res.data.pageData)
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
    }, [courseId, sessionId, token]);


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
            title: 'Video Url',
            dataIndex: 'video_url',
            key: 'video_url',
            render:(video_url: string)=>(
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
            title: 'Created At ',
            dataIndex: 'created_at',
            key: 'created_at',
            defaultSortOrder: 'descend',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Updated At ',
            dataIndex: 'updated_at',
            key: 'updatedDate',
            defaultSortOrder: 'descend',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (_id: string) => (
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
                    <DeleteOutlined className="text-red-500 m-2" onClick={() => showModal(_id)} />
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
