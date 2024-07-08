import { DeleteOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Image, Table, TableProps, message } from "antd";
import { Course } from "../../../models";
import { API_GET_COURSE } from "../../../consts";
import axiosInstance from "../../../services/api";

const AdminManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
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
        const validCourses = response.data.pageData.filter((course: Course) => validStatuses.includes(course.status));
        setCourses(validCourses);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pageInfo.totalItems,
          current: response.data.pageInfo.pageNum,
          pageSize: response.data.pageInfo.pageSize,
        }));
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses: ", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors[0].message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const columnsCourses: TableProps<Course>["columns"] = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>{price}</span>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      defaultSortOrder: "descend",
      sorter: (a: Course, b: Course) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      defaultSortOrder: "descend",
      sorter: (a: Course, b: Course) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Thumbnail",
      dataIndex: "image_url",
      key: "image_url",
      render: (imageUrl: string) => <Image src={imageUrl} width={50} />,
    },
    {
      title: "Course Video",
      dataIndex: "video_url",
      key: "video_url",
      render: (videoUrl: string) => (
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
      ),
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
      <h1 className="text-center mb-10">Manage Course</h1>
      <Table columns={columnsCourses} dataSource={courses} pagination={pagination} />
    </div>
  );
};

export default AdminManageCourses;
