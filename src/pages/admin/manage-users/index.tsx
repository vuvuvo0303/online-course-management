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

import { User } from "../../../models/User.ts";
import uploadFile from "../../../utils/upload.ts";
import { PaginationProps } from "antd";
import {
  API_CHANGE_ROLE,
  API_CHANGE_STATUS,
  API_CREATE_USER,
  API_DELETE_USER,
  API_GET_USERS,
  paths
} from "../../../consts";
import axiosInstance from "../../../services/axiosInstance.ts";
import { vi } from "date-fns/locale";

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
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [formData, setFormData] = useState<any>({});
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
      const response: AxiosResponse<{
        pageData: User[];
        pageInfo: { totalItems: number; pageNum: number; pageSize: number };
      }> = await axiosInstance.post(API_GET_USERS, {
        searchCondition: {
          role: selectedRole === "All" ? undefined : selectedRole.toLowerCase(),
          status: selectedStatus === "true" ? true : selectedStatus === "false" ? false : undefined,
          is_delete: false,
          keyword: searchText,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      if (response.data && response.data.pageData) {
        setData(response.data.pageData);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pageInfo.totalItems,
          current: response.data.pageInfo.pageNum,
          pageSize: response.data.pageInfo.pageSize,
        }));
      } else {
        // Xử lý khi không có dữ liệu
      }
    } catch (error) {
      // Xử lý lỗi
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

        if (
          values.avatar &&
          typeof values.avatar !== "string" &&
          values.avatar?.file?.originFileObj
        ) {
          avatarUrl = await uploadFile(values.avatar.file.originFileObj);
        }

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
        localStorage.setItem("users_updated", new Date().toISOString());
      } catch (error) {
        setLoading(false);
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

  const columns: TableColumnsType<User> = useMemo(
    () => [
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

        render: (role) => (
          <div
            className={`tag ${
              role === "student"
                ? "bg-blue-100 bg-opacity-30 text-blue-400 flex justify-center rounded-xl p-2 border border-blue-500 text-xs"
                : role === "instructor"
                ? "bg-lime-100 text-lime-400 flex justify-center rounded-xl p-2 border border-lime-500 text-xs"
                : role === "admin"
                ? "bg-yellow-100 text-yellow-800 flex justify-center rounded-xl p-2 border border-yellow-500 text-xs"
                : "bg-gray-500 text-white"
            }`}
          >
            {role ? role.toUpperCase() : "UNKNOWN"}
          </div>
        ),
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
        title: "Image",
        dataIndex: "avatar",
        key: "avatar",
        render: (avatar: string) => <Image src={avatar} width={50} />,
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
                setFileList(
                  record.avatar
                    ? [
                        {
                          uid: "-1",
                          name: "avatar.png",
                          status: "done",
                          url: record.avatar,
                        },
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
    setFormData({});
    setModalMode("Add");
    setIsModalVisible(true);
  };

  const editUser = async (values: any) => {
    setLoading(true);
    try {
      let avatarUrl = values.avatar;
      if (values.avatar && typeof values.avatar !== "string" && values.avatar.file.originFileObj) {
        avatarUrl = await uploadFile(values.avatar.file.originFileObj);
      }

      const updatedUser = {
        ...values,
        avatar: avatarUrl,
        email: values.email,
      };

      const response: AxiosResponse<any> = await axiosInstance.put(`/api/users/${formData._id}`, updatedUser);

      if (response.success) {
        // Handle role change if it is different from the current role
        if (formData.role !== values.role) {
          const roleChangeResponse =
            await axiosInstance.put(API_CHANGE_ROLE, {
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
        //handle error for edit users
      }
    } catch (error) {
      //
    }
    setLoading(false);
  };

  if(loading){
    return <p className="text-center">Loading...</p>
  }
  const onFinish = (values: any) => {
    if (modalMode === "Edit") {
      if (formData._id) {
        editUser({ ...formData, ...values });
      } else {
        console.error("User ID is not set.");
      }
    } else {
      handleAddNewUser(values);
    }
  };
  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };
  const handleStatus = (value: string) => {
    setSelectedStatus(value);
    fetchUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href={paths.ADMIN_HOME}>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Manage Users</Breadcrumb.Item>
        </Breadcrumb>

        <Space>
          <Input.Search
            placeholder="Search By Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            // onSearch={handleSearch}
            style={{ width: 200 }}
            enterButton={<SearchOutlined className="text-white" />}
          />
          <Select value={selectedRole} onChange={handleRoleChange} style={{ width: 120 }}>
            <Select.Option value="All">All Roles</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Student">Student</Select.Option>
            <Select.Option value="Instructor">Instructor</Select.Option>
          </Select>
          <Select value={selectedStatus} onChange={handleStatus} style={{ width: 120 }}>
            <Select.Option value="true">Active</Select.Option>
            <Select.Option value="false">Inactive</Select.Option>
          </Select>
        </Space>

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

      <Table columns={columns} dataSource={data} rowKey="_id" pagination={false} onChange={handleTableChange} />
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
