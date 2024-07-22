import { EditOutlined, EyeOutlined, HomeOutlined, PlayCircleOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  Tag,
} from "antd";
import { API_COURSE_STATUS, API_GET_COURSES, getColor } from "../../../consts";
import axiosInstance from "../../../services/axiosInstance.ts";
import { format } from "date-fns";
import { Course } from "../../../models";
import TextArea from "antd/es/input/TextArea";
import { useDebounce } from "../../../hooks";
const AdminManageCourses: React.FC = () => {
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [changeStatus, setChangeStatus] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("All Categories");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status");
  const [comment, setComment] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [status, setStatus] = useState<string>("new");
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleSaveComment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const fetchCourses = useCallback(async () => {
    try {
      const params = {
        searchCondition: {
          keyword: debouncedSearchTerm,
          category_id: categoryId,
          status: status,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      };
      const response = await axiosInstance.post(API_GET_COURSES, params);
      if (response.data) {
        setCourses(response.data.pageData || response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pageInfo?.totalItems || response.data.length,
          current: response.data.pageInfo?.pageNum || 1,
          pageSize: response.data.pageInfo?.pageSize || response.data.length,
        }));
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  }, [categoryId, pagination.current, pagination.pageSize, searchText, status, debouncedSearchTerm]);

  useEffect(() => {
    fetchCourses();
  }, [categoryId, pagination.current, pagination.pageSize, status, searchText, debouncedSearchTerm]);

  const handleSearch = () => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
    fetchCourses();
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };
  const handleChangeStatus = async (value: string) => {
    setChangeStatus(value);
  };

  const showModalChangeStatus = (course_id: string) => {
    setOpenChangeStatus(true);
    setCourseId(course_id);
  };

  const handleOkChangeStatus = async () => {
    if (!comment) {
      return message.error("Please enter comment");
    }
    try {
      await axiosInstance.put(API_COURSE_STATUS, {
        course_id: courseId,
        new_status: changeStatus,
        comment: comment,
      });
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      //
    }
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

    { title: "Category", dataIndex: "category_name", key: "category_name" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Course) => (
        <>
          <div className="flex justify-between">
            <Tag color={getColor(status)}>{status === "waiting_approve" ? "waiting approve" : status}</Tag>
            {status === "waiting_approve" ? (
              <EditOutlined onClick={() => showModalChangeStatus(record._id)} className="text-blue-500" />
            ) : (
              ""
            )}
          </div>
        </>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
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

  const uniqueCategoriesMap = new Map();
  courses.forEach((course) => {
    if (!uniqueCategoriesMap.has(course.category_name)) {
      uniqueCategoriesMap.set(course.category_name, {
        category_id: course.category_id,
        category_name: course.category_name,
      });
    }
  });

  const uniqueCategories = Array.from(uniqueCategoriesMap.values());
  uniqueCategories.unshift({ category_id: "", category_name: "All Categories" });

  const handleCategoryChange = (categoryName: string) => {
    const category = uniqueCategories.find((c) => c.category_name === categoryName);
    const newCategoryId = category && category.category_name !== "All Categories" ? category.category_id : undefined;
    setCategoryId(newCategoryId);
    setSelectedCategoryName(categoryName);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };
  const handleStatusChange = (value: string) => {
    setStatus(value);
    setSelectedStatus(value || "All Statuses");
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };
  return (
    <div className="container mx-auto p-4">
      {/* Modal Change Status */}
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
                  { label: <span>approve</span>, value: "approve" },
                  { label: <span>reject</span>, value: "reject" },
                ],
              },
            ]}
          />
        </div>
        <Form.Item label="Comment" name="comment" rules={[{ required: true, message: "Please enter comment!" }]}>
          <TextArea value={comment} onChange={handleSaveComment} />
        </Form.Item>
      </Modal>

      {/* Modal Course Details */}
      <Modal
        title={
          <span className="text-2xl font-bold flex justify-center text-amber-700">
            {selectedCourse ? selectedCourse.name : ""}
          </span>
        }
        open={isModalVisible}
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

      {/* Breadcrumb */}
      <Breadcrumb
        className="py-3"
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

      {/* Filters and Search */}
      <Space className="flex flex-wrap justify-between mb-4">
        <Input.Search
          placeholder="Search By Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          className="w-48 md:w-64"
          enterButton={<SearchOutlined className="text-white" />}
        />
        <Select
          showSearch
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={handleCategoryChange}
          value={selectedCategoryName}
          className="w-48 md:w-64"
        >
          {uniqueCategories.map((category) => (
            <Select.Option key={category.category_id} value={category.category_name}>
              {category.category_name}
            </Select.Option>
          ))}
        </Select>

        <Select
          showSearch
          placeholder="Select Status"
          optionFilterProp="children"
          onChange={handleStatusChange}
          value={selectedStatus}
          className="w-48 md:w-64"
        >
          <Select.Option value="">All Status</Select.Option>
          <Select.Option value="new">New</Select.Option>
          <Select.Option value="waiting_approve">Waiting for Approve</Select.Option>
          <Select.Option value="approve">Approved</Select.Option>
          <Select.Option value="reject">Rejected</Select.Option>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
        </Select>
      </Space>
      <Table columns={columnsCourses} rowKey={(record: Course) => record._id} dataSource={courses} pagination={false} onChange={handleTableChange} />
      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.total}
          showTotal={(total) => `Total ${total} items`}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default AdminManageCourses;
