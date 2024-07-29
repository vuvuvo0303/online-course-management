import { Pagination, Popconfirm, Rate, Table } from "antd";
import type { PaginationProps, TablePaginationConfig, TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Review } from "../../../models";
import { API_GET_REVIEWS, paths } from "../../../consts";
import { format } from "date-fns";
import CustomBreadcrumb from "../../../components/breadcrumb";
import { axiosInstance, deleteReview } from "../../../services";
import LoadingComponent from "../../../components/loading";
const AdminManageFeedbacks: React.FC = () => {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getReviews();
  }, [pagination.pageSize, pagination.current]);

  const getReviews = useCallback(async () => {
    const response = await axiosInstance.post(API_GET_REVIEWS, {
      searchCondition: {
        course_id: "",
        rating: 0,
        is_instructor: false,
        is_rating_order: false,
        is_deleted: false,
      },
      pageInfo: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    setData(response.data.pageData);

      setPagination({
        ...pagination,
        total: response.data.pageInfo.totalItems,
        current: response.data.pageInfo.pageNum,
        pageSize: response.data.pageInfo.pageSize,
      });
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize]);

  const handleDeleteReview = useCallback(
    async (_id: string, reviewer_name: string, course_name: string) => {
      try {
        await axiosInstance.delete(`${API_DELETE_REVIEW}/${_id}`);
        setData((prevReview) => prevReview.filter((review) => review._id === _id));
        message.success(`Review of ${reviewer_name} for course ${course_name} deleted successfully.`);
        fetchReviews();
      } catch {
        //
      }
    },
    [fetchReviews]
  );
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);

  const handleTableChange = (pagination: PaginationProps) => {
    const newPagination: { current: number; pageSize: number; total: number } = {
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    };

    setPagination(newPagination);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };
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
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled allowHalf defaultValue={rating} />,
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
      title: "Action",
      key: "action",
      render: (record: Review) => (
        <div>
          <Popconfirm
            title="Delete the User"
            description="Are you sure to delete this User?"
            onConfirm={() => deleteReview(record._id, record.reviewer_name, record.course_name, getReviews)}
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
    return (<>
      <LoadingComponent />
    </>)
  }

  return (
    <div>
      <CustomBreadcrumb currentTitle="Manage Review" currentHref={paths.ADMIN_HOME} />
      <Table
        rowKey={(record: Review) => record._id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onChange={handleTableChange}
      />
      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default AdminManageFeedbacks;
