import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Modal, Table, TableProps, Tag } from "antd";
import { Course } from "../../../models";
import { User } from "../../../models/User";
import { getColor, host_main } from "../../../consts";
import { toast } from "react-toastify";

const InstructorManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');
  const [courseId, setCourseId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const showModal = (_id: string) => {
    setOpen(true);
    setModalText("Do you want to delete course with id: " + _id);
    setCourseId(_id);
  };
  
  const handleOk = async () => {
    try {
      const deleted = await axios.delete<Course>(`${host_main}/api/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("check deleted: ", deleted);
      toast.success("Delete Successfully!")
      setCourses(courses.filter(course => course._id != courseId))
    } catch (error) {
      console.log("Error occurred: ", error);
      toast.error("Delete Failed!")
    }
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");

    const user: User = userString ? JSON.parse(userString) : null;
    console.log("check user: ", user);
    setUserId(user?._id);
    console.log("check userId: ", user?._id);

  }, []);

  useEffect(() => {
    const fetchCourses = async () => {

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
              Authorization: `Bearer ${token}`
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

  // const onChange = async (checked: boolean, courseId: string) => {
  //   try {
  //     const updateStatus = courses.find(course => course._id === courseId)
  //     if (updateStatus) {
  //       updateStatus.status = checked;
  //       await axios.put(`https://665fbf245425580055b0b23d.mockapi.io/courses/${courseId}`, updateStatus)
  //       setCourses([...courses]);
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };

  const columnsCourses: TableProps<Course>["columns"] = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cate ID',
      dataIndex: 'category_id',
      key: 'category_id',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <>
          <Tag color={getColor(status)}

          >
            {status}
          </Tag>
        </>
      )
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (_id: string) => (
        <>
          <Link to={`/instructor/manage-courses/${_id}`}><Button type="primary">Detail</Button></Link>
          <Link to={``}><EyeOutlined className="text-purple-500 m-2" /></Link>
          <Link to={`/instructor/manage-courses/update-course/${_id}`}><EditOutlined className="mt-2 text-blue-500" /></Link>
          <DeleteOutlined onClick={() => showModal(_id)} className="text-red-500 m-2" />
        </>
      )
    }
  ];


  return (
    <div>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
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
      <Link to={"/instructor/manage-courses/create-course"}><Button type="primary" className="float-right m-5">Add New</Button></Link>
      <Table columns={columnsCourses} dataSource={courses} />
    </div>
  );
};

export default InstructorManageCourses;