import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Space,
  Table,
  TableProps,
  message,
  Modal,
  Input,
  Pagination,
  TablePaginationConfig,
  Tag,
} from "antd";
import { API_GET_USERS, API_REVIEW_PROFILE_INSTRUCTOR, paths } from "../../../consts";
import { Instructor } from "models/User";
import axiosInstance from "../../../services/axiosInstance.ts";
import { format } from "date-fns";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../../../hooks";
import CustomBreadcrumb from "../../../components/breadcrumb";

const { TextArea } = Input;

const AdminInstructorRequest = () => {
  const [dataSource, setDataSource] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    getInstructorRequest();
  }, [pagination.current, pagination.pageSize, debouncedSearch]);


  const getInstructorRequest = async () => {
    setLoading(true);
    const response = await axiosInstance.post(API_GET_USERS, {
      searchCondition: {
        role: "instructor",
        is_verified: false,
        keyword: debouncedSearch,
      },
      pageInfo: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      },
    });

    if (response.data && response.data.pageData) {
      const dataWithApprovalStatus = response.data.pageData.map((instructor: Instructor) => ({
        ...instructor,
        isApproved: instructor.is_verified,
        isRejected: false,
      }));

      setDataSource(dataWithApprovalStatus);
      setPagination((prev) => ({
        ...prev,
        total: response.data.pageInfo?.totalItems || response.data.length,
        current: response.data.pageInfo?.pageNum || 1,
        pageSize: response.data.pageInfo?.pageSize || response.data.length,
      }));
    }
    setLoading(false);
  };

  const handleApprove = async (record: Instructor) => {
    const response = await axiosInstance.put(API_REVIEW_PROFILE_INSTRUCTOR, {
      user_id: record._id,
      status: "approve",
      comment: "",
    });

    if (response) {
      message.success("Email phê duyệt đã được gửi thành công");

      const updatedDataSource = dataSource.map((item) =>
        item._id === record._id ? { ...item, isApproved: true } : item
      );

      setDataSource(updatedDataSource);
    }
  };

  const handleReject = async () => {
    if (!selectedInstructor) return;
    const response = await axiosInstance.put(API_REVIEW_PROFILE_INSTRUCTOR, {
      user_id: selectedInstructor._id,
      status: "reject",
      comment: rejectReason,
    });

    if (response) {
      message.success("Instructor rejected successfully");

      const updatedDataSource = dataSource.map((item) =>
        item._id === selectedInstructor._id ? { ...item, isRejected: true } : item
      );
      setDataSource(updatedDataSource);
    }
    setIsModalVisible(false);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };

  const showRejectModal = (record: Instructor) => {
    setSelectedInstructor(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
      width: "10%",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
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
          {record.isRejected ? (
            <Tag color="red">Account rejected</Tag>
          ) : record.isApproved ? (
            <Tag color="green">Verification email sent</Tag>
          ) : (
            <>
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
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <CustomBreadcrumb currentTitle="Manage Instructor Request" currentHref={paths.ADMIN_HOME} />
      <Input.Search
        placeholder="Search By Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="p-2 mb-4"
        style={{ width: 200 }}
        enterButton={<SearchOutlined className="text-white" />}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record: Instructor) => record._id}
        loading={loading}
        pagination={false}
        onChange={handleTableChange}
        className="overflow-auto"
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
      <Modal
        title="Reject Instructor"
        open={isModalVisible}
        onOk={handleReject}
        onCancel={handleCancel}
        okText="Reject"
        okButtonProps={{ danger: true }}
      >
        <TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Please provide the reason for rejection"
        />
      </Modal>
    </div>
  );
};

export default AdminInstructorRequest;




