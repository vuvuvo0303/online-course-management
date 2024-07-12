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
import {API_COURSE_STATUS, getColor} from "../../../consts";
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
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("All Categories");

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('')
  const [status, setStatus] = useState<string>('new');
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });


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
          setCourses(res.data.pageData);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false)
      }
    };
    fetchCourses();
  }, [fetchCourses]);

  const handleSearch = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
    fetchCourses();
  }, [fetchCourses]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleChangeStatus = async (value: string) => {
    setChangeStatus(value);
  };

  const showModalChangeStatus = (course_id: string) => {
    setOpenChangeStatus(true);
    setCourseId(course_id);
  };

  const handleOkChangeStatus = async () => {
    try {
      await axiosInstance.put(API_COURSE_STATUS,
        {
          "course_id": courseId,
          "new_status": changeStatus,
          "comment": "This course not match for approve. Please review session and lesson in this course!"
        }
      )
      setCourses(courses.filter(course => course._id != courseId))
    } catch (error) {
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

  // Lọc các danh mục trùng lặp
  const uniqueCategoriesMap = new Map();
  courses.forEach(course => {
    if (!uniqueCategoriesMap.has(course.category_name)) {
      uniqueCategoriesMap.set(course.category_name, {
        category_id: course.category_id,
        category_name: course.category_name,
      });
    }
  });

  const uniqueCategories = Array.from(uniqueCategoriesMap.values());
  
  // Thêm tùy chọn "All Categories"
  uniqueCategories.unshift({ category_id: "", category_name: "All Categories" });

  const handleCategoryChange = (categoryName: string) => {
    const category = uniqueCategories.find(c => c.category_name === categoryName);
    setCategoryId(category && category.category_name !== "All Categories" ? category.category_id : undefined);
    setSelectedCategoryName(categoryName);
    handleSearch();
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
        <Input.Search
          placeholder="Search By Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Select
          showSearch
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={handleCategoryChange}
          value={selectedCategoryName}
          style={{ width: 200 }}
        >
          {uniqueCategories.map((category) => (
            <Select.Option key={category.category_id} value={category.category_name}>
              {category.category_name}
            </Select.Option>
          ))}
        </Select>
      </Space>
      <h1 className="text-center mb-10">Manage Course</h1>
      <Table
        columns={columnsCourses}
        dataSource={courses}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default AdminManageCourses;
