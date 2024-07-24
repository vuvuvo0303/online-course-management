import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance.ts";
import { API_GET_PAYOUTS, API_UPDATE_STATUS_PAYOUT, paths } from "../../../consts/index.ts";
import {
  Breadcrumb,
  Button,
  Input,
  Pagination,
  PaginationProps,
  Select,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  Tag,
  message,
} from "antd";
import { format } from "date-fns";
import { HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Payout } from "models/Payout.ts";
import useDebounce from "../../../hooks/useDebounce.ts";

const AdminManagePayouts: React.FC = () => {
  const [dataPayouts, setDataPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearch = useDebounce(searchText, 500);
  const [statusFilter, setStatusFilter] = useState<string>("request_payout");

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const getPayouts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_GET_PAYOUTS, {
        searchCondition: {
          payout_no: debouncedSearch,
          instructor_id: "",
          status: statusFilter ? statusFilter : ["request_payout", "completed"],
          is_delete: false,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      setDataPayouts(response.data.pageData);
      setPagination({
        ...pagination,
        total: response.data.pageInfo.totalItems,
        current: response.data.pageInfo.pageNum,
        pageSize: response.data.pageInfo.pageSize,
      });
    } catch (error) {
      console.error("Error fetching payouts:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, pagination.current, pagination.pageSize, statusFilter]);

  useEffect(() => {
    getPayouts();
  }, [getPayouts]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axiosInstance.put(`${API_UPDATE_STATUS_PAYOUT}/${id}`, { status });
      message.success(`Payout status updated to ${status}`);
      getPayouts();
    } catch (error) {
      message.error("Failed to update payout status");
    }
  };

  const handleTableChange = (pagination: PaginationProps) => {
    setPagination({
      ...pagination,
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    });
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
  };

  const handleStatus = (value: string) => {
    setStatusFilter(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
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
      width: "20%",
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
      render: (balance_instructor_paid: number) => (
        <>{balance_instructor_paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</>
      ),
    },
    
    {
      title: "Instructor Receive",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      render:(balance_instructor_received:number) => <>{balance_instructor_received.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</>
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
  ];

  // Check if there are any records with status "request_payout"
  const hasRequestPayout = dataPayouts.some((payout) => payout.status === "request_payout");

  if (hasRequestPayout) {
    columns.push({
      title: "Action",
      key: "action",
      width: "20%",
      render: (record: Payout) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleStatusChange(record._id, "completed")}>
            Completed
          </Button>
          <Button type="primary" danger onClick={() => handleStatusChange(record._id, "rejected")}>
            Rejected
          </Button>
        </div>
      ),
    });
  }

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
              title: "Manage Payouts",
            },
          ]}
        />
      </div>
      <Space className="flex flex-wrap mb-4">
        <Input.Search
          placeholder="Search By Payout No"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-50"
          enterButton={<SearchOutlined className="text-white" />}
        />
        <Select
          placeholder="Select Status"
          optionFilterProp="children"
          onChange={handleStatus}
          value={statusFilter}
          className="w-full md:w-34 mt-2 md:mt-0 md:ml-2"
        >
          <Select.Option value="request_payout">Request Payout</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
        </Select>
      </Space>

      <Table
        rowKey={(record: Payout) => record._id}
        columns={columns}
        dataSource={dataPayouts}
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

export default AdminManagePayouts;
