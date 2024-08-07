import { useState, useEffect, useCallback } from "react";
import {
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
  Avatar,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import type { GetProp, RadioChangeEvent, TableColumnsType, TablePaginationConfig, UploadFile, UploadProps } from "antd";
import { User, UserRole } from "../../../models/User.ts";

import { API_CHANGE_ROLE, API_CREATE_USER, API_UPDATE_USER, roleRules, roles } from "../../../consts";
import ResponseData from "../../../models/ResponseData.ts";
import { useDebounce } from "../../../hooks";
import {
  CustomBreadcrumb,
  DescriptionFormItem,
  EmailFormItem,
  LoadingComponent,
  NameFormItem,
  PasswordFormItem,
  PhoneNumberFormItem,
  UploadButton,
  VideoFormItem,
} from "../../../components";
import { axiosInstance, changeStatusUser, changeUserRole, deleteUser, getUsers } from "../../../services";
import { formatDate, getBase64, uploadFile } from "../../../utils";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AdminManageUsers: React.FC = () => {
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>(roles.STUDENT);

  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });

  const [formData, setFormData] = useState<Partial<User>>({});

  const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("true");
  const [selectedVerify, setSelectedVerify] = useState<string>("true");

  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, debouncedSearch, selectedVerify]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let statusValue: boolean | undefined = false;
      if (selectedStatus === "true") {
        statusValue = true;
      }
      let verifyValue: boolean | undefined = false;
      if (selectedVerify === "true") {
        verifyValue = true;
      }
      const responseUsers = await getUsers(
        debouncedSearch,
        selectedRole === "All" ? undefined : selectedRole.toLowerCase(),
        statusValue,
        verifyValue,
        false,
        pagination.current,
        pagination.pageSize
      );
      const sortedUsers = responseUsers.data.pageData.sort((a: User, b: User) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });


      setDataUsers(sortedUsers);
      setPagination({
        ...pagination,
        total: responseUsers.data.pageInfo.totalItems,
        current: responseUsers.data.pageInfo.pageNum,
        pageSize: responseUsers.data.pageInfo.pageSize,
      });
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, searchText, debouncedSearch, selectedVerify]);

  const handleAddNewUser = useCallback(
    async (values: User) => {
      setLoading(true);
      try {
        let avatarUrl = values.avatar;

        if (values.avatar && typeof values.avatar !== "string" && values.avatar?.file?.originFileObj) {
          avatarUrl = await uploadFile(values.avatar.file.originFileObj);
        }

        const userData = { ...values, avatar: avatarUrl };

        const response = await axiosInstance.post(API_CREATE_USER, userData);
        console.log("sauadd", response.data);

        const newUser = response.data.data;
        setDataUsers((prevData) => [...prevData, newUser]);
        message.success("Created new user successfully");
        setIsModalVisible(false);
        form.resetFields();
        setLoading(false);
        fetchUsers();
        setFileList([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers, form]
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleRoleChange = async (value: UserRole, userId: string) => {
    await changeUserRole(userId, value);
    setDataUsers((prevData: User[]) => prevData.map((user) => (user._id === userId ? { ...user, role: value } : user)));
  };

  const handleUserStatus = (userId: string, status: boolean) => {
    const updateData = dataUsers.map((user) => (user._id === userId ? { ...user, status: status } : user));
    setDataUsers(updateData);
    fetchUsers();
  };
  const handleRoleChangeModal = (e: RadioChangeEvent) => {
    setRole(e.target.value);
  };
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };
  const handleAddClick = () => {
    setModalMode("Add");
    setIsModalVisible(true);
    form.resetFields();
    setFileList([]);
  };

  const handleEditUser = async (values: User) => {
    setLoading(true);
    let avatarUrl = values.avatar;

    if (values.avatar && typeof values.avatar !== "string" && values.avatar.file?.originFileObj) {
      avatarUrl = await uploadFile(values.avatar.file.originFileObj);
    }

    const updatedUser = {
      ...values,
      avatar: avatarUrl,
      email: values.email,
    };

    const response: ResponseData = await axiosInstance.put(`${API_UPDATE_USER}/${formData._id}`, updatedUser);
    if (response.success) {
      if (formData.role !== values.role) {
        await axiosInstance.put(API_CHANGE_ROLE, {
          user_id: formData._id,
          role: values.role,
        });
      }

      setDataUsers((prevData) =>
        prevData.map((user) =>
          user._id === formData._id
            ? {
              ...user,
              ...updatedUser,
              role: values.role,
              ...(values.role === roles.INSTRUCTOR
                ? {
                  phone_number: values.phone_number,
                  description: values.description,
                  video_url: values.video,
                }
                : {}),
            }
            : user
        )
      );

      message.success("Updated user successfully");
      setIsModalVisible(false);
      form.resetFields();
      fetchUsers();
    }
    setLoading(false);
  };

  const onFinish = (values: User) => {
    if (modalMode === "Edit") {
      if (formData._id) {
        handleEditUser({
          ...formData,
          ...values,
          ...(formData.role === roles.INSTRUCTOR
            ? {
              phone_number: values.phone_number,
              description: values.description,
              video_url: values.video,
            }
            : {}),
        });
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
  };
  const handleVerify = (value: string) => {
    setSelectedVerify(value);
  };


  const columns: TableColumnsType<User> = [
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
        <Select defaultValue={role} onChange={(value) => handleRoleChange(value, record._id)} style={{ width: "100%" }}>
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
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (status: boolean, record: User) => (
        <Switch
          defaultChecked={status}
          onChange={(checked) => changeStatusUser(checked, record._id, handleUserStatus)}
        />
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
      render: (_: unknown, record: User) => (
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
            onConfirm={() => deleteUser(record._id, record.email, fetchUsers)}
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
  ];
  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <CustomBreadcrumb />

        <div className="mt-3 md:mt-0">
          <Button
            type="primary"
            className="py-2"
            onClick={() => {
              handleAddClick();
              form.resetFields();
            }}
          >
            <UserAddOutlined /> Add New User
          </Button>
        </div>
      </div>

      <Space className="mb-2 flex flex-wrap">
        <Input.Search
          placeholder="Search By Name and Email"
          value={searchText}
          onChange={handleSearchText}
          className="w-full md:w-64"
          enterButton={<SearchOutlined className="text-white" />}
        />

        <Select value={selectedRole} onChange={handleRolefilter} className="w-full md:w-32 mt-2 md:mt-0 md:ml-2">
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

        <Select value={selectedStatus} onChange={handleStatus} className="w-full md:w-32 mt-2 md:mt-0 md:ml-2">
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>
        <Select value={selectedVerify} onChange={handleVerify} className="w-full md:w-32 mt-2 md:mt-0 md:ml-2">
          <Select.Option value="true">Verified</Select.Option>
          <Select.Option value="false">Not verified</Select.Option>
        </Select>
      </Space>

      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={(record: User) => record?._id || "unknown"}
        pagination={false}
        onChange={handleTableChange}
        className="overflow-x-auto"
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
        title={modalMode === "Edit" ? "Edit User" : "Add New User"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <NameFormItem />
          {modalMode === "Add" && <EmailFormItem />}
          {modalMode === "Add" && (
            <div className="mt-3">
              <PasswordFormItem />
            </div>
          )}
          {modalMode === "Add" && (
            <Form.Item name="role" rules={roleRules} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="mb-3">
              <Radio.Group onChange={handleRoleChangeModal}>
                <Radio value={roles.STUDENT}>Student</Radio>
                <Radio value={roles.INSTRUCTOR}>Instructor</Radio>
                <Radio value={roles.ADMIN}>Admin</Radio>
              </Radio.Group>
            </Form.Item>
          )}

          {role === roles.INSTRUCTOR && (
            <>
              <VideoFormItem />
              <DescriptionFormItem />
              <PhoneNumberFormItem />
            </>
          )}

          {modalMode === "Edit" && formData.role === roles.INSTRUCTOR && (
            <>
              <VideoFormItem />
              <DescriptionFormItem />
              <PhoneNumberFormItem />
            </>
          )}

          <Form.Item label="Avatar" name="avatar">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : <UploadButton />}
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
