import {
  Avatar,
  Breadcrumb,
  Button,
  Space,
  Table,
  TableProps,
  message,
  Modal,
  Input,
  Pagination,
  TablePaginationConfig,
} from "antd";
import { API_GET_USERS, API_REVIEW_PROFILE_INSTRUCTOR } from "../../../consts";
import { Instructor } from "../../../models/User";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance.ts";
import { format } from "date-fns";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../../../hooks";

const { TextArea } = Input;

const AdminInstructorRequest = () => {
  const [dataInstructorRequest, setDataInstructorRequest] = useState<Instructor[]>([]);
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
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
      width: "10%",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
      width: "10%",
    },
    {
      title: "Verify",
      dataIndex: "is_verified",
      width: "10%",
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
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          {record.isApproved ? (
            <Button type="primary" danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
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



  const fetchInstructorRequest = async () => {
    setLoading(true);
    try {
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
          isApproved: instructor.is_verified, // Hoặc thêm logic để xác định trạng thái phê duyệt
        }));

        setDataInstructorRequest(dataWithApprovalStatus);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pageInfo?.totalItems || response.data.length,
          current: response.data.pageInfo?.pageNum || 1,
          pageSize: response.data.pageInfo?.pageSize || response.data.length,
        }));
      } else {
        //
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructorRequest();
  }, [pagination.current, pagination.pageSize, debouncedSearch]);


  const handleApprove = async (record: Instructor) => {
    try {
      const response = await axiosInstance.put(API_REVIEW_PROFILE_INSTRUCTOR, {
        user_id: record._id,
        status: "approve",
        comment: "",
      });

      if (response && response.data && response.data.success) {
        message.success("Email is send for instructor");
        const updatedDataSource = dataInstructorRequest.map((item) =>
          item._id === record._id ? { ...item, isApproved: true } : item
        );
        setDataInstructorRequest(updatedDataSource);
      } else {
        message.error("Failed to approve instructor");
      }
    } catch (error) {
      //
    }
  };



  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleReject = async () => {
    if (!selectedInstructor) return;

    try {
      const response = await axiosInstance.put(API_REVIEW_PROFILE_INSTRUCTOR, {
        user_id: selectedInstructor._id,
        status: "reject",
        comment: rejectReason,
      });

      if (response.data.success) {
        message.success("Instructor rejected successfully");
        fetchInstructorRequest();
      }
    } catch (error) {
      //
    } finally {
      setIsModalVisible(false);
    }
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

  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manage Instructor's Request</Breadcrumb.Item>
      </Breadcrumb>
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
        dataSource={dataInstructorRequest}
        loading={loading}
        pagination={false}
        onChange={handleTableChange}
        className="overflow-auto"
      />
      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.total}
          showTotal={(total) => `Total ${total} items`}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
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
