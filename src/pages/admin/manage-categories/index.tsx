import { useState, useEffect, useCallback } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  Space,
  Table,
  Modal,
  Form,
  Pagination,
  Popconfirm,
  Spin,
  Select,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Category } from "../../../models";
import axiosInstance from "../../../services/axiosInstance.ts";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import {
  API_CREATE_CATEGORY,
  API_DELETE_CATEGORY,
  API_GET_CATEGORIES,
  API_UPDATE_CATEGORY,
  paths,
} from "../../../consts";
import { useDebounce } from "../../../hooks";
const AdminManageCategories: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validateOnOpen, setValidateOnOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [parentCategories, setParentCategories] = useState<Category[]>([]);

  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_GET_CATEGORIES, {
        searchCondition: {
          role: "all",
          status: true,
          is_deleted: false,
          keyword: debouncedSearchTerm,
        },
        pageInfo: {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
        },
      });
      setData(response.data.pageData || response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.data.pageInfo?.totalItems || response.data.length,
        current: response.data.pageInfo?.pageNum || 1,
        pageSize: response.data.pageInfo?.pageSize || prev.pageSize,
      }));
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize, searchText, debouncedSearchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, searchText]);

  const fetchParentCategories = useCallback(async () => {
    try {
      const response = await axiosInstance.post(API_GET_CATEGORIES, {
        searchCondition: {
          role: "all",
          status: true,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 100,
        },
      });
      setParentCategories(response.data.pageData || response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchParentCategories();
  }, [fetchParentCategories]);

  const handleOpenModal = useCallback(() => {
    form.resetFields();
    setIsModalVisible(true);
    setValidateOnOpen(true);
  }, [form]);

  const handleDelete = async (_id: string, name: string) => {
    const isParentCategory = data.some((category) => category.parent_category_id === _id);

    if (isParentCategory) {
      message.error(`Cannot delete category ${name} as it is a parent category of another category.`);
      return;
    }

    try {
      await axiosInstance.delete(`${API_DELETE_CATEGORY}/${_id}`);
      message.success(`Category ${name} deleted successfully.`);
      await fetchCategories();
    } catch (error) {
      //
    }
  };

  const updateCategory = useCallback(
    async (values: Partial<Category> & { _id: string | null }, originalCreatedAt: string) => {
      let parentCategoryId = null;

      if (values.parent_category_id && values.parent_category_id !== "none") {
        parentCategoryId = values.parent_category_id;
      }

      try {
        setLoading(true);

        const updatedCategory: Category = {
          _id: values._id!,
          name: values.name ?? "",
          description: values.description ?? "",
          parent_category_id: parentCategoryId,
          user_id: values.user_id ?? "",
          is_deleted: values.is_deleted ?? false,
          created_at: originalCreatedAt,
          updated_at: new Date().toISOString(),
        };

        const response = await axiosInstance.put(`${API_UPDATE_CATEGORY}/${values._id}`, updatedCategory);

        if (response.data) {
          setData((prevData) =>
            prevData.map((category) => (category._id === values._id ? { ...category, ...response.data } : category))
          );
          setIsModalVisible(false);
          form.resetFields();
          message.success(`Category ${values.name} updated successfully.`);
        }
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    },
    [data, form]
  );

  const handleEditCategory = useCallback(
    async (category: Category) => {
      form.resetFields();
      await fetchCategories();

      Modal.confirm({
        title: `Edit Category - ${category.name}`,
        content: (
          <Form
            form={form}
            onFinish={(values) => {
              console.log("Updating with values:", values);
              updateCategory(values, category.created_at);
            }}
            initialValues={{
              _id: category._id,
              name: category.name,
              parent_category_id: category.parent_category_id,
              description: category.description,
            }}
            labelCol={{ span: 24 }}
          >
            <Form.Item name="_id" style={{ display: "none" }}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the name of category!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Parent Category" name="parent_category_id" rules={[{ required: false }]}>
              <Select placeholder="Select parent category">
                <Select.Option key="none" value="none">
                  None
                </Select.Option>
                {parentCategories
                  .filter((parentCategory) => parentCategory._id !== form.getFieldValue("_id"))
                  .map((parentCategory) => (
                    <Select.Option key={parentCategory._id} value={parentCategory._id}>
                      {parentCategory.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: false }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        ),
        okText: "Save",
        onOk: () => {
          form.submit();
        },
        onCancel: () => {
          form.resetFields();
        },
      });
    },
    [form, updateCategory, fetchCategories, data]
  );

  const addNewCategory = useCallback(
    async (values: Omit<Category, "_id">) => {
      try {
        setLoading(true);

        let parentCategoryId = null;
        if (values.parent_category_id) {
          const parentCategory = data.find((category) => category.name === values.parent_category_id);
          if (parentCategory) {
            parentCategoryId = parentCategory._id;
          }
        }

        const categoryData = {
          ...values,
          parent_category_id: parentCategoryId,
        };

        const response = await axiosInstance.post(API_CREATE_CATEGORY, categoryData);
        if (response.data) {
          const newCategory = response.data;
          setData((prevData) => [...prevData, newCategory]);
          form.resetFields();
          fetchCategories();
          message.success(`Category ${values.name} created successfully.`);
          setIsModalVisible(false);
        }
      } catch (error) {
        //handle error add new category
      } finally {
        setLoading(false);
      }
    },
    [data, form, fetchCategories]
  );

  const columns: ColumnType<Category>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Parent Category",
      dataIndex: "parent_category_id",
      key: "parent_category_id",
      render: (parent_category_id: string) => {
        const category = data.find((category) => category._id === parent_category_id);
        return category ? category.name : "None";
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => format(new Date(created_at), "dd/MM/yyyy"),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => format(new Date(updated_at), "dd/MM/yyyy"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Category) => (
        <div>
          <EditOutlined
            className="text-blue-500"
            style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
            onClick={() => handleEditCategory(record)}
          />
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record._id, record.name)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              className="text-red-500"
              style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };
  const handleSearch = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
    fetchCategories();
  }, [fetchCategories]);

  if (loading === true) {
    return <p className="text-center flex justify-center">Loading ...</p>;
  }
  return (
    <div>
      <div className="flex justify-between items-center ">
        <Breadcrumb
          className="py-2"
          items={[
            {
              title: <HomeOutlined />,
              href: paths.ADMIN_HOME,
            },
            {
              title: "Manage Categories",
            },
          ]}
        />

        <Button type="primary" onClick={handleOpenModal}>
          Add New Category
        </Button>
      </div>
      <Space>
        <Input.Search
          placeholder="Search By Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 200 }}
          enterButton={<SearchOutlined className="text-white" />}
        />
      </Space>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record: Category) => record._id}
          pagination={false}
          onChange={handleTableChange}
          className="overflow-auto"
        />
      </Spin>

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
        title="Add New Category"
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
          setValidateOnOpen(false);
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={addNewCategory}
          labelCol={{ span: 24 }}
          validateTrigger={validateOnOpen ? "onSubmit" : "onChange"}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Parent Category" name="parent_category_id" rules={[{ required: false }]}>
            <Select placeholder="Select parent category">
              {parentCategories.map((category) => (
                <Select.Option key={category._id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: false }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageCategories;
