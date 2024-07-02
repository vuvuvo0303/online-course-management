import React, { useState, useEffect } from "react";
import { Button, Form, Table, Breadcrumb, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./managecategory.module.css";
import axios from "axios";
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
        console.log("check res: ", res);
        if (res.data && Array.isArray(res.data)) {
          setCates(res.data);
        } else if (res.data && res.data.data) {
          setCates(res.data.data.pageData); // Assuming the actual data is nested in res.data.data
        }
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    };
    fetchCate();
  }, []);

  const columns = [
    {
      title: 'CateID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Parent Category ID',
      dataIndex: 'parent_category_id',
      key: 'parent_category_id',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Is Deleted',
      dataIndex: 'is_deleted',
      key: 'is_deleted',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: '__v',
      dataIndex: '__v',
      key: '__v',
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
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/" className={styles["breadcrumb-link"]}>
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/dashboard/admin" className={styles["breadcrumb-link"]}>
            <UserOutlined style={{ marginRight: "8px" }} />
            <span>Admin</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manage Categories</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-center my-10">Manage Categories</h1>
      <Button
        type="primary"
        className={`${styles.buttonAdd} flex float-right`}
        onClick={() => setModalVisible(true)}
      >
        Add Category
      </Button>
      <Table dataSource={cates} columns={columns} />
      
      {/* <Modal
        title="Add New Category"
        visible={modalVisible}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
        }}
        // onOk={handleFormSubmit}
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
      </Modal> */}
    </div>
  );
};

export default AdminManageCategories;
