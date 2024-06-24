

import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Switch, Table, TableProps } from "antd";
import { Course } from "../../../models";

const InstructorManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await axios.get(`https://665fbf245425580055b0b23d.mockapi.io/courses`);
        if (res.data) {
          setCourses(res.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchLecture();
  }, [])

  if (loading) {
    return <p className="flex justify-center items-center">Loading ...</p>
  }

  const onChange = async (checked: boolean, courseId: string) => {
    try {
      const updateStatus = courses.find(course => course.courseId === courseId)
      if (updateStatus) {
        updateStatus.status = checked;
        await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/courses/${courseId}`, updateStatus)
        setCourses([...courses]);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columnsCourses:TableProps<Course>["columns"] = [
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
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Course Id',
      dataIndex: 'courseId',
      key: 'courseId',
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: Course) => (
        <div>
          <Switch checked={status} onChange={(checked) => onChange(checked, record.courseId)} />
        </div>
      )
    },
    {
      title: 'Action',
      dataIndex: 'courseId',
      key: 'courseId',
      render: (courseId: string) => (

        <>
          <Link to={`/instructor/manage-course/${courseId}/manage-session`}><EyeOutlined className="text-purple-500 m-2" /></Link>
          <EditOutlined className="mt-2 text-blue-500" />
          <DeleteOutlined className=" text-red-500 m-2" />

        </>
      )

    }
  ];


  return (
    <div>
      <Breadcrumb
        className="py-2"
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            title: "Manage Course",

          },
        ]}
      />
      <h1 className="text-center">Manage Course</h1>
      <Link to={"/instructor/create-course"}><Button className="float-right m-5 bg-blue-600">Add Newe</Button></Link>
      <Table columns={columnsCourses}
        dataSource={courses}
      />
    </div>
  );
};

export default InstructorManageCourses;