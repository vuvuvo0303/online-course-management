import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance.ts";
<<<<<<< Updated upstream
import { API_GET_PAYOUTS, API_UPDATE_STATUS_PAYOUT, paths } from "../../../consts/index.ts";
import { Breadcrumb, Button, Table, TableColumnsType, Tag, message } from "antd";
=======
import { API_GET_PAYOUTS, paths } from "../../../consts/index.ts";
import { Breadcrumb, Button, Table, TableColumnsType, Tag } from "antd";
>>>>>>> Stashed changes
import { format } from "date-fns";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Payout } from "models/Payout.ts";

const AdminManagePayouts: React.FC = () => {
<<<<<<< Updated upstream
    const [dataPayouts, setDataPayouts] = useState<Payout[]>([]);

    const getPayouts = useCallback(async () => {
        const response = await axiosInstance.post(API_GET_PAYOUTS, {
            searchCondition: {
                payout_no: "",
                instructor_id: "",
                status: "request_payout",
                is_delete: false,
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
            },
        });
        setDataPayouts(response.data.pageData);
    }, []);

    useEffect(() => {
        getPayouts();
    }, [getPayouts]);

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await axiosInstance.put(`${API_UPDATE_STATUS_PAYOUT}/${id}`, { status });
            message.success(`Payout status updated to ${status}`);
            getPayouts();
        } catch (error) {
            message.error("Failed to update payout status");
        }
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
    ];

    // Check if there are any records with status "request_payout"
    const hasRequestPayout = dataPayouts.some(payout => payout.status === "request_payout");

    if (hasRequestPayout) {
        columns.push({
            title: "Action",
            key: "action",
            width: "20%",
            render: (record: Payout) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => handleStatusChange(record._id, "completed")}
                    >
                        Completed
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleStatusChange(record._id, "rejected")}
                    >
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
                            title: "Manage Payment",
                        },
                    ]}
                />
            </div>
            <Table columns={columns} dataSource={dataPayouts} rowKey={(record: Payout) => record._id} />
        </div>
    );
};

=======
  const [data, setData] = useState<Payout[]>([]);
  const fetchPayouts = useCallback(async () => {
    const response = await axiosInstance.post(API_GET_PAYOUTS, {
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        status: "",
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
    });
    setData(response.data.pageData);
  }, []);

  useEffect(() => {
    fetchPayouts();
  }, []);

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
      title: "Instructor paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      width: "10%",
    },
    {
      title: "Instructor receive",
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
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record: Payout) => record._id}
      />
    </div>
  );
};

>>>>>>> Stashed changes
export default AdminManagePayouts;
