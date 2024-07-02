import React, { useState, useEffect } from "react";
import { Button, Form, Table, Breadcrumb, Modal, Input, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import styles from "./managecategory.module.css";
import axios from "axios";
import moment from "moment-timezone";
import { Category } from "../../../models";

const AdminManageCategories: React.FC = () => {
  const [cates, setCates] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "https://api-ojt-hcm24-react06-group01.vercel.app/api/category/search",
          {
            searchCondition: {
              keyword: "",
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
        if (res.data && Array.isArray(res.data)) {
          setCates(res.data);
        } else if (res.data && res.data.data) {
          setCates(res.data.data.pageData);
        }
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    };
    fetchCate();
  }, []);

  const handleDeleteCategory = (categoryId: string) => {
    console.log(`Delete category with id: ${categoryId}`);
  };

  const handleEditCategory = (category: Category) => {
    console.log(`Edit category: ${category.name}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "is_deleted",
      key: "is_deleted",
      render: (is_deleted: boolean) => (
        <Tooltip title={is_deleted ? "Deleted" : "Active"}>
          <Button
            type="primary"
            danger={is_deleted}
            icon={<ExclamationCircleOutlined />}
          />
        </Tooltip>
      ),
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
      key: "action",
      render: (_: any, record: Category) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCategory(record._id)}
          />
        </span>
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
        dataSource={cates}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />

      <Modal
        title="Add New Category"
        visible={modalVisible}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
        }}
      >
        <Form form={form} layout="vertical" className={styles["modal-form"]}>
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
