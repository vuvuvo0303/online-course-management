import { Pagination, Popconfirm, Rate, Table } from "antd";
import type { PaginationProps, TablePaginationConfig, TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Review } from "../../../models";
import { CustomBreadcrumb, LoadingComponent } from "../../../components";
import { deleteReview, getAllReviews } from "../../../services";
import { formatDate } from "../../../utils";
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
    setLoading(true);
    try {
      const responseReview = await getAllReviews("", 0, false, false, false, pagination.current, pagination.pageSize)
      setData(responseReview.data.pageData);

      setPagination({
        ...pagination,
        total: responseReview.data.pageInfo.totalItems,
        current: responseReview.data.pageInfo.pageNum,
        pageSize: responseReview.data.pageInfo.pageSize,
      });
    } finally {
      setLoading(false);
    }
  }, []);


  const handleTableChange = (pagination: PaginationProps) => {
    const newPagination: { current: number; pageSize: number; total: number } = {
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    };

    setPagination(newPagination);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
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
      render: (created_at: Date) => formatDate(created_at),
    },

    {
      title: "Updated Date",
      dataIndex: "updated_at",
      render: (updatedDate: Date) => formatDate(updatedDate),
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Review) => (
        <div>
          <Popconfirm
            title="Delete the Review"
            description="Are you sure to delete this Review?"
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
      <CustomBreadcrumb />
      <Table
        rowKey="_id"
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
