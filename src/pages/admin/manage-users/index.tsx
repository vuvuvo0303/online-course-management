import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Button,
  Image,
  Input,
  Space,
  Switch,
  Table,
  Modal,
  Tag,
  Popconfirm,
  Radio,
  Upload,
  Form,
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
import { Student } from "../../../models";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import type {
  GetProp,
  InputRef,
  RadioChangeEvent,
  TableColumnsType,
  TableColumnType,
  UploadFile,
  UploadProps,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { host_main } from "../../../consts";
import { useForm } from "antd/es/form/Form";

type DataIndex = keyof Student;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const AdminManageUsers: React.FC = () => {
  const [data, setData] = useState<Student[]>([]);
  const [sortOrder, setSortOrder] = useState<{ [key: string]: "ascend" | "descend" }>({
    createdDate: "ascend",
    updatedDate: "ascend",
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = useForm();
  const token = localStorage.getItem("token");
  const [value, setValue] = useState('Student');

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleDelete = async (_id: string, email: string) => {
    try {
      await axios.delete(`${host_main}/api/users/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const listAfterDelete = data.filter((student) => student._id !== _id);
      setData(listAfterDelete);
      toast.success(`Deleted user ${email} successfully`);
    } catch (error) {
      toast.error(`Failed to delete user ${email}`);
    }
  };
  const addNewUser = async (values: Student) => {
    try {
      // Check if email already exists
      const searchBody = {
        searchCondition: {
          keyword: values.email,
          role: "all",
          status: true,
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      };

      setLoading(true);
      const searchResponse = await axios.post(`${host_main}/api/users/search`, searchBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (searchResponse.data && searchResponse.data.data.pageData.length > 0) {
        setLoading(false);
        return toast.error("Email already exists in the database.");
      }

      // Add new user if email does not exist
      const response = await axios.post(`${host_main}/api/users/create`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === false) {
        return toast.error(response.data.message);
      }

      setData([...data, response.data.data]);
      toast.success("Create new student successfully");
      setIsModalVisible(false);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to add user: " + error);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const searchBody = {
          searchCondition: {
            keyword: "",
            role: "all",
            status: true,
            is_delete: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        };

        const response = await axios.post(`${host_main}/api/users/search`, searchBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data.data.pageData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [token]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      console.error("Invalid date:", dateString);
      return "Invalid date";
    }
  };

  const sortColumn = (columnKey: keyof Student) => {
    const newOrder = sortOrder[columnKey] === "ascend" ? "descend" : "ascend";
    const sortedData = [...data].sort((a, b) => {
      let aValue: any = a[columnKey];
      let bValue: any = b[columnKey];

      if (columnKey === "created_at" || columnKey === "updated_at") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return newOrder === "ascend" ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return newOrder === "ascend" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return 0;
      }
    });

    setData(sortedData);
    setSortOrder((prev) => ({ ...prev, [columnKey]: newOrder }));
  };

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Student> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
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

  const columns: TableColumnsType<Student> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "5%",

      render: (role) => {
        if (role === "student") {
          return <Tag color="geekblue">Student</Tag>;
        } else if (role === "instructor") {
          return <Tag color="gold">Instructor</Tag>;
        }
        return null;
      },
    },

    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "create_at",
      render: (created_at: string) => formatDate(created_at),
      sorter: true,

      sortDirections: ["descend", "ascend"],
      onHeaderCell: () => ({
        onClick: () => sortColumn("created_at"),
      }),
      width: "13%",
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
      width: "13%",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => <Image src={avatar} width={50} />,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (status: boolean) => (
        <Switch defaultChecked={status} onChange={(checked) => console.log(`switch to ${checked}`)} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Student) => (
        <div>
          <EditOutlined className="hover:cursor-pointer text-blue-400 hover:opacity-60" style={{ fontSize: "20px" }} />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id, record.email)}
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
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Manage Students</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={() => setIsModalVisible(true)} className="py-4">
          <UserAddOutlined />
          Add New Student
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="_id" />
      <Modal title="Add New Student" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={addNewUser} labelCol={{ span: "24" }}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input the email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please choose the role!" }]}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value="Student">Student</Radio>
              <Radio value="Instructor">Instructor</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Avatar" name="avatarUrl" rules={[{ required: true, message: "Please upload your Avatar" }]}>
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
              Submit
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
