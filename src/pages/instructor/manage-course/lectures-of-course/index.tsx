import { DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Định nghĩa interface cho lecture
interface Lecture {
    lectureId: string;
    title: string;
    description: string;
    videoUrl: string;
    createdDate: string;
    updatedDate: string;
    courseId: string;
}

const LectureOfCourse: React.FC = () => {
    const [data, setData] = useState<Lecture[]>([]);
    const { courseId } = useParams<{ courseId: string }>();

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const res = await axios.get<Lecture[]>(`https://665fbf245425580055b0b23d.mockapi.io/lectures`);
                console.log("check data: ", res);
                if (res.data) {
                    // Lọc các lecture có courseId bằng courseId từ useParams
                    const filteredLectures = res.data.filter(lecture => lecture.courseId === courseId);
                    setData(filteredLectures);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (courseId) {
            fetchLecture();
        }
    }, [courseId]);

    const columns = [
        {
            title: 'Lecture Id',
            dataIndex: 'lectureId',
            key: 'lectureId',
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
        },
        {
            title: 'Updated Date',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
        },
        {
            title: 'Course Id',
            dataIndex: 'courseId',
            key: 'courseId',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <>
                    <Button className="bg-blue-500 m-2"><EditOutlined /></Button>
                    <Button className="bg-red-500 m-2"><DeleteOutlined /></Button>
                </>
            ),
        },
    ];

    return (
        <div className="">
            <div>
                <Button className="bg-yellow-500 float-right">
                    Add New
                </Button>
            </div>
            <Breadcrumb
                className="py-2"
                items={[
                    {
                        title: <HomeOutlined />,
                    },
                    {
                        href: "dashboard/",
                        title: (
                            <>
                                <UserOutlined />
                                <span>Instructor</span>
                            </>
                        ),
                    },
                    {
                        title: "Manage Lecture",
                    },
                ]}
            />
            <Table dataSource={data} columns={columns} rowKey="lectureId" />
        </div>
    );
}

export default LectureOfCourse;