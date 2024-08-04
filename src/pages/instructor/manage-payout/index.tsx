import { Payout, Transaction } from "../../../models";
import { useEffect, useState } from "react";
import { getPayouts, updateStatusPayout } from "../../../services";

import {
  Table,
  TableProps,
  Tag,
  Button,
  Modal,
  message,
  Input,
  TablePaginationConfig,
  PaginationProps,
  Pagination,
  Select,
  Space,
} from "antd";
import { getColorPayout } from "../../../consts/index";
import { createStyles } from "antd-style";
import { LoadingComponent, CustomBreadcrumb } from "../../../components";
import { useDebounce } from "../../../hooks";
import { SearchOutlined } from "@ant-design/icons";
import { formatCurrency, formatDate } from "../../../utils";
const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    background: token.blue1,
    padding: token.paddingSM,
  },
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-modal-header": {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  "my-modal-footer": {
    color: token.colorPrimary,
  },
  "my-modal-content": {
    border: "1px solid #333",
  },
}));

const InstructorManagePayout = () => {
  const [searchPayout, setSearchPayout] = useState<string>("");
  const payoutNoSearch = useDebounce(searchPayout, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const { styles } = useStyle();
  const [statusPayout, setStatusPayout] = useState<string>("new");
  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
  };

  useEffect(() => {
    getPayoutsByInstructor();
  }, [statusPayout, payoutNoSearch, pagination.current, pagination.pageSize]);

  const getPayoutsByInstructor = async () => {
    // no loading for search
    if (payoutNoSearch != "") {
      const response = await getPayouts(payoutNoSearch, "", statusPayout, true, false, 1, 10);
      setPayouts(response.data.pageData);
      setPagination({
        ...pagination,
        total: response.data.pageInfo.totalItems,
        current: response.data.pageInfo.pageNum,
        pageSize: response.data.pageInfo.pageSize,
      });
      setLoading(false);
    } else {
      const response = await getPayouts(payoutNoSearch, "", statusPayout, true, false, 1, 10);
      setPayouts(response.data.pageData);
      setPagination({
        ...pagination,
        total: response.data.pageInfo.totalItems,
        current: response.data.pageInfo.pageNum,
        pageSize: response.data.pageInfo.pageSize,
      });
      setLoading(false);
    }
  };

  const handleRequestPayout = async (payout_id: string, status: string, comment: string) => {
    setLoading(true);
    await updateStatusPayout(payout_id, status, comment);
    message.success(`Send Request Successfully!`);
    getPayoutsByInstructor();
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

  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "transactions",
      key: "transactions",
      width: "20%",
      render: (transactions: Transaction[], record: Payout) => (
        <div onClick={() => toggleModal(0, true, transactions)} className="text-blue-500 cursor-pointer">
          {record.payout_no}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getColorPayout(status)}>{status === "request_payout" ? "request payout" : status}</Tag>
      ),
    },
    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
      render: (balance_origin: number) => <>{formatCurrency(balance_origin)}</>,
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      render: (balance_instructor_paid: number) => <>{formatCurrency(balance_instructor_paid)}</>,
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      render: (balance_instructor_received: number) => <>{formatCurrency(balance_instructor_received)}</>,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (created_at: string) => formatDate(created_at),
    },
    ...(statusPayout === "new" || statusPayout === "rejected"
      ? [
          {
            title: "Action",
            dataIndex: "status",
            key: "action",
            render: (_text: string, record: Payout) => (
              <Button onClick={() => handleRequestPayout(record._id, "request_payout", "")} type="primary">
                Request Payout
              </Button>
            ),
          },
        ]
      : []),
  ];

  const columnsTransactions: TableProps<Transaction>["columns"] = [
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
      key: "created_at",
      render: (created_at: string) => formatDate(created_at),
    },
  ];

  if (loading) {
    return <LoadingComponent />;
  }
  const handleTableChange = async (pagination: PaginationProps) => {
    setPagination({
      ...pagination,
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    });
    await getPayouts();
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
  };

  const handleStatus = async (value: string) => {
    setStatusPayout(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };
  return (
    <>
      <Modal
        title="Transactions"
        open={isModalOpen[0]}
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        footer={null}
        classNames={classNames}
      >
        <Table dataSource={transactions} pagination={false} columns={columnsTransactions} />
      </Modal>
      <div className="container mx-auto px-10">
        <CustomBreadcrumb />
        <Space>
          <Input.Search
            placeholder="Search By Purchase No"
            value={searchPayout}
            onChange={(e) => setSearchPayout(e.target.value)}
            className="p-2"
            style={{ width: 250 }}
            enterButton={<SearchOutlined className="text-white" />}
          />
          {/* <Tabs defaultActiveKey={statusPayout} items={items} onChange={onChange} /> */}
          <Select
            placeholder="Select Status"
            optionFilterProp="children"
            onChange={handleStatus}
            value={statusPayout}
            style={{ width: 200 }}
            
            className="w-full md:w-34 mt-2 md:mt-0 md:ml-2"
          >
            <Select.Option value="new">New</Select.Option>
            <Select.Option value="request_payout">Request Payout</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="rejected">Rejected</Select.Option>
          </Select>
        </Space>

        <Table
          rowKey={(record: Payout) => record._id}
          dataSource={payouts}
          columns={columns}
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
    </>
  );
};

export default InstructorManagePayout;
