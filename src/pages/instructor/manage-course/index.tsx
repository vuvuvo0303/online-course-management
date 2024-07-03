import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Table, TableProps } from "antd";
import { Course } from "../../../models";
import { User } from "../../../models/User";
import { host_main } from "../../../consts";

const InstructorManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const userString = localStorage.getItem("user");

    const user: User = userString ? JSON.parse(userString) : null;
    console.log("check user: ", user);
    setUserId(user?._id);
    console.log("check userId: ", user?._id);

  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODRjZGMwNTBjZGE2NzkyNTQyZmUyNCIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzE5OTc5NDY0LCJleHAiOjE3MjAwMDgyNjR9.6mKOLofDC0QwoNC5Dc5B_ahUTTBlk4-8nvKNOSEwCSc"
      console.log("check token: ", token);
      try {
        const res = await axios.post<Course[]>(`${host_main}/api/course/search`, {
          "searchCondition": {
            "keyword": "",
            "category": "",
            "status": "",
            "is_deleted": false
          },
          "pageInfo": {
            "pageNum": 1,
            "pageSize": 10
          }
        },
          {

            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODRjZGMwNTBjZGE2NzkyNTQyZmUyNCIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzE5OTc5NDY0LCJleHAiOjE3MjAwMDgyNjR9.6mKOLofDC0QwoNC5Dc5B_ahUTTBlk4-8nvKNOSEwCSc`
            }
          });
        if (res.data.data.pageData) {
          console.log("check res: ", res);
          setCourses(res.data.data.pageData);
          console.log("check courses: ", res.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchCourses();
  }, [userId])

  if (loading) {
    return <p className="flex justify-center items-center">Loading ...</p>
  }

  const onChange = async (checked: boolean, courseId: string) => {
    try {
      const updateStatus = courses.find(course => course._id === courseId)
      if (updateStatus) {
        updateStatus.status = checked;
        await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/courses/${courseId}`, updateStatus)
        setCourses([...courses]);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columnsCourses: TableProps<Course>["columns"] = [
    {
      title: '_id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'category_id',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'created_at ',
      dataIndex: 'created_at',
      key: 'created_at',
      defaultSortOrder: 'descend',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'updated_at ',
      dataIndex: 'updated_at',
      key: 'updatedDate',
      defaultSortOrder: 'descend',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // render: (status: boolean, record: Course) => (
      //   <div>
      //     <Switch checked={status} onChange={(checked) => onChange(checked, record._id)} />
      //   </div>
      // )
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (courseId: string) => (
        <>
          <Link to={`/instructor/manage-courses/${courseId}`}><Button type="primary">Detail</Button></Link>
          <Link to={`/instructor/manage-courses/${courseId}/manage-sessions`}><EyeOutlined className="text-purple-500 m-2" /></Link>
          <EditOutlined className="mt-2 text-blue-500" />
          <DeleteOutlined className="text-red-500 m-2" />
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
      <Link to={"/instructor/create-course"}><Button type="primary" className="float-right m-5">Add New</Button></Link>
      <Table columns={columnsCourses} dataSource={courses} />
    </div>
  );
};

export default InstructorManageCourses;