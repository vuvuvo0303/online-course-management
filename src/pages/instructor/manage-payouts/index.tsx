import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance.ts";
import { API_GET_PAYOUTS, paths } from "../../../consts/index.ts";
import { Breadcrumb, Button, Table, TableColumnsType, Tag } from "antd";
import { format } from "date-fns";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Payout } from "models/Payout.ts";

const InstructorManagePayouts: React.FC = () => {
  const [data, setData] = useState<Payout[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
  }>({
    current: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState<number>(0);

  const fetchPayouts = useCallback(
    async (pageNum: number, pageSize: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.post(API_GET_PAYOUTS, {
          searchCondition: {
            payout_no: "",
            instructor_id: "",
            status: "",
            is_delete: false,
          },
          pageInfo: {
            pageNum,
            pageSize,
          },
        });
        setData(response.data.pageData);
        setTotal(response.data.totalCount);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchPayouts(pagination.current, pagination.pageSize);
  }, [fetchPayouts, pagination]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const columns: TableColumnsType<Payout> = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
      width: "15%",
      render: (text) => <Button type="link">{text}</Button>,
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      width: "10%",
    },
    {
      title: "Instructor Email",
      dataIndex: "instructor_email",
      key: "instructor_email",
      width: "10%",
    },
    {
      title: "Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      width: "10%",
    },
    {
      title: "Instructor Receive",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: string) => (
        <Tag
          color={
            status === "new"
              ? "blue"
              : status === "request_payout"
              ? "orange"
              : status === "completed"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "10%",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
    },
  ];

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
              href: paths.INSTRUCTOR_HOME,
              title: (
                <>
                  <UserOutlined />
                  <span>Instructor</span>
                </>
              ),
            },
            {
              title: "Manage Payouts",
            },
          ]}
        />
      </div>
      {error && <div>{error}</div>}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record: Payout) => record._id}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: total,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default InstructorManagePayouts;
