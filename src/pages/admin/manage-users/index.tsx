import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Breadcrumb,
  Button,
  Image,
  Input,
  Space,
  Switch,
  Table,
  Modal,
  Form,
  Pagination,
  Upload,
  Popconfirm,
  Radio,
  Select,
  Spin,
  Avatar,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { format } from "date-fns";
import { toast } from "react-toastify";

import type { GetProp, TableColumnsType, UploadFile, UploadProps } from "antd";

import { User, UserRole } from "../../../models/User.ts";
import uploadFile from "../../../utils/upload.ts";
import useDebounce from "../../../hooks/useDebounce";
import { PaginationProps } from "antd";
import {
  API_CHANGE_ROLE,
  API_CHANGE_STATUS,
  API_CREATE_USER,
  API_DELETE_USER,
  API_GET_USERS,
  paths,
} from "../../../consts";
import axiosInstance from "../../../services/axiosInstance.ts";

interface ApiError {
  code: number;
  message: string;
}

interface CreateUserResponse {
  success: boolean;
  data: User;
  message?: string;
  error?: ApiError[];
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type AxiosResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: [];
};

const AdminManageUsers: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const debouncedSearch = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [formData, setFormData] = useState<Partial<User>>({});

  const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("true");

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "users_updated") {
        fetchUsers();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      if (!window.location.pathname.includes("user")) {
        localStorage.removeItem("users_updated");
      }
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, searchText]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let statusValue: boolean | undefined = undefined;
      if (selectedStatus === "true") {
        statusValue = true;
      } else if (selectedStatus === "false") {
        statusValue = false;
      }

      const response = await axiosInstance.post(API_GET_USERS, {
        searchCondition: {
          role: selectedRole === "All" ? undefined : selectedRole.toLowerCase(),
          status: statusValue,
          is_delete: false,
          keyword: debouncedSearch,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      if (response.data && response.data.pageData) {
        let filteredData = response.data.pageData;

        if (selectedRole.toLowerCase() === "instructor") {
          filteredData = filteredData.filter((user: User) => user.is_verified === true);
        }

        setData(filteredData);
        setPagination({
          ...pagination,
          total: response.data.pageInfo.totalItems,
          current: response.data.pageInfo.pageNum,
          pageSize: response.data.pageInfo.pageSize,
        });
      } else {
        // Xử lý trường hợp không có dữ liệu
      }
    } catch (error) {
      // Xử lý trường hợp lỗi
    }
    setLoading(false);
  }, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, searchText]);

  const handleDelete = useCallback(
    async (_id: string, email: string) => {
      try {
        await axiosInstance.delete(`${API_DELETE_USER}/${_id}`);
        setData((prevData) => prevData.filter((user) => user._id !== _id));
        toast.success(`Deleted user ${email} successfully`);
        fetchUsers();

        localStorage.setItem("users_updated", new Date().toISOString());
      } catch (error) {
        //
      }
    },
    [fetchUsers]
  );

  const handleAddNewUser = useCallback(
    async (values: User) => {
      try {
        setLoading(true);

        let avatarUrl = values.avatar;

        if (values.avatar && typeof values.avatar !== "string" && values.avatar?.file?.originFileObj) {
          avatarUrl = await uploadFile(values.avatar.file.originFileObj);
        }
        console.log(avatarUrl);

        const userData = { ...values, avatar: avatarUrl };

        const response: AxiosResponse<CreateUserResponse> = await axiosInstance.post<
          User,
          AxiosResponse<CreateUserResponse>
        >(API_CREATE_USER, userData);

        const newUser = response.data.data;
        setData((prevData) => [...prevData, newUser]);
        toast.success("Created new user successfully");
        setIsModalVisible(false);
        form.resetFields();
        setLoading(false);
        fetchUsers();
        setFileList([]);
        localStorage.setItem("users_updated", new Date().toISOString());
      } catch (error) {
        setLoading(false);
        // toast.error(`Failed to create new user: ${error.message}`);
      }
    },
    [fetchUsers, form]
  );

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleStatusChange = useCallback(async (checked: boolean, userId: string) => {
    try {
      await axiosInstance.put(API_CHANGE_STATUS, {
        user_id: userId,
        status: checked,
      });
      fetchUsers();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment

      setData((prevData) => prevData.map((user) => (user._id === userId ? { ...user, status: checked } : user)));

      toast.success(`User status updated successfully`);
      localStorage.setItem("users_updated", new Date().toISOString());
    } catch (error) {
      // Handle error silently
    }
  }, []);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleRoleChange = useCallback(async (value: UserRole, recordId: string) => {
    try {
      await axiosInstance.put(API_CHANGE_ROLE, { user_id: recordId, role: value });
      setData((prevData: User[]) => prevData.map((user) => (user._id === recordId ? { ...user, role: value } : user)));
      toast.success(`Role changed successfully`);
      localStorage.setItem("users_updated", new Date().toISOString());
    } catch (error) {
      // Handle error silently
    }
  }, []);
  const columns: TableColumnsType<User> = useMemo(
    () => [
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
        width: "20%",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "20%",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: "10%",
        render: (role: UserRole, record: User) => (
          <Select
            defaultValue={role}
            onChange={(value) => handleRoleChange(value, record._id)}
            style={{ width: "100%" }}
          >
            <Select.Option classNAme="text-red-700" value="student">
              {" "}
              <span className="text-blue-800">Student</span>
            </Select.Option>
            <Select.Option value="instructor">
              <span className="text-green-700">Instructor</span>
            </Select.Option>
            <Select.Option value="admin">
              <span className="text-violet-500">Admin</span>
            </Select.Option>
          </Select>
        ),
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
        title: "Status",
        key: "status",
        dataIndex: "status",
        width: "10%",
        render: (status: boolean, record: User) => (
          <Switch defaultChecked={status} onChange={(checked) => handleStatusChange(checked, record._id)} />
        ),
      },
      {
        title: "Verify",
        dataIndex: "is_verified",
        key: "is_verified",
        render: (is_verified: boolean) => (
          <span>
            {is_verified ? (
              <img src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png" alt="" />
            ) : (
              <img src="https://cdn-icons-png.flaticon.com/128/4847/4847128.png" alt="" />
            )}
          </span>
        ),
      },

      {
        title: "Action",
        key: "action",
        width: "15%",
        render: (record: User) => (
          <div>
            <EditOutlined
              className="hover:cursor-pointer text-blue-400 hover:opacity-60"
              style={{ fontSize: "20px" }}
              onClick={() => {
                setModalMode("Edit");
                setIsModalVisible(true);
                form.setFieldsValue(record);
                setFormData(record);

                const avatarUrl = typeof record.avatar === "string" ? record.avatar : "";

                setFileList(
                  avatarUrl
                    ? [
                        {
                          uid: "-1",
                          name: "avatar.png",
                          status: "done",
                          url: avatarUrl,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as UploadFile<any>,
                      ]
                    : []
                );
              }}
            />
            <Popconfirm
              title="Delete the User"
              description="Are you sure to delete this User?"
              onConfirm={() => handleDelete(record._id, record.email)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60"
                style={{ fontSize: "20px" }}
              />
            </Popconfirm>
          </div>
        ),
      },
    ],
    [handleStatusChange, form, handleDelete]
  );

  const handleTableChange = (pagination: PaginationProps) => {
    const newPagination: { current: number; pageSize: number; total: number } = {
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: pagination.total ?? 0,
    };

    setPagination(newPagination);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
  };
  const handleAddClick = () => {
    setModalMode("Add");
    setIsModalVisible(true);
    form.resetFields();
    setFileList([]);
  };

  const handleEditUser = async (values: User) => {
    setLoading(true);
    try {
      let avatarUrl = values.avatar;

      if (values.avatar && typeof values.avatar !== "string" && values.avatar.file?.originFileObj) {
        avatarUrl = await uploadFile(values.avatar.file.originFileObj);
      }

      const updatedUser = {
        ...values,
        avatar: avatarUrl,
        email: values.email,
      };

      const response: AxiosResponse<User> = await axiosInstance.put(`/api/users/${formData._id}`, updatedUser);

      if (response.success) {
        // Handle role change if it is different from the current role
        if (formData.role !== values.role) {
          const roleChangeResponse: AxiosResponse<User> = await axiosInstance.put(API_CHANGE_ROLE, {
            user_id: formData._id,
            role: values.role,
          });

          if (!roleChangeResponse.success) {
            throw new Error("Failed to change user role");
          }
        }

        setData((prevData) =>
          prevData.map((user) => (user._id === formData._id ? { ...user, ...updatedUser, role: values.role } : user))
        );

        toast.success("Updated user successfully");
        setIsModalVisible(false);
        form.resetFields();
        fetchUsers();
      } else {
        // Handle error for edit users
      }
    } catch (error) {
      // Handle error
    }
    setLoading(false);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  const onFinish = (values: User) => {
    if (modalMode === "Edit") {
      if (formData._id) {
        handleEditUser({ ...formData, ...values });
      } else {
        console.error("User ID is not set.");
      }
    } else {
      handleAddNewUser(values);
    }
  };
  const handleRolefilter = (value: string) => {
    setSelectedRole(value);
  };
  const handleStatus = (value: string) => {
    setSelectedStatus(value);
    console.log(value);

    fetchUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <Breadcrumb className="p-3">
          <Breadcrumb.Item href={paths.ADMIN_HOME}>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Manage Users</Breadcrumb.Item>
        </Breadcrumb>

        <div className="mt-3">
          {" "}
          <Button
            type="primary"
            onClick={() => {
              handleAddClick();
              form.resetFields();
            }}
            className="py-2"
          >
            <UserAddOutlined /> Add New User
          </Button>
        </div>
      </div>

      <Space className="mb-2 flex items-center">
        <Input.Search
          placeholder="Search By Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          
          style={{ width: 200 }}
          enterButton={<SearchOutlined className="text-white" />}
        />

        <Select value={selectedRole} onChange={handleRolefilter} style={{ width: 120 }}>
          <Select.Option value="All">All Roles</Select.Option>
          <Select.Option value="Admin">
            <span className="text-violet-500">Admin</span>
          </Select.Option>
          <Select.Option value="Student">
            <span className="text-blue-800">Student</span>
          </Select.Option>
          <Select.Option value="Instructor">
            <span className="text-green-700">Instructor</span>
          </Select.Option>
        </Select>
        <Select value={selectedStatus} onChange={handleStatus} style={{ width: 120 }}>
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>
      </Space>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={data} rowKey="_id" pagination={false} onChange={handleTableChange} className="overflow-auto"  />
      </Spin>
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
        title={modalMode === "Edit" ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          {modalMode === "Add" && (
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input the email!" }]}>
              <Input />
            </Form.Item>
          )}
          {modalMode === "Add" && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input the password!" }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          {modalMode === "Add" && (
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please choose the role you want to add!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="student">Student</Radio>
                <Radio value="instructor">Instructor</Radio>
                <Radio value="admin">Admin</Radio>
              </Radio.Group>
            </Form.Item>
          )}
          <Form.Item label="Avatar" name="avatar">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              {modalMode === "Add" ? "Submit" : "Edit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default AdminManageUsers;
