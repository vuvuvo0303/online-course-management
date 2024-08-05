import React, { useCallback, useEffect, useState } from "react";
import { getColorPayout } from "../../../consts";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  PaginationProps,
  Select,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Payout, Transaction } from "../../../models";
import { useDebounce } from "../../../hooks";
import { CustomBreadcrumb, LoadingComponent } from "../../../components";
import { getPayouts, updateStatusPayout } from "../../../services";
import { formatCurrency, formatDate, renderPayoutStatus } from "../../../utils";

const AdminManagePayouts: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const [dataPayouts, setDataPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearch = useDebounce(searchText, 500);
  const [statusFilter, setStatusFilter] = useState<string>("request_payout");
  const [dataStatusPayout, setDataStatusPayout] = useState<{ id: string; status: string }>({ id: "", status: "" });
  const [comment, setComment] = useState<string>("");
  // modal to show reject's comment request payout
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = (id: string, status: string) => {
    setOpen(true);
    setDataStatusPayout({ id, status });
  };

  const toggleModal = (idx: number, target: boolean, transactions?: Transaction[]) => {
    if (transactions) {
      setTransactions(transactions);
    }
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const handleOk = async () => {
    if (comment != "" && dataStatusPayout.status === "rejected") {
      setLoading(true);
      await handleUpdateStatus(dataStatusPayout.id, dataStatusPayout.status, comment);
      setComment("");
    } else if (dataStatusPayout.status === "completed") {
      setLoading(true);
      await handleUpdateStatus(dataStatusPayout.id, dataStatusPayout.status, comment);
      setComment("");
      await getPayouts();
    } else {
      message.error("Please Enter Comment!");
      return;
    }
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const fetchPayouts = useCallback(async () => {
    setLoading(true);
    try {
      const responsePayouts = await getPayouts(
        debouncedSearch,
        "",
        statusFilter,
        false,
        false,
        pagination.current,
        pagination.pageSize
      );

      setDataPayouts(responsePayouts.data.pageData);
      setPagination({
        ...pagination,
        total: responsePayouts.data.pageInfo.totalItems,
        current: responsePayouts.data.pageInfo.pageNum,
        pageSize: responsePayouts.data.pageInfo.pageSize,
      });
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, pagination.current, pagination.pageSize, statusFilter]);

  useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  if (loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  const handleTableChange = async (pagination: PaginationProps) => {
    setPagination({
      ...pagination,
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    });
    await fetchPayouts();
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
  };

  const handleStatus = async (value: string) => {
    setStatusFilter(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const columns: TableColumnsType<Payout> = [
    {
      title: "Payout No",
      dataIndex: "transactions",
      key: "transactions",
      width: "15%",
      render: (transactions: Transaction[], record: Payout) => (
        <div onClick={() => toggleModal(0, true, transactions)} className="text-blue-500 cursor-pointer">
          {record.payout_no}
        </div>
      ),
    },
    {
      title: "Instructor Email",
      dataIndex: "instructor_email",
      key: "instructor_email",
      width: "15%",
    },
    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
      render: (balance_origin: number) => <>{formatCurrency(balance_origin)}</>
    },
    {
      title: "Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      width: "15%",
      render: (balance_instructor_paid: number) => <>{formatCurrency(balance_instructor_paid)}</>,
    },

    {
      title: "Instructor Receive",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      width: "15%",
      render: (balance_instructor_received: number) => <>{formatCurrency(balance_instructor_received)}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: string) => (
        <Tag color={getColorPayout(status)}>{renderPayoutStatus(status)}</Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: Date) => formatDate(created_at),
    },
  ];

  // Check if there are any records with status "request_payout"
  const hasRequestPayout = dataPayouts.some((payout) => payout.status === "request_payout");

  if (hasRequestPayout) {
    columns.push({
      title: "Action",
      key: "action",
      width: "20%",
      render: (_: unknown, record: Payout) => (
        <>
          {record.status === "request_payout" && (
            <div className="flex gap-2">
              <Button type="primary" onClick={() => handleUpdateStatus(record._id, "completed", "")}>
                Completed
              </Button>
              <Button type="primary" danger onClick={() => showModal(record._id, "rejected")}>
                Rejected
              </Button>
            </div>
          )}
        </>
      ),
    });
  }

  const handleUpdateStatus = async (id: string, status: string, comment: string) => {
    setLoading(true);
    try {
      await updateStatusPayout(id, status, comment);
      message.success(`Change Payout Status To ${status === "completed" ? "Completed" : "Rejected"} Successfully`);
      await fetchPayouts();
    } finally {
      setLoading(false)
    }
  };

  const handleSaveComment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSearchText= (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const columnsTransactions: TableProps["columns"] = [
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "craeted_at",
      render: (created_at: string) => formatDate(created_at),
    },
  ];

  return (
    <div>
      <Modal
        title="Transactions"
        open={isModalOpen[0]}
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        // classNames={classNames}
        footer={null}
      >
        <Table rowKey="_id" dataSource={transactions} pagination={false} columns={columnsTransactions} />
      </Modal>
      <Modal title="Reason Reject" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <Form>
          <Form.Item
            label="Comment"
            name="Comment"
            rules={[{ required: true, message: "Please provide the reason for rejection" }]}
          >
            <Input.TextArea value={comment} onChange={handleSaveComment} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-between">
        <CustomBreadcrumb />
      </div>
      <Space className="flex flex-wrap mb-4">
        <Input.Search
          placeholder="Search By Payout No"
          value={searchText}
          onChange={handleSearchText}
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
          <Select.Option value="rejected">Rejected</Select.Option>
        </Select>
      </Space>

      <Table
        rowKey="_id"
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
