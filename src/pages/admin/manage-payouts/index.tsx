import React, { useCallback, useEffect, useState } from "react";
import { API_GET_PAYOUTS, paths } from "../../../consts";
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
  Tag,
} from "antd";
import { format } from "date-fns";
import { SearchOutlined } from "@ant-design/icons";
import { Payout } from "models/Payout.ts";
import { useDebounce } from "../../../hooks";
import CustomBreadcrumb from "../../../components/breadcrumb";
import { axiosInstance, updateStatusPayout } from "../../../services";
import LoadingComponent from "../../../components/loading";
import TextArea from "antd/es/input/TextArea";

const AdminManagePayouts: React.FC = () => {
  const [dataPayouts, setDataPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearch = useDebounce(searchText, 500);
  const [statusFilter, setStatusFilter] = useState<string>("request_payout");
  const [dataRejectPayout, setDataRejectPayout] = useState<{ id: string, status: string }>({ id: "", status: "" });
  const [comment, setComment] = useState<string>("");
  // modal to show reject's comment request payout
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = (id: string, status: string) => {
    setOpen(true);
    setDataRejectPayout({ id, status })
  };

  const handleOk = async () => {
    if (comment != "") {
      setLoading(true)
      await handleUpdateStatus(dataRejectPayout.id, dataRejectPayout.status, comment)
      setComment("")
    }
    else {
      message.error("Please Enter Comment!")
    }
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 100);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
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
      //
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, pagination.current, pagination.pageSize, statusFilter]);

  useEffect(() => {
    getPayouts();
  }, [getPayouts]);

  if (loading) {
    return (<>
      <LoadingComponent />
    </>)
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
      render: (balance_instructor_received: number) => <>{balance_instructor_received.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</>
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
          <Button type="primary" onClick={() => handleUpdateStatus(record._id, "completed", "")}>
            Completed
          </Button>
          <Button type="primary" danger onClick={() => showModal(record._id, "completed")}>
            Rejected
          </Button>
        </div>
      ),
    });
  }

  const handleUpdateStatus = async (id: string, status: string, comment: string) => {
    const res = await updateStatusPayout(id, status, comment);
    console.log("payout res: ", res);
    if (res) {
      message.success(`Change Payout Status To ${status === "completed" ? "Completed" : "Rejected"} Successfully`)
      getPayouts();
    }
  }

  const handleSaveComment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Comment" name="Comment">
            <TextArea value={comment} onChange={handleSaveComment} />
          </Form.Item>

        </Form>

      </Modal>
      <div className="flex justify-between">
        <CustomBreadcrumb currentTitle="Manage Payouts" currentHref={paths.ADMIN_HOME} />
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
