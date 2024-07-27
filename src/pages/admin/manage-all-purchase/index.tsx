import { Breadcrumb, Input, Pagination, Select, Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";

import { API_GET_PURCHASE_BY_ADMIN, getColorPurchase } from "../../../consts/index";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../../../hooks";
import { Purchase } from "../../../models/Purchase";


const ManageAllPurchase = () => {
  const [dataSource, setDataSource] = useState<Purchase[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
  const [searchPurchase, setSearchPurchase] = useState<string>("");
  const purchaseNoSearch = useDebounce(searchPurchase, 500);
  const [status, setStatus] = useState<string>("");
  const columns: TableProps<Purchase>["columns"] = [
    { title: "Purchase No", dataIndex: "purchase_no", key: "purchase_no" },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Instructors Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
    },
    {
      title: "Students Name",
      dataIndex: "student_name",
      key: "student__name",
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      render: (price_paid: number) => {
        return price_paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color={getColorPurchase(status)}>{status}</Tag>,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => format(new Date(created_at), "dd/MM/yyyy"),
      width: "10%",
    },

  ];

  const fetchPurchase = useCallback(async () => {
    try {
      const response = await axiosInstance.post(API_GET_PURCHASE_BY_ADMIN, {
        searchCondition: {
          purchase_no: purchaseNoSearch,
          cart_no: "",
          course_id: "",
          status: status,
          is_delete: false,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      if (response.data && response.data.pageData) {
        const { pageData, pageInfo } = response.data;
        setDataSource(pageData);
        setPagination((prev) => ({
          ...prev,
          total: pageInfo?.totalItems || response.data.length,
          current: pageInfo?.pageNum || 1,
          pageSize: pageInfo?.pageSize || response.data.length,
        }));
      } else {
        setDataSource([]);
      }
    } catch (error) {
      console.error("Failed to fetch purchase data:", error);
    }
  }, [pagination.current, pagination.pageSize, purchaseNoSearch, status]);

  useEffect(() => {
    fetchPurchase();
  }, [pagination.current, pagination.pageSize, purchaseNoSearch, status]);

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };
  const handleChangeStatus = async (value: string) => {
    setStatus(value);
  };
  return (
    <div>

      <Breadcrumb className="p-3">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manage All Purchase</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex items-center mb-3">
        <Space>
          <Input.Search
            placeholder="Search By Purchase No"
            value={searchPurchase}
            onChange={(e) => setSearchPurchase(e.target.value)}
            className="p-2 "
            style={{ width: 250 }}
            enterButton={<SearchOutlined className="text-white" />}
          />
          <Select
            placeholder="Select Status"
            optionFilterProp="children"
            onChange={handleChangeStatus}
            value={status}
            className="w-full md:w-32 mt-2 md:mt-0 md:ml-2"
          >
            <Select.Option value="">All Status</Select.Option>
            <Select.Option value="new">New</Select.Option>
            <Select.Option value="request_paid">Request paid</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}

        pagination={false}
        onChange={handleTableChange}

        rowKey="_id"
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

export default ManageAllPurchase;
