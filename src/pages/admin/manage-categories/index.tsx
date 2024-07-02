import React, { useState, useEffect } from "react";
import { Button, Form, Table, Breadcrumb, Modal, Input, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./managecategory.module.css";
import axios from "axios";
import moment from "moment-timezone";
import { Category } from "../../../models";
import { host_main } from "../../../consts";

const AdminManageCategories: React.FC = () => {
  const [cates, setCates] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${host_main}/api/category/search`,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Is Deleted",
      dataIndex: "is_deleted",
      key: "is_deleted",
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
      title: "__v",
      dataIndex: "__v",
      key: "__v",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (
        <>
          <Link to={`/admin/manage-categories/${_id}`}>
            <EyeOutlined className="text-purple-500" />
          </Link>
        </>
      ),
    },
  ];
  // const saveToLocalStorage = (data: Category[]) => {
  //     localStorage.setItem("categories", JSON.stringify(data));
  //   };

  //   const getFromLocalStorage = (): Category[] => {
  //     const storedData = localStorage.getItem("categories");
  //     return storedData ? JSON.parse(storedData) : [];
  //   };

  //   const handleFormSubmit = () => {
  //     form.validateFields().then((values) => {
  //       const categoryName = values.categoryName.trim();
  //       if (categoryName) {
  //         const newCategory: Category = {
  //           id: categories.length + 1,
  //           name: categoryName,
  //         };
  //         const updatedCategories = [...categories, newCategory];
  //         setCategories(updatedCategories);
  //         saveToLocalStorage(updatedCategories);
  //         form.resetFields();
  //         setModalVisible(false);
  //       }
  //     });
  //   };

  //   const handleDeleteCategory = (categoryId: number) => {
  //     const updatedCategories = categories.filter((cat) => cat.id !== categoryId);
  //     setCategories(updatedCategories);
  //     saveToLocalStorage(updatedCategories);
  //   };
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
