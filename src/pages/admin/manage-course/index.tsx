import { DeleteOutlined, EyeOutlined, HomeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Image, Modal, Table, TableColumnsType, TablePaginationConfig } from "antd";
import { API_GET_COURSE } from "../../../consts";
import axiosInstance from "../../../services/api";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Course {
  _id: string;
  name: string;
  status: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  image_url?: string;
  video_url?: string;
  category_name: string;
  user_name: string;
  session_count: number;
}

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
      const response = await axiosInstance.post(API_GET_COURSE, {
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
      console.error("Error fetching courses: ", error);
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
      width: "100",
      dataIndex: "name",
      key: "name",
      fixed: "left",
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
      defaultSortOrder: "descend",
      sorter: (a: Course, b: Course) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (date: string) => format(new Date(date), "dd/MM/yyyy", { locale: vi }),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      defaultSortOrder: "descend",
      sorter: (a: Course, b: Course) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      render: (date: string) => format(new Date(date), "dd/MM/yyyy", { locale: vi }),
    },
    {
      title: "Action",
      key: "action",
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
  const formatVND = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div>
      <Modal
        title={
          <span
            className="text-2xl font-bold flex justify-center text-amber-700"
          >
            {selectedCourse ? selectedCourse.name : ""}
          </span>
        }
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
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
              <span className="text-base font-bold">Dicount: </span>
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
              <span className="text-base font-bold">Thumnail: </span>
              <Image src={selectedCourse.image_url} alt={selectedCourse.name} style={{ width: "100%" }} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-base font-bold">Course Video :</span>

              <span>
                <Link to={selectedCourse.video_url} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-rose-500" type="primary">
                    <PlayCircleOutlined />
                    Watch Video
                  </Button>
                </Link>
              </span>
            </div>
          </div>
        )}
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
      <h1 className="text-center mb-10">Manage Course</h1>
      <Table columns={columnsCourses} dataSource={courses} pagination={pagination} onChange={handleTableChange} />
    </div>
  );
};

export default AdminManageCourses;
3;
