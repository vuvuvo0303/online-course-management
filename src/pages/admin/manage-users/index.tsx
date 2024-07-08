import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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
  Spin,
  Pagination,
  Upload,
  Popconfirm,
  Radio,
  Dropdown,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { Student } from "../../../models";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import axiosInstance from "../../../services/api.ts";
import type {
  GetProp,
  InputRef,
  TableColumnsType,
  TableColumnType,
  UploadFile,
  UploadProps,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { User } from "../../../models/User.ts";
import uploadFile from "../../../utils/upload.ts";
import { PaginationProps } from "antd";
import { API_CHANGE_STATUS, API_CREATE_USER, API_GET_USERS } from "../../../consts";

interface ApiError {
  code: number;
  message: string;
}

interface CreateUserResponse {
  success: boolean;
  data: Student;
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

type DataIndex = keyof User;

const AdminManageUsers: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<{
    [key: string]: "ascend" | "descend";
  }>({
    created_at: "ascend",
    updated_at: "ascend",
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<DataIndex | "">("");
  const searchInput = useRef<InputRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [formData, setFormData] = useState<any>({});
  const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");

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
  }, [pagination.current, pagination.pageSize]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{
        pageData: User[];
        pageInfo: { totalItems: number; pageNum: number; pageSize: number };
      }> = await axiosInstance.post(API_GET_USERS, {
        searchCondition: {
          role: "all",
          status: true,
          is_delete: false,
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
        console.log("Failed to fetch students");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [pagination.current, pagination.pageSize]);

  const handleDelete = useCallback(
    async (_id: string, email: string) => {
      try {
        await axiosInstance.delete(`/api/users/${_id}`);
        setData((prevData) => prevData.filter((user) => user._id !== _id));
        toast.success(`Deleted user ${email} successfully`);
        fetchUsers();

        localStorage.setItem("users_updated", new Date().toISOString());
      } catch (error) {
        // Handle error silently
      }
    },
    [fetchUsers]
  );

  const addNewUser = useCallback(
    async (values: Student) => {
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
          Student,
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

  const formatDate = useCallback((dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      console.error("Invalid date:", dateString);
      return "Invalid date";
    }
  }, []);

  const sortColumn = useCallback(
    (columnKey: keyof User) => {
      const newOrder = sortOrder[columnKey] === "ascend" ? "descend" : "ascend";
      const sortedData = [...data].sort((a, b) => {
        let aValue = a[columnKey] as string | number | Date | undefined;
        let bValue = b[columnKey] as string | number | Date | undefined;

        if (columnKey === "created_at" || columnKey === "updated_at") {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return newOrder === "ascend" ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          return newOrder === "ascend"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return 0;
        }
      });

      setData(sortedData);
      setSortOrder((prev) => ({ ...prev, [columnKey]: newOrder }));
    },
    [data, sortOrder]
  );

  const handleSearch = useCallback(
    (
      selectedKeys: string[],
      confirm: FilterDropdownProps["confirm"],
      dataIndex: DataIndex
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    },
    []
  );

  const handleReset = useCallback((clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  }, []);

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

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

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

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Student> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) || false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<Student> = useMemo(
    () => [
      {
        title: "NO",
        dataIndex: "index",
        key: "index",
        render: (_text: unknown, _record: unknown, index: number) =>
          (pagination.current - 1) * pagination.pageSize + index + 1,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...getColumnSearchProps("name"),
        onHeaderCell: () => ({
          onClick: () => sortColumn("name"),
        }),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...getColumnSearchProps("email"),
        onHeaderCell: () => ({
          onClick: () => sortColumn("email"),
        }),
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (role) => (
          <div
            className={`tag ${
              role === "student"
                ? "bg-blue-100 bg-opacity-30 text-blue-400 flex justify-center rounded-xl py-2 border border-blue-500 text-xs"
                : role === "instructor"
                ? "bg-lime-100 text-lime-400 flex justify-center rounded-xl py-2 border border-lime-500 text-xs"
                : role === "admin"
                ? "bg-yellow-100 text-yellow-800 flex justify-center rounded-xl py-2 border border-yellow-500 text-xs"
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
        render: (created_at: string) => formatDate(created_at),
        sorter: true,
        sortDirections: ["descend", "ascend"],
        onHeaderCell: () => ({
          onClick: () => sortColumn("created_at"),
        }),
        width: "10%",
      },
      {
        title: "Updated Date",
        dataIndex: "updated_at",
        key: "updated_at",
        render: (updated_at: string) => formatDate(updated_at),
        sorter: true,
        sortDirections: ["descend", "ascend"],
        onHeaderCell: () => ({
          onClick: () => sortColumn("updated_at"),
        }),
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
          <Switch
            defaultChecked={status}
            onChange={(checked) => handleStatusChange(checked, record._id)}
          />
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (record: Student) => (
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
    [getColumnSearchProps, sortColumn, formatDate, handleDelete]
  );

  const handleTableChange = (pagination: PaginationProps) => {
    const newPagination: { current: number; pageSize: number; total: number } =
      {
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
          const roleChangeResponse: AxiosResponse<any> = await axiosInstance.put(`/api/users/change-role`, {
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
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
    setLoading(false);
  };

  const onFinish = (values: any) => {
    if (modalMode === "Edit") {
      if (formData._id) {
        editUser({ ...formData, ...values });
      } else {
        console.error("User ID is not set.");
      }
    } else {
      addNewUser(values);
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "ALL",
    },
    {
      key: "2",
      label: "Admins",
    },
    {
      key: "3",
      label: "Instructors",
    },
    {
      key: "4",
      label: "Students",
    },
  ];
  return (
    <div>
      
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
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
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ["3"],
        }}
      >
        <Typography.Link>
          <Space>
            Filter Role
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={false} // Disable the default pagination
          onChange={handleTableChange}
        />
      </Spin>
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
              rules={[
                { required: true, message: "Please input the password!" },
              ]}
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