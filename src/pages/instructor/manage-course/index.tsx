import { DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Input, Modal, Select, Table, TableProps, Tag } from "antd";
import { Category, Course, Log } from "../../../models";
import { getColor } from "../../../consts";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance.ts";

const InstructorManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [courseId, setCourseId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [openLogStatus, setOpenLogStatus] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);

  // Status default of course, before change
  const [statusDefaultChange, setDefaultChange] = useState<string>('');
  //status for filter log by new status
  const [newStatus, setNewStatus] = useState<string>('');
  //status for filter log by old status
  const [oldStatus, setOldStatus] = useState<string>('');
  //status for filter course by status
  const [status, setStatus] = useState<string>('new');
  //status for change status
  const [changeStatus, setChangeStatus] = useState<string>('new');
  const [cateId, setCateId] = useState<string>('java');
  const [keyword, setKeyword] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  //show delete modal
  const showModal = (_id: string) => {
    setOpen(true);
    setModalText("Do you want to delete course with id: " + _id);
    //set course id that instructor want to delete
    setCourseId(_id);
  };
  //show change status modal
  const showModalChangeStatus = (status: string, course_id: string) => {
    setOpenChangeStatus(true);
    //set course id that instructor want to change status
    setCourseId(course_id);
    setDefaultChange(status);
  };
  //show log status modal
  useEffect(() => {
    //fetch logs
    const fetchLog = async () => {
      try {
        const res = await axiosInstance.post("/api/course/log/search", {
          "searchCondition": {
            "course_id": courseId,
            "keyword": "",
            "old_status": oldStatus,
            "new_status": newStatus,
            "is_deleted": false
          },
          "pageInfo": {
            "pageNum": 1,
            "pageSize": 100
          }
        })
        if (res) {
          console.log("check log: ", res.data.pageData);
          
          setLogs(res.data.pageData.sort((a: { created_at: string }, b: { created_at: string }) => {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          }));
        }
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    }
    fetchLog();
  }, [courseId, oldStatus, newStatus]);

  const showModalLogStatus = async (course_id: string) => {
    setCourseId(course_id);

    setOpenLogStatus(true);
  };
  // handle to change status
  const handleOkLogStatus = () => {

    setConfirmLoading(true);
    setTimeout(() => {
      setOpenLogStatus(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleOkChangeStatus = async () => {
    try {
      await axiosInstance.put("/api/course/change-status",
        {
          "course_id": courseId,
          "new_status": changeStatus,
          "comment": "This course not match for approve. Please rereview session and lesson in this course!"
        }
      )
      toast.success("Change Status Successfully!");
      setCourses(courses.filter(course => course._id != courseId))
    } catch (error) {
      console.log("Error occurred: ", error);
      toast.error("Change Status Failed!")
    }
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenChangeStatus(false);
      setConfirmLoading(false);
    }, 500);
  };
  // handle delete ok
  const handleOk = async () => {
    try {
      const deleted = await axiosInstance.delete(`/api/course/${courseId}`)
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
    setOpen(false);
    setOpenChangeStatus(false);
    setOpenLogStatus(false);
  };

  //fetch categories
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
  }, [])
  //fetch courses
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
  }, [status, cateId, keyword])

  if (loading) {
    return <p className="flex justify-center items-center">Loading ...</p>
  }
  //setStatus for filter log by status
  const handleAllLog = () => {
    setOldStatus("");
    setNewStatus("");
  };
  //setOldStatus for filter log by status
  const handleChangeOldStatus = (value: string) => {
    setNewStatus("")
    setOldStatus(value);
  };
  //setNewStatus for filter log by status
  const handleChangeNewStatus = (value: string) => {
    console.log("check new: ", value)
    setOldStatus("");
    setNewStatus(value);
  };
  //setStatus for filter course by status
  const handleChange = (value: string) => {
    setStatus(value);
  };
  // set status for chang status
  const handleChangeStatus = async (value: string) => {
    setChangeStatus(value);
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
      width: 300,
      render: (name: string, record: Course) => (
        <>
          <div onClick={() => showModalLogStatus(record._id)} className="text-blue-500">{name}</div>
        </>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',

    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Course) => (
        <>
          <div className="flex justify-between">
            <Tag color={getColor(status)}
            >
              {status}
            </Tag>
            {(status !== "waiting_approve" && status !== "reject") && <EditOutlined onClick={() => showModalChangeStatus(status, record._id)} className="text-blue-500" />}
          </div>
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
      {/* modal log status */}
      <Modal
        width={1200}
        title="Log Status"
        open={openLogStatus}
        onOk={handleOkLogStatus}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          {/* Filter all log  */}
          <Button onClick={handleAllLog} type="primary">All log</Button>
          {/* Filter log by old status */}
          <Select
            defaultValue="Filter by old status"
            style={{ width: 200 }}
            className="m-5"
            onChange={handleChangeOldStatus}
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
          {/* Filter log by new status */}
          <Select
            defaultValue="Filter by new status"
            style={{ width: 200 }}
            className="m-5"
            onChange={handleChangeNewStatus}
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
          <div>
            {
              logs.map((log, index) => (
                <>
                  <div><span className="text-red-500">time: </span> {index + 1}</div>
                  <div><span className="text-yellow-500">Course name: </span> {log.course_name}</div>
                  <div><span className="text-blue-500">Old status: </span> {log.old_status}</div>
                  <div><span className="text-blue-500">New status: </span>{log.new_status}</div>
                  <div><span className="text-blue-500">Comment:</span> {log.comment}</div>
                  <div className="border-t-2 my-5"></div>
                </>
              ))
            }
          </div>

        </div>
      </Modal>
      {/* modal change status */}
      <Modal
        title="Change Status"
        open={openChangeStatus}
        onOk={handleOkChangeStatus}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="text-center">
          <p>Status: </p>
          <Select
            defaultValue={statusDefaultChange}
            style={{ width: 200 }}
            className="my-5"
            onChange={handleChangeStatus}
            options={[
              {
                options: [
                  { label: <span>new</span>, value: 'new' },
                  { label: <span>waiting_approve</span>, value: 'waiting_approve' },
                  { label: <span>active</span>, value: 'active' },
                  { label: <span>inactive</span>, value: 'inactive' },
                ],
              },
            ]}
          />
        </div>
      </Modal>
      {/* modal delete course */}
      <Modal
        title="Delete Course"
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
          {/* filter course by status */}
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