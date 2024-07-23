import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance.ts";
import { API_GET_PURCHASE_BY_ADMIN, paths } from "../../../consts";
import { Payment } from "../../../models";
import {
  Breadcrumb,
  Button,
  Pagination,
  PaginationProps,
  Spin,
  Table,
  TableColumnsType,
  TablePaginationConfig,
} from "antd";
import { format } from "date-fns";
import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
const AdminPurchases: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [data, setData] = useState<Payment[]>([]);
  const fetchPayment = useCallback(async () => {
    try {
      const response = await axiosInstance.post(API_GET_PURCHASE_BY_ADMIN, {
        searchCondition: {
          purchase_no: "",
          cart_no: "",
          course_id: "",
          status: "",
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });
      setData(response.data.pageData);

      setPagination({
        ...pagination,
        total: response.data.pageInfo.totalItems,
        current: response.data.pageInfo.pageNum,
        pageSize: response.data.pageInfo.pageSize,
      });
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayment();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const columns: TableColumnsType<Payment> = [
    {
      title: "Purchase Name",
      dataIndex: "purchase_no",
      key: "purchase_no",
      width: "20%",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: "20%",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      width: "10%",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (record: Payment) => (
        <div>
          <EditOutlined className="hover:cursor-pointer text-blue-400 hover:opacity-60" style={{ fontSize: "20px" }} />
        </div>
      ),
    },
  ];
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
  return (
    <div>
      <div className="flex justify-between">
        <Breadcrumb
          className="py-2"
          items={[
            {
              title: <HomeOutlined />,
            },
            {
              href: paths.ADMIN_HOME,
              title: (
                <>
                  <UserOutlined />
                  <span>Admin</span>
                </>
              ),
            },
            {
              title: "Manage Payment",
            },
          ]}
        />
        <div className="py-2">
          <Button type="primary">Add New Blogs</Button>
        </div>
      </div>
      <Table
        columns={columns}
        onChange={handleTableChange}
        pagination={false}
        dataSource={data}
        rowKey={(record: Payment) => record._id}
      />
      ;
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

export default AdminPurchases;
