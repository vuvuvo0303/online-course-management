import { Avatar, Breadcrumb, Button, Space, Table, TableProps, message, Modal, Input } from "antd";
import { API_GET_USERS } from "../../../consts";
import { Instructor } from "models/User";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance.ts";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { HomeOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AdminInstructorRequest = () => {
  const [dataSource, setDataSource] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const columns: TableProps<Instructor>["columns"] = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <Avatar
          size={50}
          src={
            avatar
              ? avatar
              : "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-8/32/user--avatar--filled-256.png"
          }
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },

    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy", { locale: vi }),
      width: "10%",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy", { locale: vi }),
      width: "10%",
    },
    {
      title: "Verify",
      dataIndex: "is_verified",
      key: "is_verified",
      render: (is_verified: boolean) => (
        <span>
          {is_verified ? (
            <img src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png" alt="" width={50} />
          ) : (
            <img src="https://cdn-icons-png.flaticon.com/128/4847/4847128.png" alt="" width={50} />
          )}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="p-3"
            style={{ backgroundColor: "#33FF00" }}
            onClick={() => handleApprove(record)}
          >
            Approve
          </Button>
          <Button type="primary" className="px-5" danger onClick={() => showRejectModal(record)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const fetchInstructorRequest = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_GET_USERS, {
        searchCondition: {
          role: "instructor",
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      if (response.data && response.data.pageData) {
        const unverifiedInstructors = response.data.pageData.filter(
          (instructor: Instructor) => !instructor.is_verified
        );

        setDataSource(unverifiedInstructors);
        setPagination({
          ...pagination,
          total: unverifiedInstructors.length,
          current: response.data.pageInfo.pageNum,
          pageSize: response.data.pageInfo.pageSize,
        });
      } else {
        //
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructorRequest();
  }, [pagination.current, pagination.pageSize]);

  const handleApprove = async (record: Instructor) => {
    try {
      const response = await axiosInstance.put("/api/users/review-profile-instructor", {
        user_id: record._id,
        status: "approve",
        comment: "",
      });

      if (response.data.success) {
        message.success("Instructor approved successfully");
        fetchInstructorRequest();
      }
    } catch (error) {
      message.error("Error approving instructor");
      console.error("Error approving instructor:", error);
    }
  };

  const handleReject = async () => {
    if (!selectedInstructor) return;

    try {
      const response = await axiosInstance.put("/api/users/review-profile-instructor", {
        user_id: selectedInstructor._id,
        status: "reject",
        comment: rejectReason,
      });

      if (response.data.success) {
        message.success("Instructor rejected successfully");
        fetchInstructorRequest();
      }
    } catch (error) {
      message.error("Error rejecting instructor");
      console.error("Error rejecting instructor:", error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const showRejectModal = (record: Instructor) => {
    setSelectedInstructor(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manage Instructor's Request</Breadcrumb.Item>
      </Breadcrumb>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, current: page, pageSize });
          },
        }}
      />
      <Modal
        title="Reject Instructor"
        visible={isModalVisible}
        onOk={handleReject}
        onCancel={handleCancel}
        okText="Reject"
        okButtonProps={{ danger: true }}
      >
        <TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Please enter the reason for rejection"
        />
      </Modal>
    </div>
  );
};

export default AdminInstructorRequest;
