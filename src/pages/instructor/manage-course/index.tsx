import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Button, Input, Modal, Select, Table, TableProps, Tag } from "antd";
import { Category, Course } from "../../../models";
import { User } from "../../../models/User";
import { getColor, host_main } from "../../../consts";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance.ts";

const InstructorManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');
  const [courseId, setCourseId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const token = localStorage.getItem('token');
  const [status, setStatus] = useState<string>('new');
  const [cateId, setCateId] = useState<string>('java');
  const [keyword, setKeyword] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
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
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.post(`/api/category/search`,
          {
            "searchCondition": {
              "keyword": "",
              "is_delete": false
            },
            "pageInfo": {
              "pageNum": 1,
              "pageSize": 100
            }
          })
        if (res) {
          setCategories(res.data.pageData);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchCategories();
  }, [token])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.post(`/api/course/search`, {
          "searchCondition": {
            "keyword": keyword,
            "category": cateId,
            "status": status,
            "is_deleted": false
          },
          "pageInfo": {
            "pageNum": 1,
            "pageSize": 100
          }
        });
        if (res.data.pageData) {
          console.log("check res: ", res);
          setCourses(res.data.pageData);
          console.log("check courses: ", res.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchCourses();
  }, [userId, token, status, cateId, keyword])

  if (loading) {
    return <p className="flex justify-center items-center">Loading ...</p>
  }
  //setStatus
  const handleChange = (value: string) => {
    setStatus(value);
  };
  // setCateId
  const handleCateChange = (value: string) => {
    setCateId(value + "");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const columnsCourses: TableProps["columns"] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300
    },
    {
      title: 'Cate Name',
      dataIndex: 'category_name',
      key: 'category_name',

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
          {/* <Link to={`/instructor/manage-courses/${_id}`}><Button type="primary">Detail</Button></Link> */}
          <Link to={`/instructor/manage-courses/${_id}/manage-sessions`}><EyeOutlined className="text-purple-500 m-2" /></Link>
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
      <div className="grid grid-cols-2">
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-10">
          <Select
            defaultValue="new"
            style={{ width: 200 }}
            className="m-5"
            onChange={handleChange}
            options={[
              {
                options: [
                  { label: <span>new</span>, value: 'new' },
                  { label: <span>waiting_approve</span>, value: 'waiting_approve' },
                  { label: <span>approve</span>, value: 'approve' },
                  { label: <span>reject</span>, value: 'reject' },
                  { label: <span>active</span>, value: 'active' },
                  { label: <span>inactive</span>, value: 'inactive' },
                ],
              },
            ]}
          />
          <Select
            defaultValue="java"
            style={{ width: 200 }}
            className="m-5"
            onChange={handleCateChange}
            options={categories.map(cate => ({
              value: cate._id,
              label: cate.name
            }))}
          />
          <Input
            placeholder="Search"
            value={keyword}
            onChange={handleSearch}
            className="m-5"
            style={{ width: 200 }}
          />
        </div>
        <div>
        <Link to={"/instructor/manage-courses/create-course"}><Button type="primary" className="float-right m-5">Add New</Button></Link>
        </div>
      </div>
      <Table columns={columnsCourses} dataSource={courses} />
    </div>
  );
};

export default InstructorManageCourses;