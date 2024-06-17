import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Table, Space, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";
import styles from "./managecategory.module.css";

type Category = {
  id: number;
  name: string;
};

const AdminManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const saveToLocalStorage = (data: Category[]) => {
    localStorage.setItem("categories", JSON.stringify(data));
  };

  const getFromLocalStorage = (): Category[] => {
    const storedData = localStorage.getItem("categories");
    return storedData ? JSON.parse(storedData) : [];
  };

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      const categoryName = values.categoryName.trim();
      if (categoryName) {
        const newCategory: Category = {
          id: categories.length + 1,
          name: categoryName,
        };
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        saveToLocalStorage(updatedCategories);
        form.resetFields();
        setModalVisible(false);
      }
    });
  };

  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter((cat) => cat.id !== categoryId);
    setCategories(updatedCategories);
    saveToLocalStorage(updatedCategories);
  };

  useEffect(() => {
    const initialCategories = getFromLocalStorage();
    if (initialCategories.length > 0) {
      setCategories(initialCategories);
    } else {
      const initialData: Category[] = [
        { id: 1, name: "Technology" },
        { id: 2, name: "Science" },
        { id: 3, name: "Art" },
        { id: 4, name: "History" },
      ];
      setCategories(initialData);
      saveToLocalStorage(initialData);
    }
  }, []);

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

      <Button
        type="primary"
        className={styles["button-add"]}
        onClick={() => setModalVisible(true)}
      >
        Add Category
      </Button>

      <Table dataSource={categories} rowKey="id">
        <Column
          title="Category Name"
          dataIndex="name"
          key="name"
          render={(name: string, record: Category) => (
            <Link to={`/courses/${name.toLowerCase().replace(/\s+/g, "-")}`}>
              {name}
            </Link>
          )}
        />

        <Column
          title="Action"
          key="action"
          className={styles["table-action"]}
          render={(text: string, record: Category) => (
            <Space size="middle">
              <Button
                type="link"
                danger
                onClick={() => handleDeleteCategory(record.id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="Add New Category"
        visible={modalVisible}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
        }}
        onOk={handleFormSubmit}
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
