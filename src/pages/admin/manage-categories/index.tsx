import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Table,
  Breadcrumb,
  Modal,
  Input,
  Space,
  Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  HomeOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment-timezone";
import axios from "axios";
import { Category } from "../../../models";
import { host_main } from "../../../consts";

const AdminManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<string | undefined>(
    undefined
  );

  const [sortOrder, setSortOrder] = useState<{ [key: string]: any }>({
    created_at: undefined,
    updated_at: undefined,
  });

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  useEffect(() => {
    fetchCategories();
  }, [sortOrder]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${host_main}/api/category/search`,
        {
          searchCondition: {
            keyword: searchText,
            is_delete: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data && res.data.data) {
        const sortedData = sortData(res.data.data.pageData);
        setCategories(sortedData);
      }
    } catch (error: any) {
      console.log("Error fetching categories: ", error);
    }
  };

  const sortData = (data: Category[]) => {
    const sortedData = [...data].sort((a, b) => {
      const columnKey = Object.keys(sortOrder)[0] as keyof Category;

      let aValue: any = a[columnKey];
      let bValue: any = b[columnKey];

      if (columnKey === "created_at" || columnKey === "updated_at") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder[columnKey] === "ascend"
          ? aValue - bValue
          : bValue - aValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder[columnKey] === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return 0;
      }
    });

    return sortedData;
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${host_main}/api/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const updatedCategories = categories.filter(
          (cat) => cat._id !== categoryId
        );
        setCategories(updatedCategories);
      } else {
        console.error("Failed to delete category. Server returned:", res.data);
      }
    } catch (error: any) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSearch = (
    selectedKeys: string,
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const sortColumn = (columnKey: keyof Category) => {
    const currentOrder = sortOrder[columnKey];
    let newOrder: "ascend" | "descend" = "ascend";

    if (currentOrder === "ascend") {
      newOrder = "descend";
    }

    setSortOrder({ [columnKey]: newOrder });
  };

  const getColumnSearchProps = (dataIndex: string, width?: number) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys[0], confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys[0], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          const input = document.getElementById(`${dataIndex}-input`);
          if (input) {
            input.focus();
          }
        }, 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: "bold" }}>{text}</span>
      ) : (
        text
      ),
    width: width, // Adjust column width if provided
  });

  const handleEditCategory = (record: Category) => {
    setSelectedCategory(record);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      const updatedCategory = {
        ...selectedCategory!,
        ...values,
        updated_at: new Date().toISOString(),
      };

      const res = await axios.put(
        `${host_main}/api/category/${updatedCategory._id}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const updatedCategories = categories.map((cat) =>
          cat._id === updatedCategory._id ? updatedCategory : cat
        );
        setCategories(updatedCategories);
        setEditModalVisible(false);
      } else {
        console.error("Failed to update category. Server returned:", res.data);
      }
    } catch (error: any) {
      console.error("Error updating category:", error);
    }
  };

  const handleSaveAdd = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      const newCategory = {
        ...values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_delete: false,
      };

      const res = await axios.post(`${host_main}/api/category`, newCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setCategories([...categories, res.data.data]);
        form.resetFields();
        setAddModalVisible(false);
      } else {
        console.error("Failed to add new category. Server returned:", res.data);
      }
    } catch (error: any) {
      console.error("Error adding new category:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      width: 250,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      width: 250,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      sortOrder: sortOrder["created_at"],
      render: (created_at: string) =>
        moment
          .utc(created_at)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
      onHeaderCell: () => ({
        onClick: () => sortColumn("created_at"),
      }),
      width: 150,
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: true,
      sortOrder: sortOrder["updated_at"],
      render: (updated_at: string) =>
        moment
          .utc(updated_at)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
      onHeaderCell: () => ({
        onClick: () => sortColumn("updated_at"),
      }),
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Link to={`/admin/manage-categories/${record._id}`}>
            <EyeOutlined className="text-purple-500" />
          </Link>
          <a onClick={() => handleEditCategory(record)}>
            <EditOutlined className="text-blue-500" />
          </a>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDeleteCategory(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-red-500" />
          </Popconfirm>
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/dashboard/admin">
              <span>Admin</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Manage Categories</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="primary"
          className="flex-shrink-0"
          onClick={() => setAddModalVisible(true)} // Open add modal
        >
          Add New Category
        </Button>
      </div>
      <Table
        dataSource={categories}
        columns={columns}
        pagination={false}
        onChange={fetchCategories}
      />

      <Modal
        title="Add New Category"
        visible={addModalVisible}
        onCancel={() => {
          form.resetFields();
          setAddModalVisible(false);
        }}
        footer={[
          <Button key="cancel" onClick={() => setAddModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Add
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveAdd}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Category"
        visible={editModalVisible}
        onCancel={() => {
          form.resetFields();
          setEditModalVisible(false);
        }}
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveEdit}
          initialValues={selectedCategory}
        >
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageCategories;
