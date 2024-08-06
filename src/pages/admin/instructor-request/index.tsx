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
  Form,
} from "antd";
import { rejectRules, roles } from "../../../consts";
import { Instructor } from "../../../models";
import { getUsers } from "../../../services";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../../../hooks";
import { CustomBreadcrumb, LoadingComponent } from "../../../components";
import { formatDate } from "../../../utils";
import { reviewProfileInstructor } from "../../../services";
import { useForm } from "antd/es/form/Form";

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
  const [form] = useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    getInstructorRequest();
  }, [pagination.current, pagination.pageSize, debouncedSearch]);

  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue({ rejectReason }); 
    }
  }, [isModalVisible, rejectReason, form]);

  if (loading) {
    return <LoadingComponent />;
  }

  const getInstructorRequest = async () => {
    setLoading(true);
    try {
      const responseInstructorRequest = await getUsers(
        debouncedSearch,
        roles.INSTRUCTOR,
        true,
        false,
        false,
        pagination.current,
        pagination.pageSize
      );
  
      if (responseInstructorRequest.data && responseInstructorRequest.data.pageData) {
        // Map dữ liệu và thêm trạng thái phê duyệt
        const dataWithApprovalStatus = responseInstructorRequest.data.pageData.map((instructor: Instructor) => ({
          ...instructor,
          isApproved: instructor.is_verified,
          isRejected: false,
        }));
  
        // Sắp xếp dữ liệu theo ngày tạo
        const sortedUsers = dataWithApprovalStatus.sort((a: Instructor, b: Instructor) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
  
        // Cập nhật state
        setDataSource(sortedUsers);
        setPagination((prev) => ({
          ...prev,
          total: responseInstructorRequest.data.pageInfo?.totalItems || responseInstructorRequest.data.pageData.length,
          current: responseInstructorRequest.data.pageInfo?.pageNum || 1,
          pageSize: responseInstructorRequest.data.pageInfo?.pageSize || responseInstructorRequest.data.pageData.length,
        }));
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleApprove = async (record: Instructor) => {
    const responseProfileInstructor = await reviewProfileInstructor(record._id, "approve", "");

    if (responseProfileInstructor) {
      message.success("Email is sent successfully.");

      const updatedDataSource = dataSource.map((item) =>
        item._id === record._id ? { ...item, isApproved: true } : item
      );

      setDataSource(updatedDataSource);
    }
  };

  const handleReject = async () => {
    if (!selectedInstructor) return;

    const trimmedRejectReason = rejectReason.trim();
  

    if (!trimmedRejectReason) {
      message.error("Please provide the reason for rejection");
      return;
    }

    try {
      const responseReviewInstructor = await reviewProfileInstructor(
        selectedInstructor._id,
        "reject",
        trimmedRejectReason
      );

      if (responseReviewInstructor) {
        message.success("Instructor rejected successfully");

        const updatedDataSource = dataSource.map((item) =>
          item._id === selectedInstructor._id ? { ...item, isRejected: true } : item
        );
        setDataSource(updatedDataSource);
        setIsModalVisible(false);
        setRejectReason(""); 
        form.resetFields(); 
      }
    } catch (error) {
      message.error("Failed to reject the instructor. Please try again.");
    }
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
    setRejectReason(""); 
    form.resetFields(); 
  };

  const columns: TableProps<Instructor>["columns"] = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "10%",
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
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      width: "50%",
      
      render: (video) => (
        <iframe
        src={video}
        style={{ width: "100%", height: "auto" }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => formatDate(created_at),
      width: "10%",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => formatDate(updated_at),
      width: "10%",
    },
    {
      title: "Verify",
      dataIndex: "is_verified",
      key: "is_verified",
      width: "5%",
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
      width: "15%",
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
                style={{ backgroundColor: "green" }}
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
      <CustomBreadcrumb />
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
      <Modal title="Reject Instructor" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleReject}>
          <Form.Item label="Reject Reason" name="rejectReason" rules={rejectRules}>
            <Input.TextArea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide the reason for rejection"
            />
          </Form.Item>

          <Form.Item >
            <Space className="gap-2">
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" danger>
                Reject
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminInstructorRequest;
