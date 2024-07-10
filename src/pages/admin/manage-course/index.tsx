import {DeleteOutlined, DownOutlined, EyeOutlined, HomeOutlined, PlayCircleOutlined} from "@ant-design/icons";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Image,
  Input, MenuProps,
  Modal,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig
} from "antd";
import {API_GET_COURSES} from "../../../consts";
import axiosInstance from "../../../services/axiosInstance.ts";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {Course} from "../../../models";

const AdminManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_GET_COURSES, {
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
        searchCondition: {
          status: "new",
        },
      });

      if (response.data && response.data.pageData) {
        setCourses(response.data.pageData);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pageInfo.totalItems,
        }));
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
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
    },

    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => format(new Date(date), "dd/MM/yyyy", { locale: vi }),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date: string) => format(new Date(date), "dd/MM/yyyy", { locale: vi }),
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
          <DeleteOutlined className="text-red-500 m-2" />
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
  return (
    <div>
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
          <Button type="primary"  onClick={() => setIsModalVisible(false)}>
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
