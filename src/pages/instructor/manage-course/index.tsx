import { DeleteOutlined, EditOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Empty, Form, Input, Modal, Select, Table, TableProps, Tag } from "antd";
import { Category, Course, Log } from "../../../models";
import { API_COURSE_LOGS, API_DELETE_COURSE, API_GET_CATEGORIES, API_GET_COURSES, getColor } from "../../../consts";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance.ts";
import TextArea from "antd/es/input/TextArea";
import useDebounce from "../../../hooks/useDebounce";
import { format } from 'date-fns';
const InstructorManageCourses: React.FC = () => {

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [courseId, setCourseId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [course_name, setCourse_name] = useState<string>("");
  const [openLogStatus, setOpenLogStatus] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);
  // Status default of course, before change
  const [statusDefaultChange, setStatusDefaultChange] = useState<string>('');
  //status for filter log by new status
  const [newStatus, setNewStatus] = useState<string>('');
  //status for filter log by old status
  const [oldStatus, setOldStatus] = useState<string>('');
  //keyword for filter log by old status
  const [keywordLogStatus, setKeywordLogStatus] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  //status for filter course by status
  const [status, setStatus] = useState<string>('new');
  //status for change status
  const [changeStatus, setChangeStatus] = useState<string>('new');
  const [cateId, setCateId] = useState<string>('java');
  const [keyword, setKeyword] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [logLoading, setLogLoading] = useState<boolean>(true);
  const debouncedSearchTerm = useDebounce(keyword, 500); // Use debounce hook
  //show delete modal
  const showModal = (_id: string, record: Course) => {
    setOpen(true);
    setModalText(`Do you want to delete course with name "${record.name}"`);
    //set course id that instructor want to delete
    setCourseId(_id);
  };
  //show change status modal
  const showModalChangeStatus = async (status: string, course_id: string, name: string) => {
    setStatusDefaultChange(status)
    setCourseId(course_id);
    setOpenChangeStatus(true);
    setCourse_name(name)
  };
  //show log status modal
  useEffect(() => {
    //fetch logs
    if (courseId) {
      const fetchLog = async () => {
        try {
          setLogLoading(true);
          const res = await axiosInstance.post(API_COURSE_LOGS, {
            "searchCondition": {
              "course_id": courseId,
              "keyword": keywordLogStatus,
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
            setLogs(res.data.pageData.sort((a: { created_at: string }, b: { created_at: string }) => {
              return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            }));
            setLogLoading(false);
          }
        } catch (error) {
          console.log("Error occurred: ", error);
        }
      }
      fetchLog();
    }

  }, [courseId, oldStatus, newStatus, keywordLogStatus]);

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
  //click ok on modal to change status of course
  const handleOkChangeStatus = async () => {
    if (!comment) {
      return toast.error("Please enter comment")
    }
    try {
      await axiosInstance.put(API_COURSE_STATUS,
        {
          "course_id": courseId,
          "new_status": changeStatus,
          "comment": comment
        }
      )
      setComment("");
      toast.success("Change Status Successfully!");
      setCourses(courses.filter(course => course._id != courseId))
    } catch (error) {
      console.log("Error occurred: ", error);
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
      await axiosInstance.delete(`${API_DELETE_COURSE}/${courseId}`)
      toast.success("Delete Successfully!")
      setCourses(courses.filter(course => course._id != courseId))
    } catch (error) {
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
        const response = await axiosInstance.post(API_GET_CATEGORIES,
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
        if (response) {
          setCategories(response.data.pageData);
        }
      } catch (error) {
        //
      }
    };
    fetchCategories();
  }, [])
  //fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.post(API_GET_COURSES, {
          "searchCondition": {
            "keyword": debouncedSearchTerm,
            "category": cateId,
            "status": status,
            "is_deleted": false
          },
          "pageInfo": {
            "pageNum": 1,
            "pageSize": 100
          }
        });
        if (response.data.pageData) {
          setCourses(response.data.pageData);
        }
      } catch (error) {
        //
      } finally {
        setLoading(false)
      }
    };
    fetchCourses();
  }, [status, cateId, debouncedSearchTerm])


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
    console.log("check handleChangeStatus: ", value);
    setChangeStatus(value);
  };

  // setCateId
  const handleCateChange = (value: string) => {
    setCateId(value + "");
  };
  //search course by course name
  const handleSearchLogStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordLogStatus(e.target.value);
  };

  const handleSaveComment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  //search course by course name
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
            {(status !== "waiting_approve" && status !== "reject") &&
              <EditOutlined onClick={() => { showModalChangeStatus(status, record._id, record.name); }} className="text-blue-500" />}
          </div>
        </>
      )
    },
    {
      title: 'Created At ',
      dataIndex: 'created_at',
      key: 'created_at',
      defaultSortOrder: 'descend',
      render: (date: string) => {
        return format(new Date(date), 'dd/MM/yy');
      },
    },
    {
      title: 'Updated At ',
      dataIndex: 'updated_at',
      key: 'updatedDate',
      render: (date: string) => {
        return format(new Date(date), 'dd/MM/yy');
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (_id: string, record: Course) => (
        <>
          {/* <Link to={`/instructor/manage-courses/${_id}`}><Button type="primary">Detail</Button></Link> */}
          {/* <Link to={`/instructor/manage-courses/${_id}/manage-sessions`}><EyeOutlined className="text-purple-500 m-2" /></Link> */}
          <Link to={`/instructor/manage-courses/update-course/${_id}`}><EditOutlined className="mt-2 text-blue-500" /></Link>
          <DeleteOutlined onClick={() => showModal(_id, record)} className="text-red-500 m-2" />
        </>
      )
    },
    {
      title: 'Session',
      dataIndex: 'session_count',
      key: 'session_count',
      render: (session_count: number, record: Course) => (
        <>
          <Link className="text-blue-700" to={`/instructor/manage-courses/${record._id}/manage-sessions`}>{session_count}</Link>
        </>
      )
    },
    {
      title: 'Lesson',
      dataIndex: 'lesson_count',
      key: 'lesson_count',
      render: (lesson_count: number) => (
        <>
          {lesson_count}
        </>
      )
    },
  ];

  const columnsLogs: TableProps["columns"] = [
    {
      title: 'Name',
      dataIndex: 'course_name',
      key: 'course_name',
      width: 200,
    },
    {
      title: 'Old Status',
      dataIndex: 'old_status',
      key: 'old_status',
      render: (old_status: string) => (
        <>
          <Tag color={getColor(old_status)}>
            {old_status === "waiting_approve" ? "waiting approve"
              : old_status
            }
          </Tag>
        </>
      )
    },
    {
      title: 'New Status',
      dataIndex: 'new_status',
      key: 'new_status',
      render: (new_status: string) => (
        <>
          <Tag color={getColor(new_status)}>
            {new_status === "waiting_approve" ? "waiting approve"
              : new_status
            }
          </Tag>
        </>
      )
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment: string) => (
        <>
          <div className="truncate">
            {comment === "" ? <Tag color="red">
              No comment
            </Tag> : comment}
          </div>
        </>
      )
    },
    {
      title: 'Created At ',
      dataIndex: 'created_at',
      key: 'created_at',
      defaultSortOrder: 'descend',
      render: (date: string) => {
        return format(new Date(date), 'dd/MM/yy');
      },
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
          <Input
            placeholder="Search"
            value={keywordLogStatus}
            onChange={handleSearchLogStatus}
            className="m-5"
            style={{ width: 200 }}
          />
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
                  { label: <span>waiting approve</span>, value: 'waiting_approve' },
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
              logLoading === false ?
                (
                  logs && logs.length > 0
                    ?
                    (
                      <Table columns={columnsLogs} dataSource={logs} />
                    )
                    :
                    (
                      <div>
                        <Empty />
                      </div>
                    )
                )
                :
                (
                  <div className="text-center">
                    Loading ...
                  </div>
                )
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
        <div>
          <p className="my-5">Course name: <span className="text-blue-500">{course_name}</span></p>
          <p className="my-5">Current Status: <Tag color={getColor(statusDefaultChange)}>{statusDefaultChange}</Tag></p>
        </div>
        <Form>
          <div className="text-center">
            <Form.Item
              label="Select Status"
              name="new_status"
              rules={[{ required: true, message: 'Please select status to change!' }]}
            >
              <Select
                defaultValue={"choose status to change"}
                style={{ width: 200 }}
                className="my-5"
                onChange={handleChangeStatus}
                options={
                  (statusDefaultChange === "inactive" && [{ label: <span>active</span>, value: 'active' }]) ||
                  (statusDefaultChange === "active" && [{ label: <span>inactive</span>, value: 'inactive' }]) ||
                  (statusDefaultChange === "new" && [
                    { label: <span>waiting approve</span>, value: 'waiting_approve' },
                  ]) ||
                  (statusDefaultChange === "approve" && [
                    { label: <span>active</span>, value: 'active' },
                    { label: <span>inactive</span>, value: 'inactive' },
                  ]) ||
                  []
                }
              />

            </Form.Item>
            <Form.Item
              label="Comment"
              name="comment"
              rules={[{ required: true, message: 'Please enter comment!' }]}
            >
              <TextArea value={comment} onChange={handleSaveComment} />
            </Form.Item>

          </div>
        </Form>
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
      <h1 className="text-center">Manage Courses</h1>

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
                  { label: <span>waiting approve</span>, value: 'waiting_approve' },
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
          <Input.Search
            placeholder="Search"
            value={keyword}
            onChange={handleSearch}
            className="m-5"
            style={{ width: 200 }}
            enterButton={<SearchOutlined className="text-white" />}
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