import React, { useState, useEffect } from "react";
import { Button, Form, Table, Breadcrumb, Modal, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment-timezone";
import axios from "axios";
import { Category } from "../../../models";
import { host_main } from "../../../consts";

const AdminManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<string | undefined>(
    undefined
  );
  // const [searchInputValue, setSearchInputValue] = useState<string>("");

  useEffect(() => {
    fetchCategories();
  }, []);

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
        setCategories(res.data.data.pageData);
      }
    } catch (error: any) {
      console.log("Error fetching categories: ", error);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log(`Delete category with id: ${categoryId}`);
    // Add logic here to delete category
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

  const getColumnSearchProps = (dataIndex: string) => ({
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
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) =>
        moment
          .utc(created_at)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: string) =>
        moment
          .utc(updated_at)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (
        <Link to={`/admin/manage-categories/${_id}`}>
          <EyeOutlined className="text-purple-500" />
        </Link>
      ),
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
          onClick={() => setModalVisible(true)}
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
        visible={modalVisible}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageCategories;
