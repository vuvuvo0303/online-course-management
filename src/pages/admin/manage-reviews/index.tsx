import { Breadcrumb, message, Pagination, Popconfirm, Rate, Table } from "antd";
import type { TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, HomeOutlined } from "@ant-design/icons";
import { Review } from "../../../models";
import axiosInstance from "../../../services/axiosInstance.ts";
import { API_DELETE_REVIEW, API_GET_REVIEWS, paths } from "../../../consts";
import { format } from "date-fns";


const AdminManageReviews: React.FC = () => {
  const [dataReviews, setDataReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [pagination,] = useState({
    pageNum: 1,
    pageSize: 10,
    totalItems: 0
  });

  useEffect(() => {

    getReviews();
  }, [pagination.pageSize, pagination.pageNum]);


  const getReviews = useCallback(async () => {
    try {
      const response = await axiosInstance.post(API_GET_REVIEWS,
        {
          searchCondition: {
            course_id: "",
            rating: 0,
            is_instructor: false,
            is_rating_order: false,
            is_deleted: false
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10
          }
        }
      );
      setDataReviews(response.data.pageData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, []);


  const handleDeleteReview = useCallback(
    async (_id: string, reviewer_name: string, course_name: string) => {
      try {
        await axiosInstance.delete(`${API_DELETE_REVIEW}/${_id}`);
        setDataReviews(prevReview => prevReview.filter(review => review._id === _id));
        message.success(`Review of ${reviewer_name} for course ${course_name} deleted successfully.`);
        getReviews();
      } catch {
        //
      }
    }
    , [getReviews])

  const columns: TableProps<Review>["columns"] = [
    {
      title: "User Name",
      dataIndex: "reviewer_name",
      key: "reviewer_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "title",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: "30%",
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
      render: (updatedDate: Date) => format(new Date(updatedDate), "dd/MM/yyyy"),
      width: "10%",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled allowHalf defaultValue={rating} />,
    },
    {
      title: "Action",
      key: "action",
      render: (record: Review) => (
        <div>
          <Popconfirm
            title="Delete the User"
            description="Are you sure to delete this User?"
            onConfirm={() => handleDeleteReview(record._id, record.reviewer_name, record.course_name)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60"
              style={{ fontSize: "20px" }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (loading) {
    return <p className="text-center">Loading...</p>
  }
  return (
    <div>
      <Breadcrumb
        className="py-2"
        items={[
          {
            title: <HomeOutlined />,
            href: paths.ADMIN_HOME
          },
          {
            title: "Manage Feedbacks",
          },
        ]}
      />
      <Table rowKey={(record: Review) => record._id} columns={columns} dataSource={dataReviews} />
      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.totalItems}
          showTotal={(total) => `Total ${total} items`}
          current={pagination.pageNum}
          pageSize={pagination.pageSize}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default AdminManageReviews;

