import { DownOutlined, EditOutlined, EyeOutlined, HomeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Image,
  Input, MenuProps,
  Modal,
  Select,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  Tag
} from "antd";
import { getColor } from "../../../consts";
import axiosInstance from "../../../services/axiosInstance.ts";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Course } from "../../../models";
import { toast } from "react-toastify";

const AdminManageCourses: React.FC = () => {
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [changeStatus, setChangeStatus] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('')
  const [status, setStatus] = useState<string>('new');
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // const fetchCourses = useCallback(async () => {

  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.post(API_GET_COURSE, {
  //       pageInfo: {
  //         pageNum: pagination.current,
  //         pageSize: pagination.pageSize,
  //       },
  //       searchCondition: {
  //         status: status,
  //       },
  //     });

  //     if (response.data && response.data.pageData) {
  //       setCourses(response.data.pageData);
  //       setPagination((prev) => ({
  //         ...prev,
  //         total: response.data.pageInfo.totalItems,
  //       }));
  //     } else {
  //       throw new Error("Failed to fetch courses");
  //     }
  //   } catch (error) {
  //     setError("An unexpected error occurred.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [pagination.current, pagination.pageSize]);

  // useEffect(() => {
  //   fetchCourses();
  // }, [fetchCourses]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.post(`/api/course/search`, {
          "searchCondition": {
            "keyword": "",
            "category": "",
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
  }, [status])



  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleChangeStatus = async (value: string) => {
    console.log("check status: ", value)
    setChangeStatus(value);
    console.log("check status: ", status)
  };

  const showModalChangeStatus = (course_id: string) => {
    setOpenChangeStatus(true);
    setCourseId(course_id);
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

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenChangeStatus(false);
  };

  const columnsCourses: TableColumnsType<Course> = [
    {
      title: "Title",
      width: "50",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Course) => (
        <>
          <div className="flex justify-between">
            <Tag color={getColor(status)}
            >
              {status}
            </Tag>
            {
              status === "waiting_approve" ?
                (
                  <EditOutlined onClick={() => showModalChangeStatus(record._id)} className="text-blue-500" />
                )
                :
                ""
            }
          </div>
        </>
      )
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy", { locale: vi }),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy", { locale: vi }),
    },
    {
      title: "Action",
      key: "action",
      width: "15",
      render: (record: Course) => (
        <>
          <Link to={`/admin/manage-course/${record._id}/manage-session`}>
            <EyeOutlined className="text-purple-500 m-2" />
          </Link>
        </>
      ),
    },
  ];

  if (loading) {
    return <p className="flex justify-center items-center">Loading ...</p>;
  }

  if (error) {
    return <p className="flex justify-center items-center text-red-500">{error}</p>;
  }

  const showModal = (record: Course) => {
    setSelectedCourse(record);
    setIsModalVisible(true);
  };

  

  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "All",
    },
    {
      key: "2",
      label: "Admins",
    },
    {
      key: "3",
      label: "Instructors",
    },
    {
      key: "4",
      label: "Students",
    },
  ];
  // set status for filter course by status
  const handleChangeFilterStatus = (value: string) => {
    setStatus(value);
  };

  return (
    
    <div>
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
            defaultValue="waiting_approve"
            style={{ width: 200 }}
            className="my-5"
            onChange={handleChangeStatus}
            options={[
              {
                options: [
                  { label: <span>approve</span>, value: 'approve' },
                  { label: <span>reject</span>, value: 'reject' },
                ],
              },
            ]}
          />
        </div>
      </Modal>

      <Modal
        title={
          <span className="text-2xl font-bold flex justify-center text-amber-700">
            {selectedCourse ? selectedCourse.name : ""}
          </span>
        }
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedCourse && (
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-base font-bold">Course's Instructor: </span>
              {selectedCourse.user_name}
            </div>
            <div>
              <span className="text-base font-bold">Price: </span>
              {formatVND(selectedCourse.price)}
            </div>
            <div>
              <span className="text-base font-bold">Discount: </span>
              {selectedCourse.discount}%
            </div>
            <div>
              <span className="text-base font-bold">Category Name: </span>
              {selectedCourse.category_name}
            </div>
            <div>
              <span className="text-base font-bold">Session: </span>
              {selectedCourse.session_count}
            </div>
            <div>
              <span className="text-base font-bold">Thumbnail: </span>
              <Image src={selectedCourse.image_url} alt={selectedCourse.name} style={{ width: "100%" }} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-base font-bold">Course Video:</span>
              <span>
                <Link to={selectedCourse.video_url ?? "https://youtube.com"} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-500" type="primary">
                    <PlayCircleOutlined />
                    Watch Video
                  </Button>
                </Link>
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <Button type="primary" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        </div>
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

      <Space style={{ marginTop: 32, marginBottom: 16 }}>
        <Input
          placeholder="Search..."
          style={{ width: 200 }}
        />
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["1"],
          }}
        >
          <Button>
            <Space>
              Filter Categories
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Select
          defaultValue="new"
          style={{ width: 200 }}
          className="m-5"
          onChange={handleChangeFilterStatus}
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
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ["1"],
          }}
        >
          <Button>
            <Space>
              Filter Parent Categories
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Button >Clear filters</Button>
        <Button >Clear filters and sorters</Button>
      </Space>
      <h1 className="text-center mb-10">Manage Course</h1>
      <Table columns={columnsCourses} dataSource={courses} pagination={pagination} onChange={handleTableChange} />
    </div>
  );
};

export default AdminManageCourses;
