import React, { useState, useEffect, useRef } from "react";
import { Breadcrumb, Button, Image, Input, Space, Switch, Table, Modal, Form, Spin, message } from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Student } from "../../../models";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import axiosInstance from "../../../services/api.ts";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { User } from "../../../models/User.ts";

type DataIndex = keyof Student;

const AdminManageStudent: React.FC = () => {
    const [data, setData] = useState<User[]>([]);
    const [sortOrder, setSortOrder] = useState<{ [key: string]: "ascend" | "descend" }>({
        created_at: "ascend",
        updated_at: "ascend",
    });
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState<DataIndex | "">("");
    const searchInput = useRef<InputRef>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/users/search', {
                searchCondition: {
                    role: "all",
                    status: true,
                    is_delete: false,
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                },
            });

            console.log(response)
            console.log(response.data.pageData);
            if (response.data && response.data.pageData) {
                setData(response.data.pageData);
            } else {
                message.error("Failed to fetch students");
            }
        } catch (error) {
            message.error("Error fetching students: " + error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (_id: string, email: string) => {
        try {
            await axiosInstance.delete(`/api/users/${_id}`);
            setData((prevData) => prevData.filter((student) => student._id !== _id));
            toast.success(`Deleted user ${email} successfully`);
        } catch (error) {
            toast.error(`Failed to delete user ${email}`);
        }
    };

    const addNewUser = async (values: Student) => {
        try {
            const searchBody = {
                searchCondition: {
                    keyword: values.email,
                    role: "all",
                    status: true,
                    is_delete: false
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10
                }
            };

            setLoading(true);
            const searchResponse = await axiosInstance.post(`/api/users/search`, searchBody);

            if (searchResponse.data && searchResponse.data.pageData.length > 0) {
                setLoading(false);
                return toast.error("Email already exists in the database.");
            }

            const response = await axiosInstance.post(`/api/users/create`, values);

            if (response.data.status === false) {
                setLoading(false);
                return toast.error(response.data.message);
            }

            const newUser = response.data.data;
            setData(prevData => [...prevData, newUser]);
            toast.success("Created new student successfully");
            setIsModalVisible(false);
            form.resetFields();
            setLoading(false);
        } catch (error) {
            toast.error("Failed to add user: " + (error as any).message);
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
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
        onFilter: (value, record) => (record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase())) || false,
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
            title: "Created Date",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at: string) => formatDate(created_at),
            sorter: true,
            sortDirections: ["descend", "ascend"],
            onHeaderCell: () => ({
                onClick: () => sortColumn("created_at"),
            }),
            width: "15%",
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
            width: "15%",
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
                    <DeleteOutlined
                        onClick={() => handleDelete(record._id, record.email)}
                        className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60"
                        style={{ fontSize: "20px" }}
                    />
                </div>
            ),
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
                    <Breadcrumb.Item>Manage Students</Breadcrumb.Item>
                </Breadcrumb>
                <Button
                    type="primary"
                    onClick={() => setIsModalVisible(true)}
                >
                    Add New Student
                </Button>
            </div>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={data} rowKey="_id" />
            </Spin>
            <Modal
                title="Add New Student"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={addNewUser}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input the email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input the password!' }]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminManageStudent;
